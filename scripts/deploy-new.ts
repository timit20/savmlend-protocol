import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join, resolve } from "path";
import { sTboDeploy, sTbo__setReserveFactor,sTbo__supportMarket } from "./sBtc.module";
import { unitollerDeploy, comptrollerDeploy, unitoller__setPendingImplementation, comptroller__setLiquidationIncentive, comptroller__become, comptroller__setCloseFactor, comptroller__setPriceOracle, comptroller__setCollateralFactor,comptroller_setMarketCapGuardian,comptroller_setPauseGuardian, comptroller_setReserveInfo } from "./comptroller.module";
import { SErc20DelegateDeploy, sErc20DelegatorDeploy, sToken__setReserveFactor, sErc20Delegator_supportMarket,sErc20Delegator_addReserves,sErc20Delegator_setPendingAdmin } from "./sToken.module";
import { jumpRateModelV2Deploy, jumpRateModelV2Deploy2 } from "./interestRate.module";
import { savmlendPriceOracleDeploy,savmlendPriceOracle_setUnderlyingPrice} from './savmPriceOracle.module';
import { savmLensDeploy } from "./savmlend-lens-module";
// import { DAITokenDeploy, USDTTokenDeploy } from "./tokens.module";
import { marketBtcPlatformToken,tboToken} from "./config";
import { WBBTCTokenDepoly } from "./tokens.module"
import { BigNumber } from "ethers";

async function main() {
    const signer = await ethers.provider.getSigner();
    const owner = await signer.getAddress();

    const unitoller = {
        address:"0x361a1E859B356c7E9882b44D2219A4457ce5B7F2"
    }
    const jumpRateModelV2Base = {
        address:"0x8a727C93bcF86F00d8B7d3CF779B4ac8857aB352"
    }
    const savmPriceOracle ={
        address:"0x7a4a3E2070dE81Ca7cBd06027f87b60ce1f0D338"
    }
    const timeLock = {
        address:owner
    }

    // const sTbo = await sTboDeploy(
    //     unitoller.address,
    //     jumpRateModelV2Base.address,
    //     timeLock.address
    // );
    const sTbo = {
      address:"0xa9f623c04A5BB6E1c1e2a0dE0EfCF4aEB68692B2"
    }

    await sTbo__supportMarket(
      unitoller.address, 
      sTbo.address
    )
    await savmlendPriceOracle_setUnderlyingPrice(
      signer,
      savmPriceOracle.address, 
      sTbo.address, 
      tboToken.price
    );
    await sTbo__setReserveFactor(sTbo.address)
    await comptroller__setCollateralFactor(unitoller.address, sTbo.address,tboToken.collateralFactor)
  
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });