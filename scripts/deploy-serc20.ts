import { marketBtcPlatformToken } from "./config";
import { ethers } from "hardhat";
import { sErc20DelegatorDeploy } from "./sToken.module";
import { BigNumber } from "ethers";
import { SErc20DelegateDeploy } from "./sToken.module";

async function main() {
    const wbTCToken = {
        address: "0xe88942E18EcEEE177471f4F66e00c981BB752De8"
    }
    const unitoller = {
        address:"0x361a1E859B356c7E9882b44D2219A4457ce5B7F2"
    }
    const jumpRateModelV2Savm = {
        address:"0x7e9fb4695Ff999A33F7132F50CAF19C170AcECaa"
    }
    const timeLock = {
        address: "0x0aeDFC2f4fc3cDF9DA404C22B184cE161E85dD83"
    }
    // const sErc20Delegate = {
    //     address: "0xe3026461aDbF9D293973406989DcA3b254855Ad1"
    // }

    const sErc20Delegate = await SErc20DelegateDeploy();
    console.log(`sErc20Delegate is ${sErc20Delegate.address}`)

    // const bBTC = await deployDelegatorToken(wbTCToken.address,unitoller.address,jumpRateModelV2Savm.address,timeLock.address,sErc20Delegate.address,
    //     marketBtcPlatformToken.name,marketBtcPlatformToken.symbol,timeLock.address,marketBtcPlatformToken.initReserves,marketBtcPlatformToken.reserveFactor,marketBtcPlatformToken.initialExchangeRateMantissa)
    // console.log("bBTC address is %s",bBTC.address)
    // await savmlendPriceOracle_setUnderlyingPrice(signer,savmPriceOracle.address, bBTC.address, marketBtcPlatformToken.price);
    // await comptroller__setCollateralFactor(unitoller.address, bBTC.address,marketBtcPlatformToken.collateralFactor);
}

async function deployDelegatorToken(tokenAddress:string,unitoller:string,rateModelAddress:string,ownerAddress:string,delegateAddress:string,
    tokenName:string,tokenSymbol:string,timeLockAddress:string,reservesAmount:string,reserveFactor:BigNumber,exchangeRateMantissa:BigNumber){
console.log("tokenAddress is %s,comptorllerAddress is %s,rateModelAddress is %s ,ownerAddress is %s,delegate is %s, tokenName is %s,tokenSymbol is %s,reservesAmount is %s,timeLockAddress is %s,reserveFactor is %s"
,tokenAddress,unitoller,rateModelAddress,ownerAddress,delegateAddress,tokenName,tokenSymbol,reservesAmount,timeLockAddress,reserveFactor)

    //2 
    const sErc20Delegator = await sErc20DelegatorDeploy(
        tokenAddress, 
        unitoller, 
        rateModelAddress,
        exchangeRateMantissa,
        ownerAddress, 
        delegateAddress,
        tokenName,
        tokenSymbol
    )

    // await sErc20Delegator_supportMarket(
    //     unitoller, 
    //     sErc20Delegator.address
    // );

    // await sToken__setReserveFactor(sErc20Delegator.address,reserveFactor);

    // await sErc20Delegator_addReserves(sErc20Delegator.address,reservesAmount);
    // await sErc20Delegator_setPendingAdmin(sErc20Delegator.address,timeLockAddress);
    return sErc20Delegator;
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});