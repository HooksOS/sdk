import { describe, it, expect } from "vitest";
import { TokenModule } from "../modules/tokens.js";
import { WalletRequiredError } from "../errors.js";
import type { PublicClient } from "viem";

describe("TokenModule", () => {
  it("throws WalletRequiredError on create without wallet", async () => {
    const mockPublicClient = {} as PublicClient;
    const mod = new TokenModule(
      "0x9B3d636C27AD4CDEBFbE1F182B2b63F66Be7adE5",
      mockPublicClient,
    );

    await expect(
      mod.create({
        name: "Test",
        symbol: "TST",
        initialSupply: 1000000n,
        metadataURI: "",
      })
    ).rejects.toThrow(WalletRequiredError);
  });
});
