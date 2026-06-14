import { describe, it, expect } from "vitest";
import {
  HookOSError,
  WalletRequiredError,
  TransactionError,
  ChainError,
  ContractCallError,
  ValidationError,
} from "../errors.js";

describe("SDK Errors", () => {
  it("HookOSError has correct name", () => {
    const err = new HookOSError("test");
    expect(err.name).toBe("HookOSError");
    expect(err.message).toBe("test");
    expect(err).toBeInstanceOf(Error);
  });

  it("WalletRequiredError includes operation name", () => {
    const err = new WalletRequiredError("tokens.create");
    expect(err.name).toBe("WalletRequiredError");
    expect(err.message).toContain("tokens.create");
    expect(err).toBeInstanceOf(HookOSError);
  });

  it("TransactionError carries txHash and reason", () => {
    const err = new TransactionError("reverted", { txHash: "0xabc", reason: "paused" });
    expect(err.txHash).toBe("0xabc");
    expect(err.reason).toBe("paused");
  });

  it("ChainError names the unsupported chain", () => {
    const err = new ChainError(12345);
    expect(err.message).toContain("12345");
  });

  it("ContractCallError carries contract and method", () => {
    const err = new ContractCallError("Arena", "createBattle", "not authorized");
    expect(err.contractName).toBe("Arena");
    expect(err.method).toBe("createBattle");
    expect(err.message).toContain("Arena.createBattle");
  });

  it("ValidationError carries field name", () => {
    const err = new ValidationError("symbol", "must be 3-5 chars");
    expect(err.field).toBe("symbol");
    expect(err.message).toContain("symbol");
  });

  it("all errors are instanceof HookOSError", () => {
    const errors = [
      new WalletRequiredError("x"),
      new TransactionError("x"),
      new ChainError(12345),
      new ContractCallError("x", "y", "z"),
      new ValidationError("x", "y"),
    ];
    errors.forEach((e) => expect(e).toBeInstanceOf(HookOSError));
  });
});
