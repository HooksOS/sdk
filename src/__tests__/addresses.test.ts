import { describe, it, expect } from "vitest";
import { ADDRESSES, getAddresses } from "../addresses.js";

const ZERO = "0x0000000000000000000000000000000000000000";

describe("Addresses", () => {
  it("Base (8453) core addresses are non-zero", () => {
    const addrs = ADDRESSES[8453];
    expect(addrs.tokenFactory).not.toBe(ZERO);
    expect(addrs.hookRegistry).not.toBe(ZERO);
    expect(addrs.hookManager).not.toBe(ZERO);
    expect(addrs.arena).not.toBe(ZERO);
    expect(addrs.events).not.toBe(ZERO);
    expect(addrs.feeRouter).not.toBe(ZERO);
    expect(addrs.bondingCurve).not.toBe(ZERO);
  });

  it("Base addresses are valid hex", () => {
    Object.values(ADDRESSES[8453]).forEach((addr) => {
      expect(addr).toMatch(/^0x[0-9a-fA-F]{40}$/);
    });
  });

  it("HyperEVM (999) core addresses are non-zero", () => {
    const addrs = ADDRESSES[999];
    expect(addrs.tokenFactory).not.toBe(ZERO);
    expect(addrs.hookRegistry).not.toBe(ZERO);
    expect(addrs.feeRouter).not.toBe(ZERO);
    expect(addrs.bondingCurve).not.toBe(ZERO);
  });

  it("has both supported chains", () => {
    expect(Object.keys(ADDRESSES).map(Number)).toEqual(
      expect.arrayContaining([8453, 999])
    );
  });

  it("getAddresses defaults to Base", () => {
    const addrs = getAddresses();
    expect(addrs).toBe(ADDRESSES[8453]);
  });

  it("getAddresses falls back to Base for unknown chain", () => {
    const addrs = getAddresses(12345);
    expect(addrs).toBe(ADDRESSES[8453]);
  });
});
