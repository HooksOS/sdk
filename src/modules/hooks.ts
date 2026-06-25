import {
  type PublicClient,
  type WalletClient,
  type Address,
  type Hash,
  decodeEventLog,
} from "viem";
import { HookRegistryABI } from "../abis/HookRegistry.js";
import { HookManagerABI } from "../abis/HookManager.js";
import { WalletRequiredError, ContractCallError } from "../errors.js";
import type {
  RegisterHookParams,
  AttachHookParams,
  DetachHookParams,
  HookBinding,
  HookInfo,
  HookBrowseFilters,
  TxResult,
} from "../types.js";
import { HookPoint } from "../types.js";

const ZERO_ADDRESS: Address = "0x0000000000000000000000000000000000000000";

export class HookModule {
  constructor(
    private readonly registryAddress: Address,
    private readonly managerAddress: Address,
    private readonly publicClient: PublicClient,
    private readonly walletClient?: WalletClient,
  ) {}

  /**
   * Get the total number of registered hooks.
   */
  async getCount(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "getHookCount",
    });
  }

  /**
   * Get the current registration fee (in wei).
   */
  async getRegistrationFee(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "registrationFee",
    });
  }

  /**
   * Get the configured hook registration fee in USD (1e18-scaled). v2 USD-pegging.
   */
  async getRegistrationFeeUsd(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "registrationFeeUsd",
    });
  }

  /**
   * Get the effective registration fee in native currency (wei), derived from the
   * USD target at the live native/USD price. This is the amount `register()` must send.
   * v2 — prefer this over the legacy fixed `registrationFee`.
   */
  async getEffectiveRegistrationFee(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "effectiveRegistrationFee",
    });
  }

  /**
   * Get detailed info for a specific hook by its hookId.
   */
  async get(hookId: Hash): Promise<HookInfo> {
    const result = await this.publicClient.readContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "hooks",
      args: [hookId],
    });

    const [author, implementation, name, category, metadataURI, installs, totalRating, ratingCount, revenue, verified, active, createdAt] = result;

    if (author === ZERO_ADDRESS) {
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
   * Get the hookId at a specific index.
   */
  async getHookId(index: bigint): Promise<Hash> {
    return this.publicClient.readContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "hookIds",
      args: [index],
    });
  }

  /**
   * Browse all registered hooks with optional filters.
   */
  async browse(filters?: HookBrowseFilters): Promise<HookInfo[]> {
    const count = await this.getCount();
    const results: HookInfo[] = [];

    for (let i = 0n; i < count; i++) {
      const hookId = await this.getHookId(i);
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
   * List all active hook bindings for a given token.
   */
  async listBindings(token: Address): Promise<HookBinding[]> {
    const bindings = await this.publicClient.readContract({
      address: this.managerAddress,
      abi: HookManagerABI,
      functionName: "getActiveHooks",
      args: [token],
    });

    return bindings.map((b) => ({
      hookId: b.hookId as Hash,
      hookImpl: b.hookImpl,
      hookPoint: Number(b.hookPoint) as HookPoint,
      active: b.active,
      gasLimit: b.gasLimit,
      attachedAt: Number(b.attachedAt),
    }));
  }

  /**
   * Check if a token has a specific hook attached.
   */
  async hasHook(token: Address, hookId: Hash): Promise<boolean> {
    return this.publicClient.readContract({
      address: this.managerAddress,
      abi: HookManagerABI,
      functionName: "hasHook",
      args: [token, hookId],
    });
  }

  /**
   * Register a new hook in the HookRegistry.
   * Requires a wallet client. Returns the generated hookId.
   */
  async register(params: RegisterHookParams): Promise<Hash> {
    if (!this.walletClient) throw new WalletRequiredError("hooks.register");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("hooks.register (no account)");

    // v2: effective native fee tracks the USD target at the live price; fall back to legacy.
    let value = params.value;
    if (value === undefined) {
      try {
        value = await this.getEffectiveRegistrationFee();
      } catch {
        value = await this.getRegistrationFee();
      }
    }

    const hash: Hash = await this.walletClient.writeContract({
      address: this.registryAddress,
      abi: HookRegistryABI,
      functionName: "registerHook",
      args: [params.name, params.category, params.metadataURI, params.implementation],
      value,
      account,
      chain: this.walletClient.chain,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });

    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: HookRegistryABI,
          data: log.data,
          topics: log.topics,
        });
        if (decoded.eventName === "HookRegistered") {
          return (decoded.args as { hookId: Hash }).hookId;
        }
      } catch {
        // not our event
      }
    }

    throw new ContractCallError("HookRegistry", "registerHook", "HookRegistered event not found in receipt");
  }

  /**
   * Attach a hook to a token via the HookManager.
   */
  async attach(params: AttachHookParams): Promise<TxResult> {
    if (!this.walletClient) throw new WalletRequiredError("hooks.attach");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("hooks.attach (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.managerAddress,
      abi: HookManagerABI,
      functionName: "attachHook",
      args: [params.token, params.hookId, params.hookImpl, params.hookPoint, params.gasLimit ?? 0n],
      account,
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
    if (!this.walletClient) throw new WalletRequiredError("hooks.detach");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("hooks.detach (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.managerAddress,
      abi: HookManagerABI,
      functionName: "detachHook",
      args: [params.token, params.hookId],
      account,
      chain: this.walletClient.chain,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
    return {
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed,
    };
  }
}
