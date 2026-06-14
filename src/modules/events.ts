import {
  type PublicClient,
  type WalletClient,
  type Address,
  type Hash,
} from "viem";
import { EventsABI } from "../abis/Events.js";
import { WalletRequiredError } from "../errors.js";
import type { EventInfo, TxResult } from "../types.js";
import { EventStatus } from "../types.js";

export class EventsModule {
  constructor(
    private readonly address: Address,
    private readonly publicClient: PublicClient,
    private readonly walletClient?: WalletClient,
  ) {}

  /**
   * Get the total number of events created.
   */
  async getCount(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: EventsABI,
      functionName: "eventCount",
    });
  }

  /**
   * Get the current season number.
   */
  async getCurrentSeason(): Promise<number> {
    const season = await this.publicClient.readContract({
      address: this.address,
      abi: EventsABI,
      functionName: "currentSeason",
    });
    return Number(season);
  }

  /**
   * Get detailed info for an event by ID.
   */
  async getEvent(eventId: number): Promise<EventInfo> {
    const result = await this.publicClient.readContract({
      address: this.address,
      abi: EventsABI,
      functionName: "events",
      args: [BigInt(eventId)],
    });

    const [name, category, metadataURI, prizePool, entryFee, maxPlayers, playerCount, startTime, endTime, season, status] = result;

    return {
      name,
      category,
      metadataURI,
      prizePool,
      entryFee,
      maxPlayers,
      playerCount,
      startTime: Number(startTime),
      endTime: Number(endTime),
      season: Number(season),
      status: Number(status) as EventStatus,
    };
  }

  /**
   * Check if a player is registered for an event.
   */
  async isRegistered(eventId: number, player: Address): Promise<boolean> {
    return this.publicClient.readContract({
      address: this.address,
      abi: EventsABI,
      functionName: "isRegistered",
      args: [BigInt(eventId), player],
    });
  }

  /**
   * Check if the events contract is paused.
   */
  async isPaused(): Promise<boolean> {
    return this.publicClient.readContract({
      address: this.address,
      abi: EventsABI,
      functionName: "paused",
    });
  }

  /**
   * Register for an event. Sends the entry fee as ETH value.
   */
  async register(eventId: number, opts?: { value?: bigint }): Promise<TxResult> {
    if (!this.walletClient) throw new WalletRequiredError("events.register");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("events.register (no account)");

    let value = opts?.value;
    if (value === undefined) {
      const evt = await this.getEvent(eventId);
      value = evt.entryFee;
    }

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: EventsABI,
      functionName: "register",
      args: [BigInt(eventId)],
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

  /**
   * Claim prize from a completed event.
   */
  async claimPrize(eventId: number): Promise<TxResult> {
    if (!this.walletClient) throw new WalletRequiredError("events.claimPrize");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("events.claimPrize (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: EventsABI,
      functionName: "claimPrize",
      args: [BigInt(eventId)],
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
