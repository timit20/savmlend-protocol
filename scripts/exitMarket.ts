import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join, resolve } from "path";

import {comptroller_existMarket} from "./comptroller.module";


async function main() {
    const comptrollerAddress = "0x2F04F3c8338916665FE74eb96A7744346604eb70";
    const cTokenAddress = "0xf372bab90C84320143b8AA2f4c7518fE60667100";
    await comptroller_existMarket(comptrollerAddress,cTokenAddress);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});