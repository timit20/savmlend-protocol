import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join, resolve } from "path";
import { maximillionDeploy } from "./maximillon.module";

async function main() {
    const cTokenAddress = "0xf89D5Aa715d95C31A75f80e260441FfAcdd3e7D4";
    const maximillionContract = await maximillionDeploy(cTokenAddress);
    console.log("maximillionContract is %s",maximillionContract.address)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});