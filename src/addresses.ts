import type { Address } from "viem";

/**
 * Supported HookOS chain IDs.
 * The protocol is LIVE on all five:
 *   8453 Base · 4326 MegaETH · 999 HyperEVM · 56 BNB Chain · 1 Ethereum.
 */
export type ChainId = 8453 | 4326 | 999 | 56 | 1;

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
  /** FeedBoostAuction — on-chain feed boost slot auction (v2). */
  feedBoostAuction: Address;
}

const ZERO: Address = "0x0000000000000000000000000000000000000000";

/**
 * Canonical per-chain contract addresses, sourced from
 * `contracts/deployments/addresses.json` (the single source of truth,
 * keyed by chainId). The 0x000…000 zero address means NOT DEPLOYED on
 * that chain. Base (8453) is the primary chain.
 */
export const ADDRESSES: Record<ChainId, ContractAddresses> = {
  // Base mainnet (primary chain)
  8453: {
    tokenFactory: "0x9B3d636C27AD4CDEBFbE1F182B2b63F66Be7adE5",
    hookRegistry: "0x467A8Ab4A9B65D8Da151F402021b17A147C058c5",
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
    feedBoostAuction: "0xaD31291Ff64a26D2eE5346A3c96b07f6cEe4b442",
  },
  // MegaETH
  4326: {
    tokenFactory: "0x9Bb58abC4A41eaC5692F42Dc59e15b0efb92af81",
    hookRegistry: "0xE1Ecb2b6bB656FF32C886ff41dA59A159EFF41f0",
    hookManager: "0xa9F36a3BaF19b21A764F837e0dF49DFE203636B7",
    feeRouter: "0x69A8C492056F5f58e19d5DA65EBd1869BA24815b",
    arena: "0x30801EAb4C458cF8795eED77cAe5e3F422678347",
    events: "0x77FbF854c2f376280599f5277A1A0c1D1B736Edc",
    bondingCurve: "0x6A2fAa5Da2B9F1515661f18160C0A0d584c0AC15",
    swapRouter: "0x2850C29ACBBe98b1b2C57ac0B673184876266f51",
    poolFactory: "0x1106A0257bbB2f7950f5bcf366e966D24c6F5cDd",
    hookRevenueVault: "0x97e7B6e7F995F45bc20c35ACA02B2CD400864dF9",
    hookOsNft: "0x2Ff14C5681eCAada2B90BC1F0EfF081F7bac8096",
    hookLicenseNft: "0xFEE62e423b3c4bE75315CeCeF08Eb6Ae8d4F4293",
    battlePass: "0xF42c7658A6766f078487102Af20c7C0221c3866F",
    questSystem: "0xeCeDd98C8Fb52ee336e22375c0f8193c1253a2a1",
    clanSystem: "0x360E1FCEcACe39a7d96883e5Ae640DA6E88e6579",
    launchWars: "0xd16e3Ed4ABf1957100DC4063F179C0Ccb7dd895E",
    reputationSystem: "0xCD9Ec2C56fE1f561d63107f1ca9e2B5218e8284e",
    arenaV2: "0xbdfFc8B2db17fDE04D53916E03dCB07ad6D56266",
    analyticsEmitter: "0x4068Df92693a01A1811620076E479D545821fFa0",
    launchController: "0x75bD4983C60147217F3693cb7C45212a98CD3A1C",
    donationRouter: "0xCdC35BED68bE2aD6245D93F8D310408d4aB93167",
    extensionRegistry: "0x57Bd605a01DFF58F6CB1b19a1ddCc0274Dd0f528",
    feedBoostAuction: "0x55eAd32A8B5343e085B92eA087df0FBE60386fF7",
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
    donationRouter: "0xbA57f44D8C90780530c7ea91c999389F77f09b43",
    extensionRegistry: "0x1F15e5Db9670F76a0C863A1D87DFaA037C82B602",
    feedBoostAuction: ZERO,
  },
  // BNB Chain
  56: {
    tokenFactory: "0x60DfFA6940696e8f2dF997b570D9FEACC5eb1Ef7",
    hookRegistry: "0x0dDE71F9711693cABB46FAd461e9F0cB27B96f53",
    hookManager: "0x36f61a66B00ED7248954A494574E6171CFc959a2",
    feeRouter: "0x1a4BBd3cB922Ffd6167f0a75fd037A3760d63B63",
    arena: "0x2eF43362A9aA71DD23Ba336275E976ac300F4864",
    events: "0x071668123E129D665b756EdFFAE713B441cB69d6",
    bondingCurve: "0xbb141A22B4cAef996052b2ecC9F9ef2Cde259bcA",
    swapRouter: "0x4Cd8fd69F93916D6F8793Bdf4418206A172af66F",
    poolFactory: "0x0d04627b6eFc9f546702969fF1faBD7a9642886f",
    hookRevenueVault: "0xc841eF17b424B00A46C5acebDEEbE2976F168AC7",
    hookOsNft: "0x555f5c7e67826b860272fda6fce34Cd36e751F12",
    hookLicenseNft: "0x55931c3a1752365788180CDDeD47E030a104DF11",
    battlePass: "0xe79D1C0941E0448E3793afeA8dF0542c9B032343",
    questSystem: "0xD9Ff755b6113f80276fE36DCddF931084051FD68",
    clanSystem: "0x75bD4983C60147217F3693cb7C45212a98CD3A1C",
    launchWars: "0x9F5690a9128e4E80E9D08F0415DD804d5f7f7168",
    reputationSystem: "0x656e4C8d87780F8b0ba0dB45b9834a25b5200606",
    arenaV2: "0xb1D9aca82B1F011F7Dc37c704F70d49DF048fe3b",
    analyticsEmitter: "0xC0d94a99398b0b3C14971F25F13445Ef3c7fb63c",
    launchController: "0xCdC35BED68bE2aD6245D93F8D310408d4aB93167",
    donationRouter: "0x5B6fF84d8b03c75a3D115cdaF7ee101fa6F1cb92",
    extensionRegistry: "0x6627B03b457Fa41d4C00f0A934aF3D3FFC882038",
    feedBoostAuction: "0xdc9a19ea23e19944c448ED77079cf64396B59610",
  },
  // Ethereum
  1: {
    tokenFactory: "0xa7d00760693CEc4F8c622EeD44C786a190FbA342",
    hookRegistry: "0x93f35a190E6B7ed05E7bBAb78199720C0c849dDE",
    hookManager: "0x677AEE8e641701D68CaD4FB7Ca68AED78DA277c7",
    feeRouter: "0x37F655bdf7C89E17eC1B6A143a572D277b59703C",
    arena: "0x1a4BBd3cB922Ffd6167f0a75fd037A3760d63B63",
    events: "0x0dDE71F9711693cABB46FAd461e9F0cB27B96f53",
    bondingCurve: "0xc841eF17b424B00A46C5acebDEEbE2976F168AC7",
    swapRouter: "0x071668123E129D665b756EdFFAE713B441cB69d6",
    poolFactory: "0xcDfD3B997EC5A2F9CA59955d9aCE30eD8dFbFEff",
    hookRevenueVault: "0x36f61a66B00ED7248954A494574E6171CFc959a2",
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
    feedBoostAuction: ZERO,
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
