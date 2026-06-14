# @hookos/sdk

TypeScript SDK for the **HookOS Protocol** — a programmable market engine on Base.

HookOS combines token launches with custom AMM hooks (MEV shields, burns, PvP wagers, AI-tuned fees), a bonding curve DEX, a PvP arena, and a hook marketplace.

## Installation

```bash
npm install @hookos/sdk viem
```

`viem` is a peer dependency (>= 2.0.0).

## Quick Start

### Read-only (no wallet needed)

```ts
import { HookOS } from "@hookos/sdk";

const hookos = new HookOS();

// Get all tokens
const tokens = await hookos.tokens.list();
console.log(`${tokens.length} tokens launched`);

// Get bonding curve price
const price = await hookos.trading.getPrice("0x...");
console.log(`Price: ${price} wei per token`);

// Get buy quote
const quote = await hookos.trading.getBuyQuote("0x...", 100000000000000000n); // 0.1 ETH
console.log(`You would receive: ${quote} tokens`);

// Browse hooks
const hooks = await hookos.hooks.browse({ active: true });
console.log(`${hooks.length} active hooks`);

// Get fee distribution info
const shares = await hookos.fees.getShares();
shares.forEach((s) => console.log(`${s.label}: ${s.shareBps} bps`));
```

### With wallet (for write operations)

```ts
import { HookOS } from "@hookos/sdk";
import { createWalletClient, custom, parseEther } from "viem";
import { base } from "viem/chains";

const walletClient = createWalletClient({
  chain: base,
  transport: custom(window.ethereum!),
});

const hookos = new HookOS({ walletClient });

// Create a token
const { tokenAddress, txResult } = await hookos.tokens.create({
  name: "My Token",
  symbol: "MTK",
  initialSupply: 1_000_000_000n * 10n ** 18n,
  metadataURI: "ipfs://...",
});
console.log(`Token deployed at ${tokenAddress}`);

// Buy tokens on bonding curve
const buyTx = await hookos.trading.buy(tokenAddress, parseEther("0.1"));
console.log(`Buy tx: ${buyTx.hash}`);

// Place a wager in the arena
import { Side } from "@hookos/sdk";
const wagerTx = await hookos.arena.wager({
  battleId: 0,
  side: Side.TeamA,
  value: parseEther("0.01"),
});
```

### Custom RPC / chain

```ts
import { HookOS } from "@hookos/sdk";

// Use custom RPC
const hookos = new HookOS({
  rpcUrl: "https://your-rpc.example.com",
});

// Use HyperEVM
const hyperHookos = new HookOS({
  chainId: 999,
});
```

### Bring your own PublicClient

```ts
import { HookOS } from "@hookos/sdk";
import { createPublicClient, http } from "viem";
import { base } from "viem/chains";

const publicClient = createPublicClient({
  chain: base,
  transport: http("https://your-rpc.example.com"),
});

const hookos = new HookOS({ publicClient });
```

## API Reference

### `new HookOS(options?)`

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `chainId` | `8453 \| 999` | `8453` | Target chain (Base or HyperEVM) |
| `rpcUrl` | `string` | Public RPC | Custom RPC URL |
| `walletClient` | `WalletClient` | — | viem WalletClient for write ops |
| `publicClient` | `PublicClient` | — | Existing viem PublicClient |

### `hookos.tokens`

| Method | Description |
|--------|-------------|
| `getCount()` | Total tokens created |
| `getLaunchFee()` | Current launch fee (wei) |
| `getCreatorCount(creator)` | Tokens by a specific creator |
| `get(address)` | Token info by address |
| `list(limit?)` | List all tokens |
| `isPaused()` | Check if factory is paused |
| `create(params)` | Create a new token (requires wallet) |

### `hookos.trading`

| Method | Description |
|--------|-------------|
| `getCurveCount()` | Total bonding curves |
| `getCurve(token)` | Full curve state |
| `getPrice(token)` | Current price (wei per token) |
| `getBuyQuote(token, ethAmount)` | Tokens out for ETH in |
| `getSellQuote(token, tokenAmount)` | ETH out for tokens in |
| `getProgress(token)` | Graduation progress (0-10000) |
| `getMarketCap(token)` | Market cap in wei |
| `getGraduationThreshold()` | ETH threshold to graduate |
| `buy(token, ethAmount)` | Buy tokens with ETH (requires wallet) |
| `sell(token, tokenAmount)` | Sell tokens for ETH (requires wallet) |

### `hookos.hooks`

| Method | Description |
|--------|-------------|
| `getCount()` | Total registered hooks |
| `getRegistrationFee()` | Registration fee (wei) |
| `get(hookId)` | Hook info by ID |
| `browse(filters?)` | Browse hooks with optional filters |
| `listBindings(token)` | Active hooks on a token |
| `hasHook(token, hookId)` | Check if hook is attached |
| `register(params)` | Register a new hook (requires wallet) |
| `attach(params)` | Attach hook to token (requires wallet) |
| `detach(params)` | Detach hook from token (requires wallet) |

### `hookos.arena`

| Method | Description |
|--------|-------------|
| `getCount()` | Total battles |
| `getBattle(battleId)` | Battle info |
| `hasWagered(battleId, player)` | Check if player wagered |
| `getWagerCount(battleId)` | Wager count |
| `getProtocolFeeBps()` | Protocol fee (bps) |
| `create(params)` | Create battle (requires wallet + OPERATOR_ROLE) |
| `wager(params)` | Place wager (requires wallet) |
| `claim(battleId)` | Claim winnings (requires wallet) |

### `hookos.events`

| Method | Description |
|--------|-------------|
| `getCount()` | Total events |
| `getEvent(eventId)` | Event info |
| `getCurrentSeason()` | Current season number |
| `isRegistered(eventId, player)` | Check registration |
| `register(eventId, opts?)` | Register for event (requires wallet) |
| `claimPrize(eventId)` | Claim prize (requires wallet) |

### `hookos.fees`

| Method | Description |
|--------|-------------|
| `getTotalDistributed()` | Total fees distributed (wei) |
| `getRecipientCount()` | Number of recipients |
| `getShares()` | All fee recipients |
| `getEarnings(wallet)` | Earnings for an address |
| `distribute()` | Trigger fee distribution (requires wallet) |

## Contract Addresses (Base)

| Contract | Address |
|----------|---------|
| TokenFactory | `0x9B3d636C27AD4CDEBFbE1F182B2b63F66Be7adE5` |
| HookRegistry | `0xC062c550b4abcbE8fa50DF05Ea353864d0E01262` |
| HookManager | `0x96c5E38362f86E52389E15a86247fB7326503c8d` |
| FeeRouter | `0x64E3167b2B4eA1b8e3DdCaFe66a5b435BE7cD75f` |
| Arena | `0x47C839295754307E635DC6bEf89856267932dD38` |
| BondingCurve | `0x3C4b0F2D3d5bBdf4E0B323f0a8Eec7B02Cce6d40` |
| Events | `0x2c34ee38d96FBC890d341D80610375657594EFCc` |

## Supported Chains

| Chain | ID | Status |
|-------|----|--------|
| Base | 8453 | Live |
| HyperEVM | 999 | Coming Soon |

## Links

- Website: [hookos.fun](https://hookos.fun)
- X: [@hookosfun](https://x.com/hookosfun)
- Telegram: [HookOS Portal](https://t.me/HookOSPortal)
- Documentation: [docs.hookos.fun](https://docs.hookos.fun)

## License

MIT
