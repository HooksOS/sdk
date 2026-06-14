/**
 * Utility functions for the HookOS SDK.
 */

import type { Address } from "./types.js";

/**
 * Format a bigint wei value as ETH string (18 decimals).
 */
export function formatEth(wei: bigint, decimals = 6): string {
  const whole = wei / 10n ** 18n;
  const remainder = wei % 10n ** 18n;
  const fractionStr = remainder.toString().padStart(18, "0").slice(0, decimals);
  return `${whole}.${fractionStr}`;
}

/**
 * Parse an ETH string into wei (bigint).
 */
export function parseEth(eth: string): bigint {
  const [whole = "0", fraction = ""] = eth.split(".");
  const paddedFraction = fraction.padEnd(18, "0").slice(0, 18);
  return BigInt(whole) * 10n ** 18n + BigInt(paddedFraction);
}

/**
 * Format a token amount given its decimals.
 */
export function formatTokenAmount(amount: bigint, decimals: number = 18, displayDecimals: number = 4): string {
  const divisor = 10n ** BigInt(decimals);
  const whole = amount / divisor;
  const remainder = amount % divisor;
  const fractionStr = remainder.toString().padStart(decimals, "0").slice(0, displayDecimals);
  return `${whole}.${fractionStr}`;
}

/**
 * Shorten an address for display: 0x1234...abcd
 */
export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

/**
 * Validate that a string is a valid Ethereum address.
 */
export function isValidAddress(address: string): address is Address {
  return /^0x[0-9a-fA-F]{40}$/.test(address);
}

/**
 * Calculate slippage-adjusted minimum output.
 * @param amount The expected output amount
 * @param slippageBps Slippage tolerance in basis points (100 = 1%)
 */
export function withSlippage(amount: bigint, slippageBps: number = 100): bigint {
  return amount - (amount * BigInt(slippageBps)) / 10000n;
}

/**
 * Convert basis points to percentage string.
 */
export function bpsToPercent(bps: number | bigint): string {
  const val = Number(bps) / 100;
  return `${val}%`;
}

/**
 * Format a price in subscript-zero notation for very small numbers.
 * E.g. 0.000000218 -> "$0.0₆218"
 */
export function formatPrice(priceStr: string): string {
  const num = parseFloat(priceStr);
  if (num === 0) return "$0.00";
  if (num >= 1) return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (num >= 0.01) return `$${num.toFixed(4)}`;

  const str = num.toFixed(18);
  const afterDot = str.split(".")[1] || "";
  let zeroCount = 0;
  for (const ch of afterDot) {
    if (ch === "0") zeroCount++;
    else break;
  }
  const significantDigits = afterDot.slice(zeroCount, zeroCount + 3);
  const subscriptDigits = "₀₁₂₃₄₅₆₇₈₉";
  const subscript = String(zeroCount)
    .split("")
    .map((d) => subscriptDigits[parseInt(d)] || d)
    .join("");
  return `$0.0${subscript}${significantDigits}`;
}
