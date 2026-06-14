/**
 * Hook operations: register, attach, detach, browse, rate.
 */

import { type PublicClient, type WalletClient, decodeEventLog } from "viem";
import { HookRegistryABI, HookManagerABI } from "./contracts.js";
import { WalletRequiredError, ContractCallError } from "./errors.js";
import type {
  Address,
  Hash,
  TxResult,
  RegisterHookParams,
  AttachHookParams,
  DetachHookParams,
  HookInfo,
  HookBinding,
  HookBrowseFilters,
} from "./types.js";
import { HookPoint } from "./types.js";

export class HookModule {
  private readonly registryAddress: Address;
  private readonly managerAddress: Address;
  private readonly publicClient: PublicClient;
  private readonly walletClient?: WalletClient;

  constructor(
    registryAddress: Address,
    managerAddress: Address,
    publicClient: PublicClient,
    walletClient?: WalletClient,
  ) {
    this.registryAddress = registryAddress;
    this.managerAddress = managerAddress;
    this.publicClient = publicClient;
    this.walletClient = walletClient;
  }

  /**
   * Register a new hook in the HookRegistry.
   * Returns the generated hookId.
   */
  async register(params: RegisterHookParams): Promise<{ hookId: Hash; txResult: TxResult }> {
    if (!this.walletClient?.account) throw new WalletRequiredError("hooks.register");

    let value = params.value;
    if (value === undefined) {
      value = await this.publicClient.readContract({
        address: this.registryAddress,
        abi: HookRegistryABI,
        functionName: "registrationFee",
      });
    }

    const hash = await this.walletClient.writeContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "registerHook",
      args: [params.name, params.category, params.metadataURI, params.implementation],
      value,
      account: this.walletClient.account,
      chain: this.walletClient.chain,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });

    let hookId: Hash | undefined;
    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: HookRegistryABI,
          data: log.data,
          topics: log.topics,
        });
        if (decoded.eventName === "HookRegistered") {
          hookId = (decoded.args as { hookId: Hash }).hookId;
          break;
        }
      } catch {
        // not our event
      }
    }

    if (!hookId) {
      throw new ContractCallError("HookRegistry", "registerHook", "HookRegistered event not found");
    }

    return {
      hookId,
      txResult: {
        hash: receipt.transactionHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed,
      },
    };
  }

  /**
   * Attach a hook to a token.
   */
  async attach(params: AttachHookParams): Promise<TxResult> {
    if (!this.walletClient?.account) throw new WalletRequiredError("hooks.attach");

    const hash = await this.walletClient.writeContract({
      address: this.managerAddress,
      abi: HookManagerABI,
      functionName: "attachHook",
      args: [params.token, params.hookId, params.hookImpl, params.hookPoint, params.gasLimit ?? 0n],
      account: this.walletClient.account,
      chain: this.walletClient.chain,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
    return {
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed,
    };
  }

  /**
   * Detach a hook from a token.
   */
  async detach(params: DetachHookParams): Promise<TxResult> {
    if (!this.walletClient?.account) throw new WalletRequiredError("hooks.detach");

    const hash = await this.walletClient.writeContract({
      address: this.managerAddress,
      abi: HookManagerABI,
      functionName: "detachHook",
      args: [params.token, params.hookId],
      account: this.walletClient.account,
      chain: this.walletClient.chain,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
    return {
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed,
    };
  }

  /**
   * Get hook info by hookId.
   */
  async get(hookId: Hash): Promise<HookInfo> {
    const result = await this.publicClient.readContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "hooks",
      args: [hookId],
    }) as [Address, Address, string, string, string, bigint, bigint, bigint, bigint, boolean, boolean, bigint];

    const [author, implementation, name, category, metadataURI, installs, totalRating, ratingCount, revenue, verified, active, createdAt] = result;

    if (author === "0x0000000000000000000000000000000000000000") {
      throw new ContractCallError("HookRegistry", "hooks", `Hook not found: ${hookId}`);
    }

    let averageRating = 0;
    try {
      const avg = await this.publicClient.readContract({
        address: this.registryAddress,
        abi: HookRegistryABI,
        functionName: "getAverageRating",
        args: [hookId],
      });
      averageRating = Number(avg) / 100;
    } catch {
      // ratingCount may be 0
    }

    return {
      hookId,
      author,
      implementation,
      name,
      category,
      metadataURI,
      installs,
      totalRating,
      ratingCount,
      revenue,
      verified,
      active,
      createdAt: Number(createdAt),
      averageRating,
    };
  }

  /**
   * Get total registered hook count.
   */
  async count(): Promise<bigint> {
    return await this.publicClient.readContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "getHookCount",
    });
  }

  /**
   * List all hooks for a token (active bindings).
   */
  async listForToken(token: Address): Promise<HookBinding[]> {
    const bindings = await this.publicClient.readContract({
      address: this.managerAddress,
      abi: HookManagerABI,
      functionName: "getActiveHooks",
      args: [token],
    }) as Array<{ hookId: Hash; hookImpl: Address; hookPoint: number; active: boolean; gasLimit: bigint; attachedAt: bigint }>;

    return bindings.map((b) => ({
      hookId: b.hookId,
      hookImpl: b.hookImpl,
      hookPoint: b.hookPoint as HookPoint,
      active: b.active,
      gasLimit: b.gasLimit,
      attachedAt: Number(b.attachedAt),
    }));
  }

  /**
   * Browse all registered hooks with optional filters.
   */
  async browse(filters?: HookBrowseFilters): Promise<HookInfo[]> {
    const total = await this.count();
    const results: HookInfo[] = [];

    for (let i = 0n; i < total; i++) {
      const hookId = await this.publicClient.readContract({
        address: this.registryAddress,
        abi: HookRegistryABI,
        functionName: "hookIds",
        args: [i],
      }) as Hash;

      let info: HookInfo;
      try {
        info = await this.get(hookId);
      } catch {
        continue;
      }

      if (filters?.category !== undefined && info.category !== filters.category) continue;
      if (filters?.verified !== undefined && info.verified !== filters.verified) continue;
      if (filters?.active !== undefined && info.active !== filters.active) continue;
      if (filters?.author !== undefined && info.author.toLowerCase() !== filters.author.toLowerCase()) continue;

      results.push(info);
    }

    return results;
  }

  /**
   * Rate a hook (1-5 scale).
   */
  async rate(hookId: Hash, rating: number): Promise<TxResult> {
    if (!this.walletClient?.account) throw new WalletRequiredError("hooks.rate");

    const hash = await this.walletClient.writeContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "rateHook",
      args: [hookId, rating],
      account: this.walletClient.account,
      chain: this.walletClient.chain,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
    return {
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed,
    };
  }

  /**
   * Get the current registration fee.
   */
  async getRegistrationFee(): Promise<bigint> {
    return await this.publicClient.readContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "registrationFee",
    });
  }
}
