import { describe, it, expect } from "vitest";
import { FeeModule } from "../modules/fees.js";
import { WalletRequiredError } from "../errors.js";
import type { PublicClient } from "viem";

describe("FeeModule", () => {
  it("throws WalletRequiredError on distribute without wallet", async () => {
    const mockPublicClient = {} as PublicClient;
    const mod = new FeeModule(
      "0x64E3167b2B4eA1b8e3DdCaFe66a5b435BE7cD75f",
      mockPublicClient,
    );

    await expect(mod.distribute()).rejects.toThrow(WalletRequiredError);
  });
});
