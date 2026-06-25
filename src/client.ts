import {
  createPublicClient,
  http,
  type PublicClient,
  type WalletClient,
  type Chain,
} from "viem";
import { base, bsc, mainnet } from "viem/chains";
import { getAddresses, type ChainId } from "./addresses.js";
import { ChainError } from "./errors.js";
import { TokenModule } from "./modules/tokens.js";
import { HookModule } from "./modules/hooks.js";
import { ArenaModule } from "./modules/arena.js";
import { EventsModule } from "./modules/events.js";
import { FeeModule } from "./modules/fees.js";
import { TradingModule } from "./modules/trading.js";
import { FeedBoostModule } from "./modules/feedboost.js";

/**
 * Configuration options for the HookOS SDK client.
 */
export interface HookOSOptions {
  /**
   * Chain ID. Defaults to 8453 (Base).
   * Supported: 8453 (Base), 4326 (MegaETH), 999 (HyperEVM), 56 (BNB Chain), 1 (Ethereum).
   */
  chainId?: ChainId;

  /**
   * Custom RPC URL. Defaults to the public RPC for the selected chain.
   */
  rpcUrl?: string;

  /**
   * A viem WalletClient for write operations (token creation, trading, wagering, etc.).
   * If not provided, only read operations will be available.
   */
  walletClient?: WalletClient;

  /**
   * An existing viem PublicClient. If provided, `rpcUrl` and `chainId` are ignored
   * for the public client (but still used for address resolution).
   */
  publicClient?: PublicClient;
}

// Chain definitions for supported networks
const CHAIN_DEFS: Record<number, Chain> = {
  8453: base,
  56: bsc,
  1: mainnet,
  999: {
    id: 999,
    name: "HyperEVM",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: { http: ["https://rpc.hyperliquid.xyz/evm"] },
    },
  } as Chain,
  4326: {
    id: 4326,
    name: "MegaETH",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: { http: ["https://megaeth.drpc.org"] },
    },
  } as Chain,
};

const DEFAULT_RPC: Record<number, string> = {
  8453: "https://mainnet.base.org",
  4326: "https://megaeth.drpc.org",
  999: "https://rpc.hyperliquid.xyz/evm",
  56: "https://bsc-dataseed.binance.org",
  1: "https://ethereum-rpc.publicnode.com",
};

/**
 * Main entry point for the HookOS SDK.
 *
 * @example
 * ```ts
 * import { HookOS } from "@hookos/sdk";
 *
 * // Read-only client (no wallet needed)
 * const hookos = new HookOS();
 *
 * // Get all tokens
 * const tokens = await hookos.tokens.list();
 *
 * // Get a bonding curve price
 * const price = await hookos.trading.getPrice("0x...");
 *
 * // With wallet client for write operations
 * import { createWalletClient, custom } from "viem";
 * import { base } from "viem/chains";
 *
 * const wallet = createWalletClient({
 *   chain: base,
 *   transport: custom(window.ethereum!),
 * });
 *
 * const hookos = new HookOS({ walletClient: wallet });
 *
 * // Buy tokens on bonding curve
 * const tx = await hookos.trading.buy("0x...", parseEther("0.1"));
 * ```
 */
export class HookOS {
  /** Token creation and querying. */
  public readonly tokens: TokenModule;
  /** Hook registration, attachment, and browsing. */
  public readonly hooks: HookModule;
  /** Battle creation, wagering, and settlement. */
  public readonly arena: ArenaModule;
  /** Protocol events. */
  public readonly events: EventsModule;
  /** Fee distribution management. */
  public readonly fees: FeeModule;
  /** Bonding curve trading (buy/sell/quotes). */
  public readonly trading: TradingModule;
  /** FeedBoost slot auction (read slots, place à la carte bids). */
  public readonly feedBoost: FeedBoostModule;

  /** The underlying viem PublicClient used for reads. */
  public readonly publicClient: PublicClient;
  /** The underlying viem WalletClient used for writes (if provided). */
  public readonly walletClient: WalletClient | undefined;
  /** The active chain ID. */
  public readonly chainId: ChainId;

  constructor(opts: HookOSOptions = {}) {
    this.chainId = opts.chainId ?? 8453;
    this.walletClient = opts.walletClient;

    // Resolve chain definition
    const chain = CHAIN_DEFS[this.chainId];
    if (!chain) throw new ChainError(this.chainId);

    // Create or use provided public client
    if (opts.publicClient) {
      this.publicClient = opts.publicClient;
    } else {
      const rpcUrl = opts.rpcUrl ?? DEFAULT_RPC[this.chainId] ?? DEFAULT_RPC[8453];
      this.publicClient = createPublicClient({
        chain,
        transport: http(rpcUrl),
      });
    }

    // Resolve contract addresses for the chain
    const addresses = getAddresses(this.chainId);

    // Initialize modules
    this.tokens = new TokenModule(addresses.tokenFactory, this.publicClient, this.walletClient);
    this.hooks = new HookModule(addresses.hookRegistry, addresses.hookManager, this.publicClient, this.walletClient);
    this.arena = new ArenaModule(addresses.arena, this.publicClient, this.walletClient);
    this.events = new EventsModule(addresses.events, this.publicClient, this.walletClient);
    this.fees = new FeeModule(addresses.feeRouter, this.publicClient, this.walletClient);
    this.trading = new TradingModule(addresses.bondingCurve, this.publicClient, this.walletClient);
    this.feedBoost = new FeedBoostModule(addresses.feedBoostAuction, this.publicClient, this.walletClient);
  }
}
