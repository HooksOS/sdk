export const BondingCurveABI = [
  {
    "name": "curves",
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
        "name": "token",
        "type": "address"
      },
      {
        "name": "creator",
        "type": "address"
      },
      {
        "name": "virtualTokenReserve",
        "type": "uint256"
      },
      {
        "name": "virtualEthReserve",
        "type": "uint256"
      },
      {
        "name": "tokensSold",
        "type": "uint256"
      },
      {
        "name": "ethCollected",
        "type": "uint256"
      },
      {
        "name": "totalSupply",
        "type": "uint256"
      },
      {
        "name": "graduated",
        "type": "bool"
      },
      {
        "name": "pool",
        "type": "address"
      },
      {
        "name": "createdAt",
        "type": "uint64"
      },
      {
        "name": "useExternal",
        "type": "bool"
      },
      {
        "name": "virtualEthSeed",
        "type": "uint256"
      },
      {
        "name": "graduationEth",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "getPrice",
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
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "getBuyQuote",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "ethAmount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "tokensOut",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "getSellQuote",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "tokenAmount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "ethOut",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "getProgress",
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
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "getMarketCap",
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
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "name": "getCurveCount",
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
    "name": "graduationThresholdEth",
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
    "name": "startMcapUsd",
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
    "name": "graduationUsd",
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
    "name": "virtualEthSeed",
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
    "name": "setUsdTargets",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "startMcapUsd_",
        "type": "uint256"
      },
      {
        "name": "graduationUsd_",
        "type": "uint256"
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
    "name": "setVirtualEthSeed",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "seed",
        "type": "uint256"
      }
    ],
    "outputs": []
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
    "name": "buy",
    "type": "function",
    "stateMutability": "payable",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "name": "sell",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "tokenAmount",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "name": "CurveCreated",
    "type": "event",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "indexed": true
      },
      {
        "name": "creator",
        "type": "address",
        "indexed": true
      },
      {
        "name": "totalSupply",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "TokenBought",
    "type": "event",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "indexed": true
      },
      {
        "name": "buyer",
        "type": "address",
        "indexed": true
      },
      {
        "name": "ethIn",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "tokensOut",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "newPrice",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "TokenSold",
    "type": "event",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "indexed": true
      },
      {
        "name": "seller",
        "type": "address",
        "indexed": true
      },
      {
        "name": "tokensIn",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "ethOut",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "newPrice",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "Graduated",
    "type": "event",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "indexed": true
      },
      {
        "name": "pool",
        "type": "address",
        "indexed": true
      },
      {
        "name": "ethLiquidity",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "tokenLiquidity",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "UsdTargetsUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "startMcapUsd",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "graduationUsd",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "VirtualEthSeedUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "newSeed",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "NativeUsdFeedUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "feed",
        "type": "address",
        "indexed": false
      }
    ],
    "anonymous": false
  },
  {
    "name": "MaxPriceStaleUpdated",
    "type": "event",
    "inputs": [
      {
        "name": "maxPriceStale",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  }
] as const;
