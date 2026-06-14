// ─── Main Client ───────────────────────────────────────────────────────
export { HookOS } from "./client.js";
export type { HookOSOptions } from "./client.js";

// ─── Modules ───────────────────────────────────────────────────────────
export { TokenModule } from "./modules/tokens.js";
export { HookModule } from "./modules/hooks.js";
export { ArenaModule } from "./modules/arena.js";
export { EventsModule } from "./modules/events.js";
export { FeeModule } from "./modules/fees.js";
export { TradingModule } from "./modules/trading.js";

// ─── Types ─────────────────────────────────────────────────────────────
export type {
  TxResult,
  CreateTokenParams,
  TokenInfo,
  TokenCreateResult,
  CurveState,
  BuyQuote,
  SellQuote,
  TradeResult,
  RegisterHookParams,
  AttachHookParams,
  DetachHookParams,
  HookBinding,
  HookInfo,
  HookBrowseFilters,
  CreateBattleParams,
  BattleInfo,
  WagerParams,
  FeeShare,
  EventInfo,
  IndexerToken,
  IndexerHook,
  IndexerStats,
  TokenListParams,
  PriceUpdate,
  Candle,
  Timeframe,
} from "./types.js";

export {
  HookPoint,
  BattleStatus,
  Side,
  EventStatus,
} from "./types.js";

// ─── Addresses & Network ──────────────────────────────────────────────
export { ADDRESSES, getAddresses } from "./addresses.js";
export type { ChainId, ContractAddresses } from "./addresses.js";

// ─── ABIs ──────────────────────────────────────────────────────────────
export {
  TokenFactoryABI,
  HookRegistryABI,
  HookManagerABI,
  ArenaABI,
  EventsABI,
  FeeRouterABI,
  BondingCurveABI,
} from "./abis/index.js";

// ─── Errors ────────────────────────────────────────────────────────────
export {
  HookOSError,
  WalletRequiredError,
  TransactionError,
  ChainError,
  ContractCallError,
  ValidationError,
  IndexerError,
} from "./errors.js";
