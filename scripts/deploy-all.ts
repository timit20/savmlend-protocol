import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join, resolve } from "path";
import { sBtcDeploy, sBtc__setReserveFactor, sBtc__supportMarket } from "./sBtc.module";
import { unitollerDeploy, comptrollerDeploy, unitoller__setPendingImplementation, comptroller__setLiquidationIncentive, comptroller__become, comptroller__setCloseFactor, comptroller__setPriceOracle, comptroller__setCollateralFactor,comptroller_setMarketCapGuardian,comptroller_setPauseGuardian, comptroller_setReserveInfo } from "./comptroller.module";
import { SErc20DelegateDeploy, sErc20DelegatorDeploy, sToken__setReserveFactor, sErc20Delegator_supportMarket,sErc20Delegator_addReserves,sErc20Delegator_setPendingAdmin } from "./sToken.module";
import { jumpRateModelV2Deploy, jumpRateModelV2Deploy2, WhitePaperInterestRateModelDeploy } from "./interestRate.module";
import { savmlendPriceOracleDeploy,savmlendPriceOracle_setUnderlyingPrice} from './savmPriceOracle.module';
import { savmLensDeploy } from "./savmlend-lens-module";
// import { DAITokenDeploy, USDTTokenDeploy } from "./tokens.module";
import { marketBtcPlatformToken,sSavmlendTokenConfig} from "./config";
import { BigNumber } from "ethers";


async function main() {

  const signer = await ethers.provider.getSigner();
  const owner = await signer.getAddress();

  // Savm token 合约
  // const savm = await savmTokenDeploy(owner);

  // timeLock 
  // const timeLock = await timeLockDeploy(owner);
  const timeLock ={
    address:owner
  }

  //savmlendLens 
  // const savmLens = await savmLensDeploy();

  // unitroller
  const unitoller = await unitollerDeploy();

  // comptroller
  const comptroller = await comptrollerDeploy();

  // oracle
  const savmPriceOracle = await savmlendPriceOracleDeploy();

  await unitoller__setPendingImplementation(unitoller.address, comptroller.address);
  await comptroller__become(unitoller.address, comptroller.address);
  await comptroller__setCloseFactor(unitoller.address);
  await comptroller__setLiquidationIncentive(unitoller.address);
  await comptroller__setPriceOracle(unitoller.address, savmPriceOracle.address)
  await comptroller_setMarketCapGuardian(unitoller.address,timeLock.address);
  await comptroller_setPauseGuardian(unitoller.address,timeLock.address);
  await comptroller_setReserveInfo(unitoller.address,owner);


  // jumpRateModelV2Base
  const jumpRateModelV2Base = await jumpRateModelV2Deploy(timeLock.address);


  //stable jumpRateModelV2Savm
  const jumpRateModelV2Savm = await jumpRateModelV2Deploy2(timeLock.address);

  //delegate
  const sErc20Delegate = await SErc20DelegateDeploy();

  // sbtc -chainTokon
  const sBtc = await sBtcDeploy(
    unitoller.address, 
    jumpRateModelV2Base.address, 
    timeLock.address
  );
  
  await sBtc__supportMarket(
    unitoller.address, 
    sBtc.address
  );
  await savmlendPriceOracle_setUnderlyingPrice(
    signer,
    savmPriceOracle.address, 
    sBtc.address, 
    marketBtcPlatformToken.price
  );
  await sBtc__setReserveFactor(sBtc.address);
  await comptroller__setCollateralFactor(unitoller.address, sBtc.address,marketBtcPlatformToken.collateralFactor)


  const sSavm = await deployDelegatorToken("0x77726bfbe61b6ad7463466fd521a3a4b89b0efd8",unitoller.address,jumpRateModelV2Savm.address,timeLock.address,sErc20Delegate.address,
    sSavmlendTokenConfig.name,sSavmlendTokenConfig.symbol,timeLock.address,sSavmlendTokenConfig.initReserves,sSavmlendTokenConfig.reserveFactor,sSavmlendTokenConfig.initialExchangeRateMantissa)
  console.log("sSavm address is %s",sSavm.address)

   await savmlendPriceOracle_setUnderlyingPrice(signer,savmPriceOracle.address, sSavm.address, sSavmlendTokenConfig.price);
   await comptroller__setCollateralFactor(unitoller.address, sSavm.address,sSavmlendTokenConfig.collateralFactor);

  //other token
  // todo 
  // const tokenAddresses = [],cTokenNames = [],cTokenAddresses =[],blockNumbers =[]
  // for(var token in baseTokenConfig){
  //   const config = baseTokenConfig[token]; 

  //   cTokenNames.push(config.address);
  //   tokenAddresses.push(config.address);
 
  //   if(config.isDelegateToken){
  //     const delegatorToken = await deployDelegatorToken(config.address,unitoller.address,whitePaperInterestRateModel.address,timeLock.address,sErc20Delegate.address,
  //       config.name,config.symbol,timeLock.address,config.initReserves,config.reserveFactor,config.initialExchangeRateMantissa)
  //       console.log("sToken deploy is %s,address is %s"+config.name,delegatorToken.address)
  //       sTokens.push(delegatorToken.address),sSupplySpeeds.push(config.supplySpeeds),sBorrowSpeeds.push(config.borrowSpeeds),blockNumbers.push(delegatorToken.provider.getBlockNumber);
  //     cTokenAddresses.push(delegatorToken.address)
  //     await savmlendPriceOracle_setUnderlyingPrice(signer,savmPriceOracle.address, delegatorToken.address, config.price);
  //     await comptroller__setCollateralFactor(unitoller.address, delegatorToken.address,config.collateralFactor)
  //   }
    
  // }

  //
  // await comptroller_setSavmlendSpeeds(unitoller.address,sTokens,sSupplySpeeds,sBorrowSpeeds)
  //
  // await comptroller_setMarketBorrowCaps(unitoller.address,cTokenAddresses);
  

  const info = {
    // savm: savm.address,
    savm: "0x77726bfbe61b6ad7463466fd521a3a4b89b0efd8",
    timeLock: timeLock.address,
    // savmLens: savmLens.address,
    // maxMillon: maxMillon.address,
    unitoller: unitoller.address,
    comptroller: comptroller.address,
    savmPriceOracle: savmPriceOracle.address,
    // whitePaperInterestRateModel:whitePaperInterestRateModel.address,
    jumpRateModelBase: jumpRateModelV2Base.address,
    jumpRateModelSavm: jumpRateModelV2Savm.address,
    sErc20Delegate: sErc20Delegate.address,
    sBtc: sBtc.address,
    sSavm: sSavm.address,

    // tokenAddresses: tokenAddresses,
    // cTokenAddresses: cTokenAddresses,
    
  }

  const infoPath = resolve(join(__dirname, "../abi/address.json"));
  await writeFileSync(infoPath, JSON.stringify(info));
  console.log(info);

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

  // 
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