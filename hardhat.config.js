// More current than hardhat-waffle
require("dotenv").config();
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");


const INFURA_API_KEY = process.env.INFURA_API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!INFURA_API_KEY || !PRIVATE_KEY) {
  throw new Error("Please set INFURA_API_KEY and PRIVATE_KEY in your .env file");
}

module.exports = {
  solidity: "0.8.9",
  networks: {
    goerli: {
      url: `https://goerli.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
      gasMultiplier: 1.5 // Add a gas multiplier for testnet
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [PRIVATE_KEY],
      gasMultiplier: 1.2,
      gas: 3000000,           // Giảm gas limit
      gasPrice: 10000000000,  // 10 Gwei
      timeout: 60000          // 60 seconds
    },
    hardhat: {
      chainId: 1337,
    },
    gensyn: {
      url: "https://gensyn-testnet.g.alchemy.com/public",
      accounts: [PRIVATE_KEY],
      chainId: 42069,
      gasMultiplier: 1.2,
      gas: 3000000,
      gasPrice: 10000000000,  // 10 Gwei
      timeout: 60000
    },
  },
  paths: {
    artifacts: "./frontend/src/artifacts",
  },
};