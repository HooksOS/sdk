export const FeeRouterABI = [
  {
    name: "totalDistributed",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getRecipientCount",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "recipients",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "uint256" }],
    outputs: [
      { name: "wallet", type: "address" },
      { name: "shareBps", type: "uint256" },
      { name: "label", type: "string" },
    ],
  },
  {
    name: "recipientEarnings",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "getTotalShareBps",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
  },
  {
    name: "distribute",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    name: "FeeReceived",
    type: "event",
    inputs: [
      { name: "from", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
    ],
  },
  {
    name: "FeeDistributed",
    type: "event",
    inputs: [
      { name: "recipient", type: "address", indexed: true },
      { name: "amount", type: "uint256", indexed: false },
      { name: "label", type: "string", indexed: false },
    ],
  },
] as const;
