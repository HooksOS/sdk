export const FeedBoostAuctionABI = [
  {
    "name": "getSlot",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "active",
        "type": "bool"
      },
      {
        "name": "minBid",
        "type": "uint256"
      },
      {
        "name": "topToken",
        "type": "address"
      },
      {
        "name": "currentBid",
        "type": "uint256"
      },
      {
        "name": "expiry",
        "type": "uint40"
      }
    ]
  },
  {
    "name": "getSlotCount",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ]
  },
  {
    "name": "getSlotConfig",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "minBid",
        "type": "uint256"
      },
      {
        "name": "minIncrement",
        "type": "uint256"
      },
      {
        "name": "duration",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "getActiveBoosts",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "bidder",
        "type": "address"
      },
      {
        "name": "bid",
        "type": "uint256"
      },
      {
        "name": "startTime",
        "type": "uint40"
      },
      {
        "name": "expiry",
        "type": "uint40"
      }
    ]
  },
  {
    "name": "getBidsForToken",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "slotTypes",
        "type": "uint8[]"
      },
      {
        "name": "bids",
        "type": "uint256[]"
      },
      {
        "name": "expiries",
        "type": "uint40[]"
      }
    ]
  },
  {
    "name": "getMinNextBid",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "getTopBoost",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "name": "effectiveMinBid",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "effectiveMinIncrement",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "priceUsd",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "priceUsdOrZero",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "slotActive",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "name": "slotName",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ]
  },
  {
    "name": "boosts",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "outputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "bidder",
        "type": "address"
      },
      {
        "name": "bid",
        "type": "uint256"
      },
      {
        "name": "startTime",
        "type": "uint40"
      },
      {
        "name": "expiry",
        "type": "uint40"
      }
    ]
  },
  {
    "name": "totalCollected",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "pendingRefunds",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "feeRouter",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "name": "protocolFeeBps",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint16"
      }
    ]
  },
  {
    "name": "nativeUsdFeed",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "name": "maxPriceStale",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "paused",
    "type": "function",
    "stateMutability": "view",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "name": "placeBid",
    "type": "function",
    "stateMutability": "payable",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "slotType",
        "type": "uint8"
      }
    ],
    "outputs": []
  },
  {
    "name": "placeBidBatch",
    "type": "function",
    "stateMutability": "payable",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "slots",
        "type": "uint8[]"
      },
      {
        "name": "amounts",
        "type": "uint256[]"
      }
    ],
    "outputs": []
  },
  {
    "name": "extendBoost",
    "type": "function",
    "stateMutability": "payable",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "slotType",
        "type": "uint8"
      }
    ],
    "outputs": []
  },
  {
    "name": "withdrawRefund",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [],
    "outputs": []
  },
  {
    "name": "setSlotConfig",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8"
      },
      {
        "name": "minBid",
        "type": "uint256"
      },
      {
        "name": "minIncrement",
        "type": "uint256"
      },
      {
        "name": "duration",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "name": "setSlotUsd",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8"
      },
      {
        "name": "minBidUsd",
        "type": "uint256"
      },
      {
        "name": "minIncrementUsd",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "name": "addSlot",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "minBid",
        "type": "uint256"
      },
      {
        "name": "minIncrement",
        "type": "uint256"
      },
      {
        "name": "duration",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "id",
        "type": "uint8"
      }
    ]
  },
  {
    "name": "setSlotActive",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8"
      },
      {
        "name": "active",
        "type": "bool"
      }
    ],
    "outputs": []
  },
  {
    "name": "setSlotName",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8"
      },
      {
        "name": "name",
        "type": "string"
      }
    ],
    "outputs": []
  },
  {
    "name": "setFeeRouter",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "router",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "name": "setProtocolFeeBps",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "feeBps",
        "type": "uint16"
      }
    ],
    "outputs": []
  },
  {
    "name": "setNativeUsdFeed",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "feed",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "name": "setMaxPriceStale",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "secs",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "name": "setKeeperPrice",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "priceUsd_",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "name": "BidPlaced",
    "type": "event",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8",
        "indexed": true
      },
      {
        "name": "token",
        "type": "address",
        "indexed": true
      },
      {
        "name": "bidder",
        "type": "address",
        "indexed": true
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "expiry",
        "type": "uint40",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "BidRefunded",
    "type": "event",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8",
        "indexed": true
      },
      {
        "name": "prevBidder",
        "type": "address",
        "indexed": true
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "BoostWon",
    "type": "event",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8",
        "indexed": true
      },
      {
        "name": "token",
        "type": "address",
        "indexed": true
      },
      {
        "name": "bidder",
        "type": "address",
        "indexed": true
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "startTime",
        "type": "uint40",
        "indexed": false
      },
      {
        "name": "expiry",
        "type": "uint40",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "BoostExtended",
    "type": "event",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8",
        "indexed": true
      },
      {
        "name": "token",
        "type": "address",
        "indexed": true
      },
      {
        "name": "bidder",
        "type": "address",
        "indexed": true
      },
      {
        "name": "addedAmount",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "newExpiry",
        "type": "uint40",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "BoostExpired",
    "type": "event",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8",
        "indexed": true
      },
      {
        "name": "token",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false
  },
  {
    "name": "SlotAdded",
    "type": "event",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8",
        "indexed": true
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false
      },
      {
        "name": "minBid",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "minIncrement",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "duration",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "SlotConfigUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8",
        "indexed": true
      },
      {
        "name": "minBid",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "minIncrement",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "duration",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "SlotConfigUsdUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8",
        "indexed": true
      },
      {
        "name": "minBidUsd",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "minIncrementUsd",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "SlotActiveUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8",
        "indexed": true
      },
      {
        "name": "active",
        "type": "bool",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "FeeRouterUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "feeRouter",
        "type": "address",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "ProtocolFeeBpsUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "protocolFeeBps",
        "type": "uint16",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "ProtocolFeeRouted",
    "type": "event",
    "inputs": [
      {
        "name": "slotType",
        "type": "uint8",
        "indexed": true
      },
      {
        "name": "token",
        "type": "address",
        "indexed": true
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "RefundWithdrawn",
    "type": "event",
    "inputs": [
      {
        "name": "bidder",
        "type": "address",
        "indexed": true
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "FeesWithdrawn",
    "type": "event",
    "inputs": [
      {
        "name": "to",
        "type": "address",
        "indexed": true
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  }
] as const;
