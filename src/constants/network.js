export const networks = {
  BTC: {
    coinSymbol: "BTC",
    coinName: "Bitcoin",
    testnet: false,
    derivePath: "m/44'/0'/0'/0",
    maxFee: 1000000,
    defaultFee: 1000,
    bitcoinjsNetwork: {
      messagePrefix: "\x18Bitcoin Signed Message:\n",
      bech32: "bc",
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80
    },
    electrumx: {
      networkName: "BitcoinSegwit",
      peers: [
        {
          host: "E-X.not.fyi",
          port: 50002
        },
        {
          host: "elec.luggs.co",
          port: 443
        },
        {
          host: "ultra-ecoelectrum.my-gateway.de",
          port: 50002
        },
        {
          host: "electrum.hsmiths.com",
          port: 50002
        },
        // {
        //   host: 'vps3.hsmiths.com',
        //   port: 50002
        // },
        {
          host: "ndnd.selfhost.eu",
          port: 50002
        }
      ]
    },
    insight: "https://insight.bitpay.com/api/"
  },
  BTCTESTNET: {
    coinSymbol: "BTCTESTNET",
    coinName: "Bitcoin Testnet",
    testnet: true,
    derivePath: "m/44'/1'/0'/0",
    maxFee: 1000000,
    defaultFee: 1000,
    bitcoinjsNetwork: {
      messagePrefix: "\x18Bitcoin Signed Message:\n",
      bech32: "tb",
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    },
    electrumx: {
      networkName: "BitcoinSegwitTestnet",
      peers: [
        {
          host: "testnet.qtornado.com",
          port: 51002
        },
        {
          host: "testnet1.bauerj.eu",
          port: 50002
        }
      ]
    },
    insight: "https://test-insight.bitpay.com/api/"
  },
  LTC: {
    coinSymbol: "LTC",
    coinName: "Litecoin",
    testnet: false,
    derivePath: "m/44'/2'/0'/0",
    maxFee: 1000000,
    defaultFee: 50000,
    bitcoinjsNetwork: {
      messagePrefix: "\x19Litecoin Signed Message:\n",
      bip32: {
        public: 0x019da462,
        private: 0x019d9cfe
      },
      pubKeyHash: 0x30,
      scriptHash: 0x32,
      wif: 0xb0
    },
    electrumx: {
      networkName: "Litecoin",
      peers: [
        {
          host: "elec.luggs.co",
          port: 444
        },
        {
          host: "electrum-ltc.bysh.me",
          port: 50002
        },
        {
          host: "electrum-ltc.festivaldelhumor.org",
          port: 50002
        },
        {
          host: "electrum.ltc.xurious.com",
          port: 50002
        }
      ]
    },
    insight: "https://insight.litecore.io/api/"
  },
  LTCTESTNET: {
    coinSymbol: "LTCTESTNET",
    coinName: "Litecoin Testnet",
    testnet: true,
    derivePath: "m/44'/1'/0'/0",
    maxFee: 1000000,
    defaultFee: 50000,
    bitcoinjsNetwork: {
      messagePrefix: "\x18Litecoin Signed Message:\n",
      bip32: {
        public: 0x0436ef7d,
        private: 0x0436f6e1
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    },
    electrumx: {
      networkName: "LitecoinTestnet",
      peers: [
        {
          host: "electrum-ltc.bysh.me",
          port: 51002
        },
        {
          host: "electrum-ltc.xurious.com",
          port: 51002
        }
      ]
    },
    insight: undefined
  },
  DASH: {
    coinSymbol: "DASH",
    coinName: "Dash",
    testnet: false,
    derivePath: "m/44'/5'/0'/0",
    maxFee: 1000000,
    defaultFee: 50000,
    bitcoinjsNetwork: {
      messagePrefix: "\x19DarkCoin Signed Message:\n",
      bip32: {
        public: 0x02fe52f8,
        private: 0x02fe52cc
      },
      pubKeyHash: 0x4c,
      scriptHash: 0x10,
      wif: 0xcc,
      dustThreshold: 5460
    },
    electrumx: {
      networkName: "Dash",
      peers: [
        {
          host: "electrum.dash.siampm.com",
          port: 50002
        },
        {
          host: "electrum.leblancnet.us",
          port: 50016
        }
      ]
    },
    insight: "https://insight.dash.org/insight-api-dash/"
  },
  DASHTESTNET: {
    coinSymbol: "DASHTESTNET",
    coinName: "Dash Testenet",
    testnet: true,
    derivePath: "m/44'/1'/0'/0",
    maxFee: 1000000,
    defaultFee: 50000,
    bitcoinjsNetwork: {
      messagePrefix: "\x19DarkCoin Signed Message:\n",
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x8c,
      scriptHash: 0x13,
      wif: 0xef
    },
    electrumx: {
      networkName: "DashTestnet",
      peers: "undefined"
    }
  },
  LUNES: {
    coinSymbol: "LUNES",
    coinName: "Lunes",
    testnet: false,
    apiUrl: "https://lunesnode.lunes.io",
    APICONFIG: {
      minimumSeedLength: 25,
      requestOffset: 0,
      requestLimit: 100,
      logLevel: "warning",
      timeDiff: 0,
      networkByte: "1".charCodeAt(0),
      nodeAddress: "https://lunesnode.lunes.io/",
      matcherAddress: "https://lunesnode.lunes.io/matcher"
    }
  },
  LUNESTESTNET: {
    coinSymbol: "LUNES",
    coinName: "Lunes",
    testnet: true,
    apiUrl: "https://lunesnode-testnet.lunes.io",
    APICONFIG: {
      minimumSeedLength: 25,
      requestOffset: 0,
      requestLimit: 100,
      logLevel: "warning",
      timeDiff: 0,
      networkByte: "0".charCodeAt(0),
      nodeAddress: "https://lunesnode-testnet.lunes.io",
      matcherAddress: "https://lunesnode-testnet.lunes.io/matcher"
    }
  },
  BCH: {
    coinSymbol: "BCH",
    coinName: "Bitcoin Cash",
    testnet: false,
    derivePath: "m/44'/145'/0'/0",
    maxFee: 1000000,
    defaultFee: 1000,
    bitcoinjsNetwork: {
      messagePrefix: "\x18Bitcoin Signed Message:\n",
      bech32: "bc",
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80
    },
    electrumx: {
      networkName: "BitcoinSegwit",
      peers: [
        {
          host: "bch0.kister.net",
          port: 50002
        },
        {
          host: "abc1.hsmiths.com",
          port: 60002
        },
        {
          host: "electrumx-bch.cryptonermal.net",
          port: 50002
        },
        {
          host: "electrum.imaginary.cash",
          port: 50002
        }
      ]
    },
    insight: null
  },
  BCHTESTNET: {
    coinSymbol: "BCH",
    coinName: "Bitcoin Cash Testnet",
    testnet: true,
    derivePath: "m/44'/1'/0'/0",
    maxFee: 1000000,
    defaultFee: 1000,
    bitcoinjsNetwork: {
      messagePrefix: "\x18Bitcoin Signed Message:\n",
      bech32: "tb",
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    },
    electrumx: {
      networkName: "BitcoinCashTestnet",
      peers: [
        {
          host: "bch0.kister.net",
          port: 51002
        }
      ]
    },
    insight: null
  },
  ETH: {
    coinSymbol: "ETH",
    coinName: "Ethereum",
    testnet: false,
    derivePath: "m/44'/60'/0'/0/0",
    gasPrice: 10000000000,
    gasLimit: 21000,
    chainID: 1,
    apiUrl: "https://api.myetherwallet.com/eth"
  },
  ROPSTEN: {
    coinSymbol: "ETH",
    coinName: "Ethereum Testnet",
    testnet: true,
    derivePath: "m/44'/60'/0'/0/0",
    gasPrice: 10000000000,
    gasLimit: 21000,
    chainID: 3,
    apiUrl: "https://api.myetherwallet.com/rop"
  },
  USDT: {
    coinSymbol: 'USDT',
    coinName: 'Tether MainNet',
    testnet: false,
    derivePath: 'm/44\'/1\'/0\'/0',
    maxFee: 1000000,
    defaultFee: 1000,
    insight: 'https://test-insight.bitpay.com/api/',
    bitcoinjsNetwork: {
      messagePrefix: '\x18Tether Signed Message:\n',
      bech32: 'bc',
      bip32: {
        public: 0x0488b21e,
        private: 0x0488ade4
      },
      pubKeyHash: 0x00,
      scriptHash: 0x05,
      wif: 0x80
    }
  },
  USDTTESTNET: {
    coinSymbol: 'USDTTESTNET',
    coinName: 'Tether Testnet',
    testnet: true,
    derivePath: 'm/44\'/1\'/0\'/0',
    maxFee: 1000000,
    defaultFee: 1000,
    insight: 'https://test-insight.bitpay.com/api/',
    bitcoinjsNetwork: {
      messagePrefix: '\x18Tether Signed Message:\n',
      bech32: 'tb',
      bip32: {
        public: 0x043587cf,
        private: 0x04358394
      },
      pubKeyHash: 0x6f,
      scriptHash: 0xc4,
      wif: 0xef
    },
  }
};
