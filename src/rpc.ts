import type { ChainId } from "./addresses.js";

/**
 * Canonical verified public RPC fallback pools (best-first, no API key required).
 * Mirrors `contracts/deployments/rpc-endpoints.json` — the protocol's single source of
 * truth. Verified 2026-06-25 (stale/dead endpoints excluded). Use these to build an
 * auto-failover provider so a single flaky endpoint never breaks reads.
 *
 * The apps build viem `fallback()` / ethers `FallbackProvider` over these pools.
 */
export const RPC_ENDPOINTS: Record<ChainId, readonly string[]> = {
  // Base
  8453: [
    "https://gateway.tenderly.co/public/base",
    "https://mainnet.base.org",
    "https://base-rpc.publicnode.com",
    "https://base-mainnet.public.blastapi.io",
    "https://base.gateway.tenderly.co",
    "https://base-pokt.nodies.app",
    "https://base.publicnode.com",
    "https://base.meowrpc.com",
  ],
  // BNB Chain
  56: [
    "https://bsc-dataseed2.binance.org",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed1.ninicoin.io",
    "https://bsc.publicnode.com",
    "https://bsc-mainnet.public.blastapi.io",
    "https://bsc-dataseed.binance.org",
    "https://bsc-rpc.publicnode.com",
    "https://bsc.meowrpc.com",
  ],
  // Ethereum
  1: [
    "https://eth.drpc.org",
    "https://mainnet.gateway.tenderly.co",
    "https://eth-mainnet.public.blastapi.io",
    "https://rpc.flashbots.net",
    "https://ethereum-rpc.publicnode.com",
    "https://eth.rpc.blxrbdn.com",
    "https://eth.meowrpc.com",
  ],
  // HyperEVM
  999: [
    "https://hyperliquid.drpc.org",
    "https://rpc.hyperliquid.xyz/evm",
    "https://hyperliquid-json-rpc.stakely.io",
  ],
  // MegaETH
  4326: [
    "https://mainnet.megaeth.com/rpc",
    "https://megaeth.drpc.org",
  ],
};

/**
 * Get the RPC fallback pool for a chain, with optional caller-supplied overrides
 * placed FIRST (e.g. a private/keyed endpoint), then the verified public pool.
 * Returns a deduped, best-first list. Never empty for a supported chain.
 */
export function getRpcPool(chainId: ChainId, overrides: string[] = []): string[] {
  const pool = RPC_ENDPOINTS[chainId] ?? [];
  return [...new Set([...overrides.filter(Boolean), ...pool])];
}
