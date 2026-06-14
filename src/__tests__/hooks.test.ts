import { describe, it, expect } from "vitest";
import { HookModule } from "../modules/hooks.js";
import { WalletRequiredError } from "../errors.js";
import { HookPoint } from "../types.js";
import type { PublicClient } from "viem";

describe("HookModule", () => {
  it("throws WalletRequiredError on register without wallet", async () => {
    const mockPublicClient = {} as PublicClient;
    const mod = new HookModule(
      "0xC062c550b4abcbE8fa50DF05Ea353864d0E01262",
      "0x96c5E38362f86E52389E15a86247fB7326503c8d",
      mockPublicClient,
    );

    await expect(
      mod.register({
        name: "Hook",
        category: "Category",
        metadataURI: "ipfs://x",
        implementation: "0x0000000000000000000000000000000000000001",
      })
    ).rejects.toThrow(WalletRequiredError);
  });

  it("throws WalletRequiredError on attach without wallet", async () => {
    const mockPublicClient = {} as PublicClient;
    const mod = new HookModule(
      "0xC062c550b4abcbE8fa50DF05Ea353864d0E01262",
      "0x96c5E38362f86E52389E15a86247fB7326503c8d",
      mockPublicClient,
    );

    await expect(
      mod.attach({
        token: "0x0000000000000000000000000000000000000001",
        hookId: "0x0000000000000000000000000000000000000000000000000000000000000001",
        hookImpl: "0x0000000000000000000000000000000000000002",
        hookPoint: HookPoint.BeforeSwap,
      })
    ).rejects.toThrow(WalletRequiredError);
  });

  it("throws WalletRequiredError on detach without wallet", async () => {
    const mockPublicClient = {} as PublicClient;
    const mod = new HookModule(
      "0xC062c550b4abcbE8fa50DF05Ea353864d0E01262",
      "0x96c5E38362f86E52389E15a86247fB7326503c8d",
      mockPublicClient,
    );

    await expect(
      mod.detach({
        token: "0x0000000000000000000000000000000000000001",
        hookId: "0x0000000000000000000000000000000000000000000000000000000000000001",
      })
    ).rejects.toThrow(WalletRequiredError);
  });
});
