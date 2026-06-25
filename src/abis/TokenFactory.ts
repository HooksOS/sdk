export const TokenFactoryABI = [
  {
    "name": "launchFee",
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
    "name": "launchFeeUsd",
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
    "name": "effectiveLaunchFee",
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
    "name": "getTokenCount",
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
    "name": "getCreatorTokenCount",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "creator",
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
    "name": "allTokens",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "",
        "type": "uint256"
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
    "name": "tokens",
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
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "name": "creator",
        "type": "address"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      },
      {
        "name": "initialSupply",
        "type": "uint256"
      },
      {
        "name": "launchFee",
        "type": "uint256"
      },
      {
        "name": "createdAt",
        "type": "uint64"
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
    "name": "createToken",
    "type": "function",
    "stateMutability": "payable",
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      },
      {
        "name": "initialSupply",
        "type": "uint256"
      },
      {
        "name": "metadataURI",
        "type": "string"
      }
    ],
    "outputs": [
      {
        "name": "tokenAddress",
        "type": "address"
      }
    ]
  },
  {
    "name": "createTokenAndCurve",
    "type": "function",
    "stateMutability": "payable",
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "symbol",
        "type": "string"
      },
      {
        "name": "initialSupply",
        "type": "uint256"
      },
      {
        "name": "metadataURI",
        "type": "string"
      },
      {
        "name": "useExternalDex",
        "type": "bool"
      }
    ],
    "outputs": [
      {
        "name": "tokenAddress",
        "type": "address"
      }
    ]
  },
  {
    "name": "setLaunchFeeUsd",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "feeUsd",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "name": "setLaunchFee",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "fee",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "name": "TokenCreated",
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
        "name": "name",
        "type": "string",
        "indexed": false
      },
      {
        "name": "symbol",
        "type": "string",
        "indexed": false
      },
      {
        "name": "initialSupply",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false
  }
] as const;
