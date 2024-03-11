import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join, resolve } from "path";
import { sEtherDeploy, sEther__setReserveFactor, sEther__supportMarket } from "./sEther.module";
import { strkTokenDeploy, setCompAddress } from "./strk.module";
import { unitollerDeploy, comptrollerDeploy, unitoller__setPendingImplementation, comptroller__setLiquidationIncentive, comptroller__become, comptroller__setCloseFactor, comptroller__setPriceOracle, comptroller__setCollateralFactor,comptroller_setMarketCapGuardian,comptroller_setPauseGuardian, comptroller_setReserveInfo } from "./comptroller.module";
import { erc20TokenDeploy, SErc20DelegateDeploy, sErc20DelegatorDeploy, cToken__setReserveFactor, cErc20Delegator_supportMarket,cERC20TokenDepoloy,cErc20Delegator_addReserves,cErc20Delegator_setPendingAdmin } from "./cToken.module";
import { jumpRateModelV2Deploy, WhitePaperInterestRateModelDeploy } from "./interestRate.module";
import { simplePriceOracleDeploy, simplePriceOracle_setUnderlyingPrice } from "./priceOracle.module";
import { timeLockDeploy} from "./timelock.module"
import { strikeLensDeploy } from "./strikeLens-module";
import { maximillionDeploy } from "./maximillon.module";
// import { DAITokenDeploy, USDTTokenDeploy } from "./tokens.module";
import { BigNumber } from "ethers";


async function main() {
    const sTokens = [];
    const unitroller = {
        address: "0x015FCe07115239213Aa6715e435Ce16FDE78380F"
    }
    
    await comptroller__setPriceOracle(unitroller.address,'0xE52934ab2268400Db198Af7139542ac6B8abC511');

    // await comptroller__setCollateralFactor(unitroller.address, "0xe6Aa887036356fbad54dE1B268e01d31FBDB5867","0.5")
    // await comptroller__setCollateralFactor(unitroller.address, "0x3102201Bff17001A2ec1a47CBbe3D74Ad83A810c","0.5")
    // await comptroller__setCollateralFactor(unitroller.address, "0x2EDdCbE0514Ff9a43ea0C34CB6c319705a490354","0.75")
    // await comptroller__setCollateralFactor(unitroller.address, "0x114e7770eF91182cb7Fb10c2C6aFca6Ed38032f4","0.75")


}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });