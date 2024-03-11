import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { savmlendPriceOracleDeploy,savmlendPriceOracle_setUnderlyingPrice } from "./savmPriceOracle.module"
import { multiCallDeploy } from './other_module'


async function main() {
    // const priceOracle = await savmlendPriceOracleDeploy();
    const multiCall = await multiCallDeploy();
    console.log("multiCallAddress is %s",multiCall.address);
    // const signer = await ethers.provider.getSigner();
    // await savmlendPriceOracle_setUnderlyingPrice(signer,'0xd9f3D9A0Db0D089A8abC510F9a1c6198AE6A6F49', '0x3fFBb335675771B43776B7315834E475B1E6b902', parseEther("6.070193026688089447"));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });