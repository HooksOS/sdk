export const HookManagerABI = [
  {
    name: "maxHooksPerToken",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "defaultGasLimit",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getTokenHookCount",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "token", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getActiveHooks",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "token", type: "address" }],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        components: [
          { name: "hookId", type: "bytes32" },
          { name: "hookImpl", type: "address" },
          { name: "hookPoint", type: "uint8" },
          { name: "active", type: "bool" },
          { name: "gasLimit", type: "uint256" },
          { name: "attachedAt", type: "uint64" },
        ],
      },
    ],
  },
  {
    name: "hasHook",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "", type: "address" },
      { name: "", type: "bytes32" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "paused",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "bool" }],
  },
  {
    name: "attachHook",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "hookId", type: "bytes32" },
      { name: "hookImpl", type: "address" },
      { name: "hookPoint", type: "uint8" },
      { name: "gasLimit", type: "uint256" },
    ],
    outputs: [],
  },
  {
    name: "detachHook",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "token", type: "address" },
      { name: "hookId", type: "bytes32" },
    ],
    outputs: [],
  },
  {
    name: "HookAttached",
    type: "event",
    inputs: [
      { name: "token", type: "address", indexed: true },
      { name: "hookId", type: "bytes32", indexed: true },
      { name: "hookPoint", type: "uint8", indexed: false },
    ],
  },
  {
    name: "HookDetached",
    type: "event",
    inputs: [
      { name: "token", type: "address", indexed: true },
      { name: "hookId", type: "bytes32", indexed: true },
    ],
  },
] as const;
