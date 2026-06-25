export const HookRegistryABI = [
  {
    "name": "registrationFee",
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
    "name": "registrationFeeUsd",
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
    "name": "effectiveRegistrationFee",
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
    "name": "getHookCount",
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
    "name": "hooks",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ],
    "outputs": [
      {
        "name": "author",
        "type": "address"
      },
      {
        "name": "implementation",
        "type": "address"
      },
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "category",
        "type": "string"
      },
      {
        "name": "metadataURI",
        "type": "string"
      },
      {
        "name": "installs",
        "type": "uint256"
      },
      {
        "name": "totalRating",
        "type": "uint256"
      },
      {
        "name": "ratingCount",
        "type": "uint256"
      },
      {
        "name": "revenue",
        "type": "uint256"
      },
      {
        "name": "verified",
        "type": "bool"
      },
      {
        "name": "active",
        "type": "bool"
      },
      {
        "name": "createdAt",
        "type": "uint64"
      }
    ]
  },
  {
    "name": "hookIds",
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
        "type": "bytes32"
      }
    ]
  },
  {
    "name": "getAverageRating",
    "type": "function",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "hookId",
        "type": "bytes32"
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
    "name": "registerHook",
    "type": "function",
    "stateMutability": "payable",
    "inputs": [
      {
        "name": "name",
        "type": "string"
      },
      {
        "name": "category",
        "type": "string"
      },
      {
        "name": "metadataURI",
        "type": "string"
      },
      {
        "name": "implementation",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "hookId",
        "type": "bytes32"
      }
    ]
  },
  {
    "name": "rateHook",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "hookId",
        "type": "bytes32"
      },
      {
        "name": "rating",
        "type": "uint8"
      }
    ],
    "outputs": []
  },
  {
    "name": "recordInstall",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "hookId",
        "type": "bytes32"
      }
    ],
    "outputs": []
  },
  {
    "name": "setRegistrationFeeUsd",
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
    "name": "setRegistrationFee",
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
    "name": "HookRegistered",
    "type": "event",
    "inputs": [
      {
        "name": "hookId",
        "type": "bytes32",
        "indexed": true
      },
      {
        "name": "author",
        "type": "address",
        "indexed": true
      },
      {
        "name": "name",
        "type": "string",
        "indexed": false
      },
      {
        "name": "implementation",
        "type": "address",
        "indexed": false
      }
    ],
    "anonymous": false
  }
] as const;
