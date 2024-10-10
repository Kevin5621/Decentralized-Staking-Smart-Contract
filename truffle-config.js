module.exports = {
    networks: {
      development: {
        host: "127.0.0.1",
        port: 8545,
        network_id: "*"
      },
      rinkeby: {
        provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraProjectId}`),
        network_id: 4,
        gas: 5500000
      }
    },
    compilers: {
      solc: {
        version: "0.8.0"
      }
    }
  };
  