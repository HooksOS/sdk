import {
  type PublicClient,
  type WalletClient,
  type Address,
  type Hash,
  decodeEventLog,
} from "viem";
import { TokenFactoryABI } from "../abis/TokenFactory.js";
import { WalletRequiredError, ContractCallError } from "../errors.js";
import type { CreateTokenParams, TokenInfo, TokenCreateResult, TxResult } from "../types.js";

const ZERO_ADDRESS: Address = "0x0000000000000000000000000000000000000000";

export class TokenModule {
  constructor(
    private readonly address: Address,
    private readonly publicClient: PublicClient,
    private readonly walletClient?: WalletClient,
  ) {}

  /**
   * Get the total number of tokens created via the factory.
   */
  async getCount(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "getTokenCount",
    });
  }

  /**
   * Get the current launch fee (in wei).
   */
  async getLaunchFee(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "launchFee",
    });
  }

  /**
   * Get the number of tokens created by a specific address.
   */
  async getCreatorCount(creator: Address): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "getCreatorTokenCount",
      args: [creator],
    });
  }

  /**
   * Get the token address at a specific index in the factory.
   */
  async getTokenAddress(index: bigint): Promise<Address> {
    return this.publicClient.readContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "allTokens",
      args: [index],
    });
  }

  /**
   * Fetch token info by its deployed address.
   */
  async get(tokenAddress: Address): Promise<TokenInfo> {
    const result = await this.publicClient.readContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "tokens",
      args: [tokenAddress],
    });

    const [addr, creator, name, symbol, initialSupply, launchFee, createdAt] = result;

    if (addr === ZERO_ADDRESS) {
      throw new ContractCallError("TokenFactory", "tokens", `Token not found: ${tokenAddress}`);
    }

    return {
      tokenAddress: addr,
      creator,
      name,
      symbol,
      initialSupply,
      launchFee,
      createdAt: Number(createdAt),
    };
  }

  /**
   * Fetch all tokens registered in the factory.
   * Optionally limit the number of tokens to fetch.
   */
  async list(limit?: number): Promise<TokenInfo[]> {
    const count = await this.getCount();
    const max = limit ? BigInt(Math.min(limit, Number(count))) : count;
    const tokens: TokenInfo[] = [];

    for (let i = 0n; i < max; i++) {
      try {
        const addr = await this.getTokenAddress(i);
        const info = await this.get(addr);
        tokens.push(info);
      } catch {
        // skip failed reads
      }
    }

    return tokens;
  }

  /**
   * Check if the factory contract is paused.
   */
  async isPaused(): Promise<boolean> {
    return this.publicClient.readContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "paused",
    });
  }

  /**
   * Create a new HookOS token via the TokenFactory.
   * Requires a wallet client. If `params.value` is not set, the on-chain `launchFee` is queried.
   */
  async create(params: CreateTokenParams): Promise<TokenCreateResult> {
    if (!this.walletClient) throw new WalletRequiredError("tokens.create");

    const value = params.value ?? await this.getLaunchFee();
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("tokens.create (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "createToken",
      args: [params.name, params.symbol, params.initialSupply, params.metadataURI],
      value,
      account,
      chain: this.walletClient.chain,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });

    // Parse the TokenCreated event to get the new token address
    let tokenAddress: Address = ZERO_ADDRESS;
    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: TokenFactoryABI,
          data: log.data,
          topics: log.topics,
        });
        if (decoded.eventName === "TokenCreated") {
          tokenAddress = (decoded.args as { token: Address }).token;
          break;
        }
      } catch {
        // not our event
      }
    }

    if (tokenAddress === ZERO_ADDRESS) {
      throw new ContractCallError("TokenFactory", "createToken", "TokenCreated event not found in receipt");
    }

    const txResult: TxResult = {
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed,
    };

    return { tokenAddress, txResult };
  }
}
