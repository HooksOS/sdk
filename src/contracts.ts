/**
 * Contract addresses and ABIs for HookOS protocol.
 * Addresses are organized per chain ID.
 */

// ---------------------------------------------------------------------------
// Chain IDs
// ---------------------------------------------------------------------------

export const CHAIN_IDS = {
  base: 8453,
  hyperevm: 999,
} as const;

export type SupportedChainId = (typeof CHAIN_IDS)[keyof typeof CHAIN_IDS];

// ---------------------------------------------------------------------------
// Contract address config per chain
// ---------------------------------------------------------------------------

export interface ContractAddresses {
  TokenFactory: `0x${string}`;
  HookRegistry: `0x${string}`;
  HookManager: `0x${string}`;
  BondingCurve: `0x${string}`;
  FeeRouter: `0x${string}`;
  Arena: `0x${string}`;
  Events: `0x${string}`;
  SwapRouter: `0x${string}`;
  PoolFactory: `0x${string}`;
  HookRevenueVault: `0x${string}`;
  HookLicenseNFT: `0x${string}`;
  HookOSKernel: `0x${string}`;
  BattlePass: `0x${string}`;
  QuestSystem: `0x${string}`;
  ClanSystem: `0x${string}`;
  LaunchWars: `0x${string}`;
  ReputationSystem: `0x${string}`;
  ArenaV2: `0x${string}`;
  LaunchController: `0x${string}`;
  ProjectRegistry: `0x${string}`;
}

const ZERO = "0x0000000000000000000000000000000000000000" as `0x${string}`;

const BASE_ADDRESSES: ContractAddresses = {
  TokenFactory: "0x9B3d636C27AD4CDEBFbE1F182B2b63F66Be7adE5",
  HookRegistry: "0xC062c550b4abcbE8fa50DF05Ea353864d0E01262",
  HookManager: "0x96c5E38362f86E52389E15a86247fB7326503c8d",
  BondingCurve: "0x3C4b0F2D3d5bBdf4E0B323f0a8Eec7B02Cce6d40",
  FeeRouter: "0x64E3167b2B4eA1b8e3DdCaFe66a5b435BE7cD75f",
  Arena: "0x47C839295754307E635DC6bEf89856267932dD38",
  Events: "0x2c34ee38d96FBC890d341D80610375657594EFCc",
  SwapRouter: "0x1106A0257bbB2f7950f5bcf366e966D24c6F5cDd",
  PoolFactory: "0xEE71e51e757a3B36F027400CDb7182710564654A",
  HookRevenueVault: "0xA1B01d969D39647e5C98416779920d844a1FA961",
  HookLicenseNFT: "0xe0189E7E729fB8dCfA4799171620335f08Cc4AE5",
  HookOSKernel: "0xE2ED29B574f5260F75Cea5187880740C92694e20",
  BattlePass: "0x55eAd32A8B5343e085B92eA087df0FBE60386fF7",
  QuestSystem: "0x58235F1112de75606D18ECFD6a136D3745cB70A7",
  ClanSystem: "0xEdC0a9BEC4c038CaeEB3CEeeF6B86235397AA8e6",
  LaunchWars: "0xA1A348a120BB2Fc10059870183db9a513C6A804d",
  ReputationSystem: "0x47A66A65fC90349EaaFB1D51c18B61a2d4FFB91d",
  ArenaV2: "0xa29FEbD83f0977F39ed29221E6235dA10Cb5b35c",
  LaunchController: "0x7eA1c5A725cc4f9ECaDbF706084A90b219e9CB38",
  ProjectRegistry: "0x4797BE0917C953f246Cf654Cf596Ef17779F612C",
};

