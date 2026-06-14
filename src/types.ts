/**
 * All TypeScript types for the HookOS SDK.
 */
import type { Address, Hash } from "viem";

// ---------------------------------------------------------------------------
// Common
// ---------------------------------------------------------------------------

export type { Address, Hash };

export interface TxResult {
  hash: Hash;
  blockNumber: bigint;
  gasUsed: bigint;
}

// ---------------------------------------------------------------------------
// Token Types
// ---------------------------------------------------------------------------

export interface CreateTokenParams {
  name: string;
  symbol: string;
  initialSupply: bigint;
  metadataURI: string;
  /** Override the launch fee (in wei). If omitted, on-chain launchFee is queried. */
  value?: bigint;
}

export interface TokenInfo {
  tokenAddress: Address;
  creator: Address;
  name: string;
  symbol: string;
  initialSupply: bigint;
  launchFee: bigint;
  createdAt: number;
}

export interface TokenCreateResult {
  tokenAddress: Address;
  txResult: TxResult;
}

// ---------------------------------------------------------------------------
// Bonding Curve / Trading Types
// ---------------------------------------------------------------------------

export interface CurveState {
  token: Address;
  creator: Address;
  virtualTokenReserve: bigint;
  virtualEthReserve: bigint;
  tokensSold: bigint;
  ethCollected: bigint;
  totalSupply: bigint;
  graduated: boolean;
  pool: Address;
  createdAt: number;
  useExternal: boolean;
}

export interface BuyQuote {
  tokensOut: bigint;
}

export interface SellQuote {
  ethOut: bigint;
}

export interface TradeResult {
  txResult: TxResult;
}

// ---------------------------------------------------------------------------
// Hook Types
// ---------------------------------------------------------------------------

export enum HookPoint {
  BeforeSwap = 0,
  AfterSwap = 1,
  BeforeAddLiquidity = 2,
  AfterAddLiquidity = 3,
  BeforeRemoveLiquidity = 4,
  AfterRemoveLiquidity = 5,
}

export interface RegisterHookParams {
  name: string;
  category: string;
  metadataURI: string;
  implementation: Address;
  /** Override the registration fee (in wei). If omitted, on-chain fee is queried. */
  value?: bigint;
}

export interface HookInfo {
  hookId: Hash;
  author: Address;
  implementation: Address;
  name: string;
  category: string;
  metadataURI: string;
  installs: bigint;
  totalRating: bigint;
  ratingCount: bigint;
  revenue: bigint;
  verified: boolean;
  active: boolean;
  createdAt: number;
  averageRating: number;
}

export interface HookBinding {
  hookId: Hash;
  hookImpl: Address;
  hookPoint: HookPoint;
  active: boolean;
  gasLimit: bigint;
  attachedAt: number;
}

export interface AttachHookParams {
  token: Address;
  hookId: Hash;
  hookImpl: Address;
  hookPoint: HookPoint;
  gasLimit?: bigint;
}

export interface DetachHookParams {
  token: Address;
  hookId: Hash;
}

export interface HookBrowseFilters {
  category?: string;
  verified?: boolean;
  active?: boolean;
  author?: Address;
}

// ---------------------------------------------------------------------------
// Arena Types
// ---------------------------------------------------------------------------

export enum BattleStatus {
  Open = 0,
  Active = 1,
  Settled = 2,
  Cancelled = 3,
}

export enum Side {
  TeamA = 0,
  TeamB = 1,
}

export interface CreateBattleParams {
  tokenA: Address;
  tokenB: Address;
  minWager: bigint;
  maxWager: bigint;
  startTime: number;
  endTime: number;
}

export interface BattleInfo {
  tokenA: Address;
  tokenB: Address;
  pot: bigint;
  teamAPot: bigint;
  teamBPot: bigint;
  minWager: bigint;
  maxWager: bigint;
  startTime: number;
  endTime: number;
  round: number;
  status: BattleStatus;
  winner: Side;
}

export interface WagerParams {
  battleId: number;
  side: Side;
  value: bigint;
}

// ---------------------------------------------------------------------------
// Fee Types
// ---------------------------------------------------------------------------

export interface FeeShare {
  wallet: Address;
  shareBps: bigint;
  label: string;
}

// ---------------------------------------------------------------------------
// Event Types
// ---------------------------------------------------------------------------

export enum EventStatus {
  Upcoming = 0,
  Live = 1,
  Ended = 2,
  Cancelled = 3,
}

export interface EventInfo {
  name: string;
  category: string;
  metadataURI: string;
  prizePool: bigint;
  entryFee: bigint;
  maxPlayers: bigint;
  playerCount: bigint;
  startTime: number;
  endTime: number;
  season: number;
  status: EventStatus;
}

// ---------------------------------------------------------------------------
// Indexer Types
// ---------------------------------------------------------------------------

export interface IndexerToken {
  address: Address;
  name: string;
  symbol: string;
  creator: Address;
  totalSupply: string;
  createdAt: number;
  graduated: boolean;
  price?: string;
  marketCap?: string;
  volume24h?: string;
  holders?: number;
  curveProgress?: number;
}

export interface IndexerHook {
  hookId: string;
  name: string;
  category: string;
  author: Address;
  installs: number;
  averageRating: number;
  verified: boolean;
}

export interface IndexerStats {
  totalTokens: number;
  totalVolume: string;
  totalHooks: number;
  totalFees: string;
  totalBattles: number;
  activeUsers24h: number;
}

export interface TokenListParams {
  sort?: "volume" | "price" | "newest" | "holders" | "marketCap";
  filter?: "all" | "trending" | "graduated" | "onCurve" | "new";
  limit?: number;
  offset?: number;
}

// ---------------------------------------------------------------------------
// Price Types
// ---------------------------------------------------------------------------

export interface PriceUpdate {
  token: Address;
  price: string;
  timestamp: number;
}

export interface Candle {
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

export type Timeframe = "1m" | "5m" | "15m" | "1h" | "4h" | "1d";
