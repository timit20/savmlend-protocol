import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join, resolve } from "path";
import { DAITokenDeploy, USDTTokenDeploy } from "./tokens.module";



async function main() {
    const daiToken = await DAITokenDeploy();
    const usdtToken = await USDTTokenDeploy();
}





main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});