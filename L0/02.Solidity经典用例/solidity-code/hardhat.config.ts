import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers" ; // 使用 ethers 必须引入此包

import dotenv from 'dotenv'
dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.PK!]
    }
  }
};



export default config;
