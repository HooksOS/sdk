import {
  type PublicClient,
  type WalletClient,
  type Address,
  type Hash,
} from "viem";
import { FeeRouterABI } from "../abis/FeeRouter.js";
import { WalletRequiredError } from "../errors.js";
import type { FeeShare, TxResult } from "../types.js";

export class FeeModule {
  constructor(
    private readonly address: Address,
    private readonly publicClient: PublicClient,
    private readonly walletClient?: WalletClient,
  ) {}

  /**
   * Get the total amount of fees distributed (in wei).
   */
  async getTotalDistributed(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: FeeRouterABI,
      functionName: "totalDistributed",
    });
  }

  /**
   * Get the number of fee recipients.
   */
  async getRecipientCount(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: FeeRouterABI,
      functionName: "getRecipientCount",
    });
  }

  /**
   * Get the total configured share in basis points.
   */
  async getTotalShareBps(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: FeeRouterABI,
      functionName: "getTotalShareBps",
    });
  }

  /**
   * Get the fee recipient at a specific index.
   */
  async getRecipient(index: bigint): Promise<FeeShare> {
    const result = await this.publicClient.readContract({
      address: this.address,
      abi: FeeRouterABI,
      functionName: "recipients",
      args: [index],
    });

    const [wallet, shareBps, label] = result;
    return { wallet, shareBps, label };
  }

  /**
   * Get all current fee recipients and their share configuration.
   */
  async getShares(): Promise<FeeShare[]> {
    const count = await this.getRecipientCount();
    const shares: FeeShare[] = [];

    for (let i = 0n; i < count; i++) {
      shares.push(await this.getRecipient(i));
    }

    return shares;
  }

  /**
   * Get the total pending earnings for a specific recipient address.
   */
  async getEarnings(wallet: Address): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: FeeRouterABI,
      functionName: "recipientEarnings",
      args: [wallet],
    });
  }

  /**
   * Distribute accumulated fees to all recipients according to their share.
   */
  async distribute(): Promise<TxResult> {
    if (!this.walletClient) throw new WalletRequiredError("fees.distribute");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("fees.distribute (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: FeeRouterABI,
      functionName: "distribute",
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
