import {
  type PublicClient,
  type WalletClient,
  type Address,
  type Hash,
} from "viem";
import { FeedBoostAuctionABI } from "../abis/FeedBoostAuction.js";
import { WalletRequiredError } from "../errors.js";
import type {
  SlotInfo,
  SlotConfig,
  ActiveBoost,
  PlaceBidParams,
  PlaceBidBatchParams,
  TxResult,
} from "../types.js";

/**
 * Read and bid on the FeedBoostAuction — the on-chain feed-boost slot auction
 * that powers promoted placement on the Atlas feed. v2 contract with USD-pegged
 * minimum bids (native fee tracks a USD target at the live native/USD price).
 */
export class FeedBoostModule {
  constructor(
    private readonly address: Address,
    private readonly publicClient: PublicClient,
    private readonly walletClient?: WalletClient,
  ) {}

  /** Get the number of configured auction slots. */
  async getSlotCount(): Promise<number> {
    const n = await this.publicClient.readContract({
      address: this.address,
      abi: FeedBoostAuctionABI,
      functionName: "getSlotCount",
    });
    return Number(n);
  }

  /** Get a slot's live state (name, active, current top token + bid, expiry). */
  async getSlot(slotType: number): Promise<SlotInfo> {
    const [name, active, minBid, topToken, currentBid, expiry] =
      await this.publicClient.readContract({
        address: this.address,
        abi: FeedBoostAuctionABI,
        functionName: "getSlot",
        args: [slotType],
      });
    return {
      slotType,
      name,
      active,
      minBid,
      topToken,
      currentBid,
      expiry: Number(expiry),
    };
  }

  /** List every slot's live state. */
  async listSlots(): Promise<SlotInfo[]> {
    const count = await this.getSlotCount();
    const slots: SlotInfo[] = [];
    for (let i = 0; i < count; i++) {
      slots.push(await this.getSlot(i));
    }
    return slots;
  }

  /** Get a slot's static config (minBid, minIncrement, duration). */
  async getSlotConfig(slotType: number): Promise<SlotConfig> {
    const [minBid, minIncrement, duration] = await this.publicClient.readContract({
      address: this.address,
      abi: FeedBoostAuctionABI,
      functionName: "getSlotConfig",
      args: [slotType],
    });
    return { minBid, minIncrement, duration };
  }

  /** Get the live boost currently occupying a slot. */
  async getActiveBoost(slotType: number): Promise<ActiveBoost> {
    const [token, bidder, bid, startTime, expiry] = await this.publicClient.readContract({
      address: this.address,
      abi: FeedBoostAuctionABI,
      functionName: "getActiveBoosts",
      args: [slotType],
    });
    return { token, bidder, bid, startTime: Number(startTime), expiry: Number(expiry) };
  }

  /**
   * Get the effective minimum bid for a slot, in native currency (wei), derived
   * from the USD target at the live native/USD price. v2 — the amount to beat
   * when the slot is empty.
   */
  async getEffectiveMinBid(slotType: number): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: FeedBoostAuctionABI,
      functionName: "effectiveMinBid",
      args: [slotType],
    });
  }

  /** Get the minimum next bid required to take a slot (accounts for the current bid + increment). */
  async getMinNextBid(slotType: number): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: FeedBoostAuctionABI,
      functionName: "getMinNextBid",
      args: [slotType],
    });
  }

  /** The FeeRouter that the auction routes its protocol fee to. */
  async getFeeRouter(): Promise<Address> {
    return this.publicClient.readContract({
      address: this.address,
      abi: FeedBoostAuctionABI,
      functionName: "feeRouter",
    });
  }

  /** The protocol fee in basis points taken from each winning bid. */
  async getProtocolFeeBps(): Promise<number> {
    const bps = await this.publicClient.readContract({
      address: this.address,
      abi: FeedBoostAuctionABI,
      functionName: "protocolFeeBps",
    });
    return Number(bps);
  }

  /** Check if the auction is paused. */
  async isPaused(): Promise<boolean> {
    return this.publicClient.readContract({
      address: this.address,
      abi: FeedBoostAuctionABI,
      functionName: "paused",
    });
  }

  /**
   * Place a bid on a single feed-boost slot for a token.
   * `params.value` is the bid amount in wei (sent as msg.value).
   */
  async placeBid(params: PlaceBidParams): Promise<TxResult> {
    if (!this.walletClient) throw new WalletRequiredError("feedBoost.placeBid");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("feedBoost.placeBid (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: FeedBoostAuctionABI,
      functionName: "placeBid",
      args: [params.token, params.slotType],
      value: params.value,
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
   * Place à la carte bids across multiple slots in a single transaction.
   * `amounts` are per-slot bid amounts; the tx value defaults to their sum.
   */
  async placeBidBatch(params: PlaceBidBatchParams): Promise<TxResult> {
    if (!this.walletClient) throw new WalletRequiredError("feedBoost.placeBidBatch");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("feedBoost.placeBidBatch (no account)");

    const value = params.value ?? params.amounts.reduce((a, b) => a + b, 0n);

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: FeedBoostAuctionABI,
      functionName: "placeBidBatch",
      args: [params.token, params.slots, params.amounts],
      value,
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

  /** Withdraw any pending refund owed to the caller (outbid funds). */
  async withdrawRefund(): Promise<TxResult> {
    if (!this.walletClient) throw new WalletRequiredError("feedBoost.withdrawRefund");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("feedBoost.withdrawRefund (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: FeedBoostAuctionABI,
      functionName: "withdrawRefund",
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
