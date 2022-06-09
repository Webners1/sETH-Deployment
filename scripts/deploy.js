// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { isAddress } = require("ethers/lib/utils");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  let[deployer] = await ethers.getSigners();
  let MultiCollateralSynth = await hre.ethers.getContractFactory("MultiCollateralSynth");
  let ProxyERC20 = await hre.ethers.getContractFactory("ProxyERC20");
  let TokenState = await hre.ethers.getContractFactory("TokenStateETH");
  console.log("Greeter deployed to:", deployer.address);

  
  ProxyERC20 = await ProxyERC20.deploy(deployer.address);
  TokenState = await TokenState.deploy(deployer.address, "0x0000000000000000000000000000000000000000");
  await TokenState.deployed();
  console.log("tokenstate deployed to:", TokenState.address);

  MultiCollateralSynth = await MultiCollateralSynth.deploy(ProxyERC20.address, TokenState.address, "Synth sETH", "sETH", deployer.address, "0x7345544800000000000000000000000000000000000000000000000000000000", "2250078635304720778947", "0x84f87E3636Aa9cC1080c07E6C61aDfDCc23c0db6");
  await MultiCollateralSynth.deployed();
  console.log("multicolaletal deployed to:", MultiCollateralSynth.address);

  await TokenState.setAssociatedContract(MultiCollateralSynth.address,{from: deployer.address});
   
  let associateAddress = await TokenState.associatedContract()
  console.log("associtate deployed to:", associateAddress);
  let tokenState = await MultiCollateralSynth.tokenState();
  console.log("tokenState deployed to:", tokenState);

  await MultiCollateralSynth.issue(deployer.address, "10000000000000000", {from: deployer.address});
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
