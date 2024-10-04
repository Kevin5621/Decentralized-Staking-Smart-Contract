rinkeby: {
   provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/YOUR_INFURA_PROJECT_ID`),
   network_id: 4;       // Rinkeby's network id
   gas: 5500000;        // Gas limit
},
