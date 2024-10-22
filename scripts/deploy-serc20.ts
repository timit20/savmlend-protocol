import { ethers } from "hardhat";
import { comptroller__setCollateralFactor } from "./comptroller.module";
import { BigNumber } from "ethers";
import { SErc20DelegateDeploy, sErc20DelegatorDeploy, sToken__setReserveFactor, sErc20Delegator_supportMarket,sErc20Delegator_addReserves,sErc20Delegator_setPendingAdmin } from "./sToken.module";
import { nebulaBtcToken} from "./config";
import { priceOracle_setUnderlyingPrice} from './savmPriceOracle.module';

async function main() {
    const signer = await ethers.provider.getSigner();
    const owner = await signer.getAddress();

    const wbTCToken = {
        address: "0x88B6938bE8180F5DdF0308bCea611A98255390bd"
    }
    const unitoller = {
        address:"0x922d354D487789969f4ECc9BC3dad286eC5A363D"
    }
    const jumpRateModelV2Savm = {
        address:"0x38785cA2C61Fff494a30b5AC5c5372aaC502d4E0"
    }
    const timeLock = {
        address: "0xb9B15FfC7A5fEFEFDadCC72170250CD34828b9B2"
    }
    // const sErc20Delegate = {
    //     address: "0xe3026461aDbF9D293973406989DcA3b254855Ad1"
    // }
    const testnetPriceOracle = {
        address: "0xe35a44b27d8965Afa5e9946859F5931D6A7Cd303"
    }

    const sErc20Delegate = await SErc20DelegateDeploy();
    console.log(`sErc20Delegate is ${sErc20Delegate.address}`)

    const bBTC = await deployDelegatorToken(wbTCToken.address,unitoller.address,jumpRateModelV2Savm.address,timeLock.address,sErc20Delegate.address,
        nebulaBtcToken.name,nebulaBtcToken.symbol,timeLock.address,nebulaBtcToken.initReserves,nebulaBtcToken.reserveFactor,nebulaBtcToken.initialExchangeRateMantissa)
      console.log("bBTC address is %s",bBTC.address)
    await priceOracle_setUnderlyingPrice(signer,testnetPriceOracle.address, bBTC.address, nebulaBtcToken.price);
    await comptroller__setCollateralFactor(unitoller.address, bBTC.address,nebulaBtcToken.collateralFactor);
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

    await sErc20Delegator_supportMarket(
        unitoller, 
        sErc20Delegator.address
      );
    
      await sToken__setReserveFactor(sErc20Delegator.address,reserveFactor);
      
      await sErc20Delegator_addReserves(sErc20Delegator.address,reservesAmount);
    
      await sErc20Delegator_setPendingAdmin(sErc20Delegator.address,timeLockAddress);
    return sErc20Delegator;
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});