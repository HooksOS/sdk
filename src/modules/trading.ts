import {
  type PublicClient,
  type WalletClient,
  type Address,
  type Hash,
} from "viem";
import { BondingCurveABI } from "../abis/BondingCurve.js";
import { WalletRequiredError } from "../errors.js";
import type { CurveState, TxResult } from "../types.js";

const ZERO_ADDRESS: Address = "0x0000000000000000000000000000000000000000";

export class TradingModule {
  constructor(
    private readonly address: Address,
    private readonly publicClient: PublicClient,
    private readonly walletClient?: WalletClient,
  ) {}

  /**
   * Get the total number of bonding curves.
   */
  async getCurveCount(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "getCurveCount",
    });
  }

  /**
   * Get the graduation threshold in ETH (in wei).
   */
  async getGraduationThreshold(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "graduationThresholdEth",
    });
  }

  /**
   * Get the bonding-curve start market cap target, in USD (1e18-scaled).
   * v2 USD-pegging: the curve anchors its seed to this USD value at the live native/USD price.
   */
  async getStartMcapUsd(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "startMcapUsd",
    });
  }

  /**
   * Get the graduation market cap target, in USD (1e18-scaled). v2 USD-pegging.
   */
  async getGraduationUsd(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "graduationUsd",
    });
  }

  /**
   * Get the live native/USD price the curve is using (1e18-scaled USD per native token).
   */
  async getPriceUsd(): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "priceUsd",
    });
  }

  /**
   * Get the full bonding curve state for a token.
   * Returns null if the token has no bonding curve.
   */
  async getCurve(token: Address): Promise<CurveState | null> {
    const result = await this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "curves",
      args: [token],
    });

    const [tokenAddr, creator, virtualTokenReserve, virtualEthReserve, tokensSold, ethCollected, totalSupply, graduated, pool, createdAt, useExternal, virtualEthSeed, graduationEth] = result;

    if (tokenAddr === ZERO_ADDRESS) {
      return null;
    }

    return {
      token: tokenAddr,
      creator,
      virtualTokenReserve,
      virtualEthReserve,
      tokensSold,
      ethCollected,
      totalSupply,
      graduated,
      pool,
      createdAt: Number(createdAt),
      useExternal,
      virtualEthSeed,
      graduationEth,
    };
  }

  /**
   * Get the current price of a token on its bonding curve (in wei per token).
   */
  async getPrice(token: Address): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "getPrice",
      args: [token],
    });
  }

  /**
   * Get a buy quote: how many tokens you receive for a given ETH amount.
   */
  async getBuyQuote(token: Address, ethAmount: bigint): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "getBuyQuote",
      args: [token, ethAmount],
    });
  }

  /**
   * Get a sell quote: how much ETH you receive for a given token amount.
   */
  async getSellQuote(token: Address, tokenAmount: bigint): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "getSellQuote",
      args: [token, tokenAmount],
    });
  }

  /**
   * Get the bonding curve progress (0-10000, representing 0-100.00%).
   */
  async getProgress(token: Address): Promise<number> {
    const progress = await this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "getProgress",
      args: [token],
    });
    return Number(progress);
  }

  /**
   * Get the market cap of a token (in wei).
   */
  async getMarketCap(token: Address): Promise<bigint> {
    return this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "getMarketCap",
      args: [token],
    });
  }

  /**
   * Check if the bonding curve contract is paused.
   */
  async isPaused(): Promise<boolean> {
    return this.publicClient.readContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "paused",
    });
  }

  /**
   * Buy tokens on the bonding curve by sending ETH.
   */
  async buy(token: Address, ethAmount: bigint): Promise<TxResult> {
    if (!this.walletClient) throw new WalletRequiredError("trading.buy");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("trading.buy (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "buy",
      args: [token],
      value: ethAmount,
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
   * Sell tokens on the bonding curve to receive ETH.
   * NOTE: Caller must approve the BondingCurve contract to spend tokens first.
   */
  async sell(token: Address, tokenAmount: bigint): Promise<TxResult> {
    if (!this.walletClient) throw new WalletRequiredError("trading.sell");
    const account = this.walletClient.account;
    if (!account) throw new WalletRequiredError("trading.sell (no account)");

    const hash: Hash = await this.walletClient.writeContract({
      address: this.address,
      abi: BondingCurveABI,
      functionName: "sell",
      args: [token, tokenAmount],
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
