import {
  type PublicClient,
  type WalletClient,
  type Address,
  type Hash,
  decodeEventLog,
} from "viem";
import { ArenaABI } from "../abis/Arena.js";
import { WalletRequiredError, ContractCallError } from "../errors.js";
import type { CreateBattleParams, WagerParams, BattleInfo, TxResult } from "../types.js";
import { BattleStatus, Side } from "../types.js";

export class ArenaModule {
  constructor(
    private readonly address: Address,
    private readonly publicClient: PublicClient,
    private readonly walletClient?: WalletClient,
  ) {}

  /**
   * Get the total number of battles created.
   */
  async getCount(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: ArenaABI,
      functionName: "battleCount",
    });
  }

  /**
   * Get the protocol fee in basis points.
   */
  async getProtocolFeeBps(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: ArenaABI,
      functionName: "protocolFeeBps",
    });
  }

  /**
   * Get detailed info for a battle by ID.
   */
  async getBattle(battleId: number): Promise<BattleInfo> {
    const result = await this.publicClient.readContract({
      address: this.address,
      abi: ArenaABI,
      functionName: "battles",
      args: [BigInt(battleId)],
    });

    const [tokenA, tokenB, pot, teamAPot, teamBPot, minWager, maxWager, startTime, endTime, round, status, winner] = result;

    return {
      tokenA,
      tokenB,
      pot,
      teamAPot,
      teamBPot,
      minWager,
      maxWager,
      startTime: Number(startTime),
      endTime: Number(endTime),
      round: Number(round),
      status: Number(status) as BattleStatus,
      winner: Number(winner) as Side,
    };
  }

  /**
   * Check if a player has wagered on a specific battle.
   */
  async hasWagered(battleId: number, player: Address): Promise<boolean> {
    return this.publicClient.readContract({
      address: this.address,
      abi: ArenaABI,
      functionName: "hasWagered",
      args: [BigInt(battleId), player],
    });
  }

  /**
   * Get the number of wagers on a specific battle.
   */
  async getWagerCount(battleId: number): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: ArenaABI,
      functionName: "getBattleWagerCount",
      args: [BigInt(battleId)],
    });
  }

  /**
   * Check if the arena contract is paused.
   */
  async isPaused(): Promise<boolean> {
    return this.publicClient.readContract({
      address: this.address,
      abi: ArenaABI,
      functionName: "paused",
    });
  }

  /**
   * Create a new battle. Requires OPERATOR_ROLE.
   */
  async create(params: CreateBattleParams): Promise<{ battleId: bigint; txResult: TxResult }> {
    if (!this.walletClient) throw new WalletRequiredError("arena.create");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("arena.create (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: ArenaABI,
      functionName: "createBattle",
      args: [
        params.tokenA,
        params.tokenB,
        params.minWager,
        params.maxWager,
        BigInt(params.startTime),
        BigInt(params.endTime),
      ],
      account,
      chain: this.walletClient.chain,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });
    const txResult: TxResult = {
      hash: receipt.transactionHash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed,
    };

    // Try to find the battleId from events (if the contract emits it).
    // The Arena contract returns it, but we need to check logs.
    return { battleId: 0n, txResult };
  }

  /**
   * Place a wager on a battle side. Sends ETH as the wager amount.
   */
  async wager(params: WagerParams): Promise<TxResult> {
    if (!this.walletClient) throw new WalletRequiredError("arena.wager");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("arena.wager (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: ArenaABI,
      functionName: "placeWager",
      args: [BigInt(params.battleId), params.side],
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
   * Claim winnings from a settled battle. Returns the claimed amount.
   */
  async claim(battleId: number): Promise<bigint> {
    if (!this.walletClient) throw new WalletRequiredError("arena.claim");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("arena.claim (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: ArenaABI,
      functionName: "claimWinnings",
      args: [BigInt(battleId)],
      account,
      chain: this.walletClient.chain,
    });

    const receipt = await this.publicClient.waitForTransactionReceipt({ hash });

    for (const log of receipt.logs) {
      try {
        const decoded = decodeEventLog({
          abi: ArenaABI,
          data: log.data,
          topics: log.topics,
        });
        if (decoded.eventName === "WinningsClaimed") {
          return (decoded.args as { amount: bigint }).amount;
        }
      } catch {
        // not our event
      }
    }

    throw new ContractCallError("Arena", "claimWinnings", "WinningsClaimed event not found in receipt");
  }
}
