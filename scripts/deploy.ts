// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { writeFileSync } from "fs";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const PriceConsumer = await ethers.getContractFactory("PriceConsumer");
  const priceConsumer = await PriceConsumer.deploy();

  await priceConsumer.deployed();

  const data = {
    address: priceConsumer.address,
    abi: JSON.parse(priceConsumer.interface.format("json") as string),
  };

  console.log("priceConsumer deployed to:", priceConsumer.address);

  writeFileSync("./abi/PriceConsumer.json", data);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