const HYPEREVM_ADDRESSES: ContractAddresses = {
  TokenFactory: "0x96c5E38362f86E52389E15a86247fB7326503c8d",
  HookRegistry: "0x64E3167b2B4eA1b8e3DdCaFe66a5b435BE7cD75f",
  HookManager: "0xC062c550b4abcbE8fa50DF05Ea353864d0E01262",
  BondingCurve: "0x93f35a190E6B7ed05E7bBAb78199720C0c849dDE",
  FeeRouter: "0x8DebEd7101B2e6577909fA07491F484fC2A8Ad2c",
  Arena: "0x9B3d636C27AD4CDEBFbE1F182B2b63F66Be7adE5",
  Events: "0x47C839295754307E635DC6bEf89856267932dD38",
  SwapRouter: "0x37F655bdf7C89E17eC1B6A143a572D277b59703C",
  PoolFactory: "0xF2F1C1D5089995c55C9Bf0395ebb70EBBF17b61D",
  HookRevenueVault: "0x5c977d2fF0b8aD13ca0AbF954A219E31CF049C60",
  HookLicenseNFT: ZERO,
  HookOSKernel: ZERO,
  BattlePass: ZERO,
  QuestSystem: ZERO,
  ClanSystem: ZERO,
  LaunchWars: ZERO,
  ReputationSystem: ZERO,
  ArenaV2: ZERO,
  LaunchController: ZERO,
  ProjectRegistry: ZERO,
};

export const ADDRESSES: Record<number, ContractAddresses> = {
  [CHAIN_IDS.base]: BASE_ADDRESSES,
  [CHAIN_IDS.hyperevm]: HYPEREVM_ADDRESSES,
};

export function getAddresses(chainId: number): ContractAddresses {
  const addrs = ADDRESSES[chainId];
  if (!addrs) {
    throw new Error(`No contract addresses for chain ${chainId}. Supported: ${Object.keys(ADDRESSES).join(", ")}`);
  }
  return addrs;
}

// ---------------------------------------------------------------------------
// ABIs — viem-compatible JSON format (inlined)
// ---------------------------------------------------------------------------

