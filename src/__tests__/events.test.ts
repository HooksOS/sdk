import { describe, it, expect } from "vitest";
import { EventsModule } from "../modules/events.js";
import { WalletRequiredError } from "../errors.js";
import type { PublicClient } from "viem";

describe("EventsModule", () => {
  it("throws WalletRequiredError on register without wallet", async () => {
    const mockPublicClient = {} as PublicClient;
    const mod = new EventsModule(
      "0x2c34ee38d96FBC890d341D80610375657594EFCc",
      mockPublicClient,
    );

    await expect(
      mod.register(1, { value: 1000n })
    ).rejects.toThrow(WalletRequiredError);
  });

  it("throws WalletRequiredError on claimPrize without wallet", async () => {
    const mockPublicClient = {} as PublicClient;
    const mod = new EventsModule(
      "0x2c34ee38d96FBC890d341D80610375657594EFCc",
      mockPublicClient,
    );

    await expect(mod.claimPrize(1)).rejects.toThrow(WalletRequiredError);
  });
});
