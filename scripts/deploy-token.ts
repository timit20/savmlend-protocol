import { UNICORNTokenDeploy } from "./tokens.module";
import { ethers } from "hardhat";

async function main() {
    const signer = await ethers.provider.getSigner();
    const owner = await signer.getAddress();
    const unicoreToken = await UNICORNTokenDeploy();
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });