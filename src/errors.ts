/**
 * Error classes for the HookOS SDK.
 */

export class HookOSError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HookOSError";
  }
}

export class WalletRequiredError extends HookOSError {
  constructor(operation: string) {
    super(`Wallet client required for write operation: ${operation}`);
    this.name = "WalletRequiredError";
  }
}

export class TransactionError extends HookOSError {
  public readonly txHash?: string;
  public readonly reason?: string;

  constructor(message: string, opts?: { txHash?: string; reason?: string }) {
    super(message);
    this.name = "TransactionError";
    this.txHash = opts?.txHash;
    this.reason = opts?.reason;
  }
}

export class ChainError extends HookOSError {
  constructor(chainId: number) {
    super(`Unsupported chain: ${chainId}. Supported chains: 8453 (Base), 999 (HyperEVM)`);
    this.name = "ChainError";
  }
}

export class ContractCallError extends HookOSError {
  public readonly contractName: string;
  public readonly method: string;

  constructor(contractName: string, method: string, message: string) {
    super(`${contractName}.${method}: ${message}`);
    this.name = "ContractCallError";
    this.contractName = contractName;
    this.method = method;
  }
}

export class ValidationError extends HookOSError {
  public readonly field: string;

  constructor(field: string, message: string) {
    super(`Validation error on "${field}": ${message}`);
    this.name = "ValidationError";
    this.field = field;
  }
}

export class IndexerError extends HookOSError {
  public readonly statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "IndexerError";
    this.statusCode = statusCode;
  }
}