export const TokenFactoryABI = [
  { type: "function", name: "launchFee", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getTokenCount", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getCreatorTokenCount", inputs: [{ name: "creator", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "allTokens", inputs: [{ name: "", type: "uint256" }], outputs: [{ name: "", type: "address" }], stateMutability: "view" },
  { type: "function", name: "tokens", inputs: [{ name: "", type: "address" }], outputs: [{ name: "tokenAddress", type: "address" }, { name: "creator", type: "address" }, { name: "name", type: "string" }, { name: "symbol", type: "string" }, { name: "initialSupply", type: "uint256" }, { name: "launchFee", type: "uint256" }, { name: "createdAt", type: "uint64" }], stateMutability: "view" },
  { type: "function", name: "creatorTokens", inputs: [{ name: "", type: "address" }, { name: "", type: "uint256" }], outputs: [{ name: "", type: "address" }], stateMutability: "view" },
  { type: "function", name: "paused", inputs: [], outputs: [{ name: "", type: "bool" }], stateMutability: "view" },
  { type: "function", name: "createToken", inputs: [{ name: "name", type: "string" }, { name: "symbol", type: "string" }, { name: "initialSupply", type: "uint256" }, { name: "metadataURI", type: "string" }], outputs: [{ name: "tokenAddress", type: "address" }], stateMutability: "payable" },
  { type: "event", name: "TokenCreated", inputs: [{ name: "token", type: "address", indexed: true }, { name: "creator", type: "address", indexed: true }, { name: "name", type: "string", indexed: false }, { name: "symbol", type: "string", indexed: false }, { name: "initialSupply", type: "uint256", indexed: false }] },
] as const;

export const BondingCurveABI = [
  { type: "function", name: "curves", inputs: [{ name: "", type: "address" }], outputs: [{ name: "token", type: "address" }, { name: "creator", type: "address" }, { name: "virtualTokenReserve", type: "uint256" }, { name: "virtualEthReserve", type: "uint256" }, { name: "tokensSold", type: "uint256" }, { name: "ethCollected", type: "uint256" }, { name: "totalSupply", type: "uint256" }, { name: "graduated", type: "bool" }, { name: "pool", type: "address" }, { name: "createdAt", type: "uint64" }, { name: "useExternal", type: "bool" }], stateMutability: "view" },
  { type: "function", name: "getPrice", inputs: [{ name: "token", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getBuyQuote", inputs: [{ name: "token", type: "address" }, { name: "ethAmount", type: "uint256" }], outputs: [{ name: "tokensOut", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getSellQuote", inputs: [{ name: "token", type: "address" }, { name: "tokenAmount", type: "uint256" }], outputs: [{ name: "ethOut", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getProgress", inputs: [{ name: "token", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getMarketCap", inputs: [{ name: "token", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getCurveCount", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "graduationThresholdEth", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "paused", inputs: [], outputs: [{ name: "", type: "bool" }], stateMutability: "view" },
  { type: "function", name: "buy", inputs: [{ name: "token", type: "address" }], outputs: [], stateMutability: "payable" },
  { type: "function", name: "sell", inputs: [{ name: "token", type: "address" }, { name: "tokenAmount", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "createCurve", inputs: [{ name: "token", type: "address" }, { name: "creator", type: "address" }, { name: "totalSupply", type: "uint256" }, { name: "useExtDex", type: "bool" }], outputs: [], stateMutability: "nonpayable" },
  { type: "event", name: "CurveCreated", inputs: [{ name: "token", type: "address", indexed: true }, { name: "creator", type: "address", indexed: true }, { name: "totalSupply", type: "uint256", indexed: false }] },
  { type: "event", name: "TokenBought", inputs: [{ name: "token", type: "address", indexed: true }, { name: "buyer", type: "address", indexed: true }, { name: "ethIn", type: "uint256", indexed: false }, { name: "tokensOut", type: "uint256", indexed: false }, { name: "newPrice", type: "uint256", indexed: false }] },
  { type: "event", name: "TokenSold", inputs: [{ name: "token", type: "address", indexed: true }, { name: "seller", type: "address", indexed: true }, { name: "tokensIn", type: "uint256", indexed: false }, { name: "ethOut", type: "uint256", indexed: false }, { name: "newPrice", type: "uint256", indexed: false }] },
  { type: "event", name: "Graduated", inputs: [{ name: "token", type: "address", indexed: true }, { name: "pool", type: "address", indexed: true }, { name: "ethLiquidity", type: "uint256", indexed: false }, { name: "tokenLiquidity", type: "uint256", indexed: false }] },
] as const;

export const HookRegistryABI = [
  { type: "function", name: "registrationFee", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getHookCount", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "hooks", inputs: [{ name: "", type: "bytes32" }], outputs: [{ name: "author", type: "address" }, { name: "implementation", type: "address" }, { name: "name", type: "string" }, { name: "category", type: "string" }, { name: "metadataURI", type: "string" }, { name: "installs", type: "uint256" }, { name: "totalRating", type: "uint256" }, { name: "ratingCount", type: "uint256" }, { name: "revenue", type: "uint256" }, { name: "verified", type: "bool" }, { name: "active", type: "bool" }, { name: "createdAt", type: "uint64" }], stateMutability: "view" },
  { type: "function", name: "hookIds", inputs: [{ name: "", type: "uint256" }], outputs: [{ name: "", type: "bytes32" }], stateMutability: "view" },
  { type: "function", name: "getAverageRating", inputs: [{ name: "hookId", type: "bytes32" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "registerHook", inputs: [{ name: "name", type: "string" }, { name: "category", type: "string" }, { name: "metadataURI", type: "string" }, { name: "implementation", type: "address" }], outputs: [{ name: "hookId", type: "bytes32" }], stateMutability: "payable" },
  { type: "function", name: "rateHook", inputs: [{ name: "hookId", type: "bytes32" }, { name: "rating", type: "uint8" }], outputs: [], stateMutability: "nonpayable" },
  { type: "event", name: "HookRegistered", inputs: [{ name: "hookId", type: "bytes32", indexed: true }, { name: "author", type: "address", indexed: true }, { name: "name", type: "string", indexed: false }, { name: "implementation", type: "address", indexed: false }] },
] as const;

export const HookManagerABI = [
  { type: "function", name: "maxHooksPerToken", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getActiveHooks", inputs: [{ name: "token", type: "address" }], outputs: [{ name: "", type: "tuple[]", components: [{ name: "hookId", type: "bytes32" }, { name: "hookImpl", type: "address" }, { name: "hookPoint", type: "uint8" }, { name: "active", type: "bool" }, { name: "gasLimit", type: "uint256" }, { name: "attachedAt", type: "uint64" }] }], stateMutability: "view" },
  { type: "function", name: "hasHook", inputs: [{ name: "", type: "address" }, { name: "", type: "bytes32" }], outputs: [{ name: "", type: "bool" }], stateMutability: "view" },
  { type: "function", name: "attachHook", inputs: [{ name: "token", type: "address" }, { name: "hookId", type: "bytes32" }, { name: "hookImpl", type: "address" }, { name: "hookPoint", type: "uint8" }, { name: "gasLimit", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
  { type: "function", name: "detachHook", inputs: [{ name: "token", type: "address" }, { name: "hookId", type: "bytes32" }], outputs: [], stateMutability: "nonpayable" },
  { type: "event", name: "HookAttached", inputs: [{ name: "token", type: "address", indexed: true }, { name: "hookId", type: "bytes32", indexed: true }, { name: "hookPoint", type: "uint8", indexed: false }] },
  { type: "event", name: "HookDetached", inputs: [{ name: "token", type: "address", indexed: true }, { name: "hookId", type: "bytes32", indexed: true }] },
] as const;

export const ArenaABI = [
  { type: "function", name: "battleCount", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "protocolFeeBps", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "battles", inputs: [{ name: "", type: "uint256" }], outputs: [{ name: "tokenA", type: "address" }, { name: "tokenB", type: "address" }, { name: "pot", type: "uint256" }, { name: "teamAPot", type: "uint256" }, { name: "teamBPot", type: "uint256" }, { name: "minWager", type: "uint256" }, { name: "maxWager", type: "uint256" }, { name: "startTime", type: "uint64" }, { name: "endTime", type: "uint64" }, { name: "round", type: "uint16" }, { name: "status", type: "uint8" }, { name: "winner", type: "uint8" }], stateMutability: "view" },
  { type: "function", name: "hasWagered", inputs: [{ name: "", type: "uint256" }, { name: "", type: "address" }], outputs: [{ name: "", type: "bool" }], stateMutability: "view" },
  { type: "function", name: "getBattleWagerCount", inputs: [{ name: "battleId", type: "uint256" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "createBattle", inputs: [{ name: "tokenA", type: "address" }, { name: "tokenB", type: "address" }, { name: "minWager", type: "uint256" }, { name: "maxWager", type: "uint256" }, { name: "startTime", type: "uint64" }, { name: "endTime", type: "uint64" }], outputs: [{ name: "battleId", type: "uint256" }], stateMutability: "nonpayable" },
  { type: "function", name: "placeWager", inputs: [{ name: "battleId", type: "uint256" }, { name: "side", type: "uint8" }], outputs: [], stateMutability: "payable" },
  { type: "function", name: "claimWinnings", inputs: [{ name: "battleId", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
  { type: "event", name: "BattleCreated", inputs: [{ name: "battleId", type: "uint256", indexed: true }, { name: "tokenA", type: "address", indexed: false }, { name: "tokenB", type: "address", indexed: false }, { name: "startTime", type: "uint64", indexed: false }, { name: "endTime", type: "uint64", indexed: false }] },
  { type: "event", name: "WagerPlaced", inputs: [{ name: "battleId", type: "uint256", indexed: true }, { name: "player", type: "address", indexed: true }, { name: "side", type: "uint8", indexed: false }, { name: "amount", type: "uint256", indexed: false }] },
  { type: "event", name: "WinningsClaimed", inputs: [{ name: "battleId", type: "uint256", indexed: true }, { name: "player", type: "address", indexed: true }, { name: "amount", type: "uint256", indexed: false }] },
] as const;

export const FeeRouterABI = [
  { type: "function", name: "totalDistributed", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getRecipientCount", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "recipients", inputs: [{ name: "", type: "uint256" }], outputs: [{ name: "wallet", type: "address" }, { name: "shareBps", type: "uint256" }, { name: "label", type: "string" }], stateMutability: "view" },
  { type: "function", name: "recipientEarnings", inputs: [{ name: "", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "getTotalShareBps", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "distribute", inputs: [], outputs: [], stateMutability: "nonpayable" },
  { type: "event", name: "FeeReceived", inputs: [{ name: "from", type: "address", indexed: true }, { name: "amount", type: "uint256", indexed: false }] },
  { type: "event", name: "FeeDistributed", inputs: [{ name: "recipient", type: "address", indexed: true }, { name: "amount", type: "uint256", indexed: false }, { name: "label", type: "string", indexed: false }] },
] as const;

export const ERC20ABI = [
  { type: "function", name: "approve", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" },
  { type: "function", name: "allowance", inputs: [{ name: "owner", type: "address" }, { name: "recipient", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "balanceOf", inputs: [{ name: "account", type: "address" }], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "totalSupply", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "name", inputs: [], outputs: [{ name: "", type: "string" }], stateMutability: "view" },
  { type: "function", name: "symbol", inputs: [], outputs: [{ name: "", type: "string" }], stateMutability: "view" },
  { type: "function", name: "decimals", inputs: [], outputs: [{ name: "", type: "uint8" }], stateMutability: "view" },
  { type: "function", name: "transfer", inputs: [{ name: "to", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ name: "", type: "bool" }], stateMutability: "nonpayable" },
] as const;

export const EventsABI = [
  { type: "function", name: "eventCount", inputs: [], outputs: [{ name: "", type: "uint256" }], stateMutability: "view" },
  { type: "function", name: "currentSeason", inputs: [], outputs: [{ name: "", type: "uint16" }], stateMutability: "view" },
  { type: "function", name: "events", inputs: [{ name: "", type: "uint256" }], outputs: [{ name: "name", type: "string" }, { name: "category", type: "string" }, { name: "metadataURI", type: "string" }, { name: "prizePool", type: "uint256" }, { name: "entryFee", type: "uint256" }, { name: "maxPlayers", type: "uint256" }, { name: "playerCount", type: "uint256" }, { name: "startTime", type: "uint64" }, { name: "endTime", type: "uint64" }, { name: "season", type: "uint16" }, { name: "status", type: "uint8" }], stateMutability: "view" },
  { type: "function", name: "isRegistered", inputs: [{ name: "", type: "uint256" }, { name: "", type: "address" }], outputs: [{ name: "", type: "bool" }], stateMutability: "view" },
  { type: "function", name: "createEvent", inputs: [{ name: "name", type: "string" }, { name: "category", type: "string" }, { name: "metadataURI", type: "string" }, { name: "entryFee", type: "uint256" }, { name: "maxPlayers", type: "uint256" }, { name: "startTime", type: "uint64" }, { name: "endTime", type: "uint64" }], outputs: [{ name: "eventId", type: "uint256" }], stateMutability: "payable" },
  { type: "function", name: "register", inputs: [{ name: "eventId", type: "uint256" }], outputs: [], stateMutability: "payable" },
  { type: "function", name: "claimPrize", inputs: [{ name: "eventId", type: "uint256" }], outputs: [], stateMutability: "nonpayable" },
  { type: "event", name: "EventCreated", inputs: [{ name: "eventId", type: "uint256", indexed: true }, { name: "name", type: "string", indexed: false }, { name: "season", type: "uint16", indexed: false }, { name: "startTime", type: "uint64", indexed: false }] },
  { type: "event", name: "PlayerRegistered", inputs: [{ name: "eventId", type: "uint256", indexed: true }, { name: "player", type: "address", indexed: true }] },
] as const;
