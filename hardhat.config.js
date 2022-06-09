require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const GOERLI_PRIVATE_KEY = "0x1bf3249ceea6140e9b7825680f485ccd9687cab1b9d81c76ad3106d31c9a4b9d";
module.exports = {
  solidity: {
    compilers: [
      {
        version: '0.4.25',
      },
      {
        version: '0.5.16',
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks:{
    kovan: {
      url: "https://kovan.infura.io/v3/969ec7add1f846b39fe907bccb56b721",
      accounts: [`${GOERLI_PRIVATE_KEY}`],
    },
  },
  etherscan:{
    apiKey: "QRY1R5ZGTSNX8SFQA3UBEQ715X16JKF11T",
  }
};
