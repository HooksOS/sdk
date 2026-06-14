/**
 * Token operations: create, read, list, search.
 */

import {
  type PublicClient,
  type WalletClient,
  decodeEventLog,
} from "viem";
import { TokenFactoryABI } from "./contracts.js";
import { WalletRequiredError, ContractCallError } from "./errors.js";
import type { Address, CreateTokenParams, TokenCreateResult, TokenInfo, TxResult } from "./types.js";

export class TokenModule {
  private readonly address: Address;
  private readonly publicClient: PublicClient;
  private readonly walletClient?: WalletClient;

  constructor(address: Address, publicClient: PublicClient, walletClient?: WalletClient) {
    this.address = address;
    this.publicClient = publicClient;
    this.walletClient = walletClient;
  }

  /**
   * Create a new token via TokenFactory.
   * If `params.value` is not set, the on-chain launchFee is queried automatically.
   */
  async create(params: CreateTokenParams): Promise<TokenCreateResult> {
    if (!this.walletClient?.account) throw new WalletRequiredError("tokens.create");

    let value = params.value;
    if (value === undefined) {
      value = await this.publicClient.readContract({
        address: this.address,
        abi: TokenFactoryABI,
        functionName: "launchFee",
      });
    }

    const hash = await this.walletClient.writeContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "createToken",
      args: [params.name, params.symbol, params.initialSupply, params.metadataURI],
      value,
      account: this.walletClient.account,
      chain: this.walletClient.chain,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });

    // Parse TokenCreated event
    let tokenAddress: Address | undefined;
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

    if (!tokenAddress) {
      throw new ContractCallError("TokenFactory", "createToken", "TokenCreated event not found in receipt");
    }

    const txResult: TxResult = {
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed,
    };

    return { tokenAddress, txResult };
  }

  /**
   * Get token info by address.
   */
  async get(tokenAddress: Address): Promise<TokenInfo> {
    const result = await this.publicClient.readContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "tokens",
      args: [tokenAddress],
    });

    const [addr, creator, name, symbol, initialSupply, launchFee, createdAt] = result as [Address, Address, string, string, bigint, bigint, bigint];

    if (addr === "0x0000000000000000000000000000000000000000") {
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
   * Get total number of tokens created.
   */
  async count(): Promise<bigint> {
    return await this.publicClient.readContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "getTokenCount",
    });
  }

  /**
   * Get token address by index.
   */
  async getByIndex(index: bigint): Promise<Address> {
    return await this.publicClient.readContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "allTokens",
      args: [index],
    }) as Address;
  }

  /**
   * List all tokens from the factory.
   */
  async list(): Promise<TokenInfo[]> {
    const total = await this.count();
    const tokens: TokenInfo[] = [];
    for (let i = 0n; i < total; i++) {
      const addr = await this.getByIndex(i);
      const info = await this.get(addr);
      tokens.push(info);
    }
    return tokens;
  }

  /**
   * Get all tokens by a specific creator.
   */
  async byCreator(creator: Address): Promise<TokenInfo[]> {
    const total = await this.publicClient.readContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "getCreatorTokenCount",
      args: [creator],
    });

    const tokens: TokenInfo[] = [];
    for (let i = 0n; i < total; i++) {
      const addr = await this.publicClient.readContract({
        address: this.address,
        abi: TokenFactoryABI,
        functionName: "creatorTokens",
        args: [creator, i],
      }) as Address;
      const info = await this.get(addr);
      tokens.push(info);
    }
    return tokens;
  }

  /**
   * Get the current launch fee.
   */
  async getLaunchFee(): Promise<bigint> {
    return await this.publicClient.readContract({
      address: this.address,
      abi: TokenFactoryABI,
      functionName: "launchFee",
    });
  }
}
