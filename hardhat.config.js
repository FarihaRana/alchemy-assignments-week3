require('@nomicfoundation/hardhat-toolbox');
// require("@nomiclabs/hardhat-ethers");
require("dotenv").config()
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli,
  },
  paths: {
    artifacts: "./app/src/artifacts",
  }
};
