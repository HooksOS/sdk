import { describe, it, expect } from "vitest";
import { ArenaModule } from "../modules/arena.js";
import { WalletRequiredError } from "../errors.js";
import { Side } from "../types.js";
import type { PublicClient } from "viem";

describe("ArenaModule", () => {
  it("throws WalletRequiredError on create without wallet", async () => {
    const mockPublicClient = {} as PublicClient;
    const mod = new ArenaModule(
      "0x47C839295754307E635DC6bEf89856267932dD38",
      mockPublicClient,
    );

    await expect(
      mod.create({
        tokenA: "0x0000000000000000000000000000000000000001",
        tokenB: "0x0000000000000000000000000000000000000002",
        minWager: 100n,
        maxWager: 10000n,
        startTime: 1700000000,
        endTime: 1700086400,
      })
    ).rejects.toThrow(WalletRequiredError);
  });

  it("throws WalletRequiredError on wager without wallet", async () => {
    const mockPublicClient = {} as PublicClient;
    const mod = new ArenaModule(
      "0x47C839295754307E635DC6bEf89856267932dD38",
      mockPublicClient,
    );

    await expect(
      mod.wager({ battleId: 1, side: Side.TeamA, value: 1000n })
    ).rejects.toThrow(WalletRequiredError);
  });

  it("throws WalletRequiredError on claim without wallet", async () => {
    const mockPublicClient = {} as PublicClient;
    const mod = new ArenaModule(
      "0x47C839295754307E635DC6bEf89856267932dD38",
      mockPublicClient,
    );

    await expect(mod.claim(1)).rejects.toThrow(WalletRequiredError);
  });
});
