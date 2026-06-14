import type { Address } from "viem";

export type ChainId = 8453 | 999;

export interface ContractAddresses {
  tokenFactory: Address;
  hookRegistry: Address;
  hookManager: Address;
  feeRouter: Address;
  arena: Address;
  events: Address;
  bondingCurve: Address;
  swapRouter: Address;
  poolFactory: Address;
  hookRevenueVault: Address;
  hookOsNft: Address;
  hookLicenseNft: Address;
  battlePass: Address;
  questSystem: Address;
  clanSystem: Address;
  launchWars: Address;
  reputationSystem: Address;
  arenaV2: Address;
  analyticsEmitter: Address;
  launchController: Address;
  donationRouter: Address;
  extensionRegistry: Address;
}

const ZERO: Address = "0x0000000000000000000000000000000000000000";

export const ADDRESSES: Record<ChainId, ContractAddresses> = {
  // Base mainnet (primary chain)
  8453: {
    tokenFactory: "0x9B3d636C27AD4CDEBFbE1F182B2b63F66Be7adE5",
    hookRegistry: "0xC062c550b4abcbE8fa50DF05Ea353864d0E01262",
    hookManager: "0x96c5E38362f86E52389E15a86247fB7326503c8d",
    feeRouter: "0x64E3167b2B4eA1b8e3DdCaFe66a5b435BE7cD75f",
    arena: "0x47C839295754307E635DC6bEf89856267932dD38",
    events: "0x2c34ee38d96FBC890d341D80610375657594EFCc",
    bondingCurve: "0x3C4b0F2D3d5bBdf4E0B323f0a8Eec7B02Cce6d40",
    swapRouter: "0x1106A0257bbB2f7950f5bcf366e966D24c6F5cDd",
    poolFactory: "0xEE71e51e757a3B36F027400CDb7182710564654A",
    hookRevenueVault: "0xA1B01d969D39647e5C98416779920d844a1FA961",
    hookOsNft: "0xA50901D97ec77362f8B19464DAbf76B39128fC98",
    hookLicenseNft: "0xe0189E7E729fB8dCfA4799171620335f08Cc4AE5",
    battlePass: "0x55eAd32A8B5343e085B92eA087df0FBE60386fF7",
    questSystem: "0x58235F1112de75606D18ECFD6a136D3745cB70A7",
    clanSystem: "0xEdC0a9BEC4c038CaeEB3CEeeF6B86235397AA8e6",
    launchWars: "0xA1A348a120BB2Fc10059870183db9a513C6A804d",
    reputationSystem: "0x47A66A65fC90349EaaFB1D51c18B61a2d4FFB91d",
    arenaV2: "0xa29FEbD83f0977F39ed29221E6235dA10Cb5b35c",
    analyticsEmitter: "0xd72600d7105d997e495844e30df92cd296b911e4",
    launchController: "0x7eA1c5A725cc4f9ECaDbF706084A90b219e9CB38",
    donationRouter: "0xF5a06e00d26F1b06B76fAAcBc2b5BB177598B1b0",
    extensionRegistry: "0xCE9a474B817E7A102F922F26188A14515aA47f6f",
  },
  // HyperEVM
  999: {
    tokenFactory: "0x96c5E38362f86E52389E15a86247fB7326503c8d",
    hookRegistry: "0x64E3167b2B4eA1b8e3DdCaFe66a5b435BE7cD75f",
    hookManager: "0xC062c550b4abcbE8fa50DF05Ea353864d0E01262",
    feeRouter: "0x8DebEd7101B2e6577909fA07491F484fC2A8Ad2c",
    arena: "0x9B3d636C27AD4CDEBFbE1F182B2b63F66Be7adE5",
    events: "0x47C839295754307E635DC6bEf89856267932dD38",
    bondingCurve: "0x93f35a190E6B7ed05E7bBAb78199720C0c849dDE",
    swapRouter: "0x37F655bdf7C89E17eC1B6A143a572D277b59703C",
    poolFactory: "0xF2F1C1D5089995c55C9Bf0395ebb70EBBF17b61D",
    hookRevenueVault: "0x5c977d2fF0b8aD13ca0AbF954A219E31CF049C60",
    hookOsNft: ZERO,
    hookLicenseNft: ZERO,
    battlePass: ZERO,
    questSystem: ZERO,
    clanSystem: ZERO,
    launchWars: ZERO,
    reputationSystem: ZERO,
    arenaV2: ZERO,
    analyticsEmitter: ZERO,
    launchController: ZERO,
    donationRouter: ZERO,
    extensionRegistry: ZERO,
  },
};

/**
 * Get contract addresses for a specific chain.
 * Defaults to Base (8453) if the chain is not supported.
 */
export function getAddresses(chainId: number = 8453): ContractAddresses {
  const addresses = ADDRESSES[chainId as ChainId];
  if (!addresses) {
    return ADDRESSES[8453];
  }
  return addresses;
}
