import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join, resolve } from "path";
import { sEtherDeploy, sEther__setReserveFactor, sEther__supportMarket } from "./sEther.module";
import { strkTokenDeploy, setCompAddress } from "./strk.module";
import { unitollerDeploy, comptrollerDeploy, unitoller__setPendingImplementation, comptroller__setLiquidationIncentive, comptroller__become, comptroller__setCloseFactor, comptroller__setPriceOracle, comptroller__setCollateralFactor, comptroller_setStrikeSpeeds,comptroller_setMarketCapGuardian,comptroller_setPauseGuardian, comptroller_setReserveInfo } from "./comptroller.module";
import { erc20TokenDeploy, SErc20DelegateDeploy, sErc20DelegatorDeploy, cToken__setReserveFactor, cErc20Delegator_supportMarket,cERC20TokenDepoloy,cErc20Delegator_addReserves,cErc20Delegator_setPendingAdmin } from "./cToken.module";
import { jumpRateModelV2Deploy, WhitePaperInterestRateModelDeploy } from "./interestRate.module";
import { simplePriceOracleDeploy, simplePriceOracle_setUnderlyingPrice } from "./priceOracle.module";
import { timeLockDeploy} from "./timelock.module"
import { strikeLensDeploy } from "./strikeLens-module";
import { maximillionDeploy } from "./maximillon.module";
// import { DAITokenDeploy, USDTTokenDeploy } from "./tokens.module";
import { baseTokenConfig,marketPlatformToken,sStrikeTokenConfig} from "./config";
import { BigNumber } from "ethers";



async function main() {
    const unitoller = {
        address : "0xc82F47eAd20a78C00BbfF3d1074D473f9D34fED6"
    }
    const sTokens = []
    sTokens.push("0x114e7770eF91182cb7Fb10c2C6aFca6Ed38032f4");
    sTokens.push("0x6527d31dB4FC5897205F06a062A197F6c6a1ac9a");
    sTokens.push("0xe6Aa887036356fbad54dE1B268e01d31FBDB5867");
    sTokens.push("0x3102201Bff17001A2ec1a47CBbe3D74Ad83A810c");
    sTokens.push("0x2EDdCbE0514Ff9a43ea0C34CB6c319705a490354");

    const sSupplySpeeds = []
    sSupplySpeeds.push(parseEther("0.06"));
    sSupplySpeeds.push(parseEther("0.16"));
    sSupplySpeeds.push(parseEther("0.06"));
    sSupplySpeeds.push(parseEther("0.01"));
    sSupplySpeeds.push(parseEther("0.005"));

    const sBorrowSpeeds = []
    sBorrowSpeeds.push(parseEther("0.14"));
    sBorrowSpeeds.push(parseEther("0"));
    sBorrowSpeeds.push(parseEther("0.14"));
    sBorrowSpeeds.push(BigNumber.from("2333333333333330"));
    sBorrowSpeeds.push(BigNumber.from("1166666666666670"));

    await sEther__supportMarket(
        unitoller.address, 
        "0x114e7770eF91182cb7Fb10c2C6aFca6Ed38032f4"
      );

    //设置strikeSpeeds速率
    await comptroller_setStrikeSpeeds(unitoller.address,sTokens,sSupplySpeeds,sBorrowSpeeds)

}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});