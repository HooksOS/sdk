import { describe, it, expect } from "vitest";
import { HookOS } from "../client.js";
import { ChainError } from "../errors.js";

describe("HookOS Client", () => {
  it("creates a default instance on Base", () => {
    const sdk = new HookOS();
    expect(sdk.chainId).toBe(8453);
    expect(sdk.publicClient).toBeDefined();
    expect(sdk.walletClient).toBeUndefined();
    expect(sdk.tokens).toBeDefined();
    expect(sdk.hooks).toBeDefined();
    expect(sdk.arena).toBeDefined();
    expect(sdk.events).toBeDefined();
    expect(sdk.fees).toBeDefined();
    expect(sdk.trading).toBeDefined();
  });

  it("creates an instance with custom RPC", () => {
    const sdk = new HookOS({ rpcUrl: "https://custom-rpc.example.com" });
    expect(sdk.chainId).toBe(8453);
    expect(sdk.publicClient).toBeDefined();
  });

  it("creates an instance on HyperEVM", () => {
    const sdk = new HookOS({ chainId: 999 });
    expect(sdk.chainId).toBe(999);
    expect(sdk.publicClient).toBeDefined();
  });

  it("throws ChainError for unsupported chain", () => {
    expect(() => new HookOS({ chainId: 12345 as 8453 })).toThrow(ChainError);
  });

  it("exposes all module instances", () => {
    const sdk = new HookOS();
    expect(sdk.tokens).toBeDefined();
    expect(sdk.hooks).toBeDefined();
    expect(sdk.arena).toBeDefined();
    expect(sdk.events).toBeDefined();
    expect(sdk.fees).toBeDefined();
    expect(sdk.trading).toBeDefined();
  });
});
