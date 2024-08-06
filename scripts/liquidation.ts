import {comptroller__setLiquidationIncentive} from "./comptroller.module";
import { ethers } from "hardhat";

async function main() {
    // const signer = await ethers.provider.getSigner();
    // const owner = await signer.getAddress();
    const unitoller = {
        address: '0x361a1E859B356c7E9882b44D2219A4457ce5B7F2'
    }
    await comptroller__setLiquidationIncentive(unitoller.address);

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });