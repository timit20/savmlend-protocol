import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join, resolve } from "path";
import { unitollerDeploy, comptrollerDeploy, unitoller__setPendingImplementation, comptroller__setLiquidationIncentive, comptroller__become, comptroller__setCloseFactor, comptroller__setPriceOracle, comptroller__setCollateralFactor,comptroller_setMarketCapGuardian,comptroller_setPauseGuardian, comptroller_setReserveInfo } from "./comptroller.module";
import { SErc20DelegateDeploy, sErc20DelegatorDeploy, sToken__setReserveFactor, sErc20Delegator_supportMarket,sErc20Delegator_addReserves,sErc20Delegator_setPendingAdmin } from "./sToken.module";
import { jumpRateModelV2Deploy, jumpRateModelV2Deploy2 } from "./interestRate.module";
import { testnetPriceOracleDeploy,priceOracle_setUnderlyingPrice} from './savmPriceOracle.module';
// import { DAITokenDeploy, USDTTokenDeploy } from "./tokens.module";
import { platformWrappedToken,nebulaBtcToken,blockPerYear} from "./config";
import { coreWrapperTokenDeploy,coreToken__setReserveFactor,coreToken__supportMarket} from "./coreToken.module";
import { BigNumber } from "ethers";
import { WNBTCTokenDeploy } from "./tokens.module";
               
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

  // unitroller
  const unitoller = await unitollerDeploy();
  // const unitoller = {
  //   address: "0x6E754B936086Be61B10E99CC28c6550B3fb7784c"
  // }

  // comptroller
  const comptroller = await comptrollerDeploy();
  // const comptroller = {
  //   address: "0xc444FC7a64Ae4cE16549bBC09f5c3E7f1A8218Fa"
  // }

  // oracle
  const testnetPriceOracle = await testnetPriceOracleDeploy(platformWrappedToken.symbol);
  // const testnetPriceOracle = {
  //   address: "0x2190A8b03A758364426c7A2FF61190BC008e7B77"
  // }

  await unitoller__setPendingImplementation(unitoller.address, comptroller.address);
  await comptroller__become(unitoller.address, comptroller.address);
  await comptroller__setCloseFactor(unitoller.address);
  await comptroller__setLiquidationIncentive(unitoller.address);
  await comptroller__setPriceOracle(unitoller.address, testnetPriceOracle.address);
  await comptroller_setMarketCapGuardian(unitoller.address,timeLock.address);
  await comptroller_setPauseGuardian(unitoller.address,timeLock.address);
  await comptroller_setReserveInfo(unitoller.address,owner);

  // jumpRateModelV2Base
  const jumpRateModelV2Base = await jumpRateModelV2Deploy(timeLock.address);
  // const jumpRateModelV2Base = {
  //    address:"0x67d9623F08653Eb26c74599CC7830eD0e5845B84"
  // }


  //stable jumpRateModelV2Savm
  const jumpRateModelV2Savm = await jumpRateModelV2Deploy2(timeLock.address);
  // const jumpRateModelV2Savm = {
  //   address: "0x133feC06e706F6a3448b26F0a67728995e96cB1F"
  // }

  //delegate
  const sErc20Delegate = await SErc20DelegateDeploy();
  // const sErc20Delegate = {
  //   address: "0x9827bf947649e53f74aF8c212206a5A1DB6333Fc"
  // }

  //tbo chain token deploy
  const sNibi = await coreWrapperTokenDeploy(
    unitoller.address,
    jumpRateModelV2Base.address,
    timeLock.address
  );

  // const sNibi = {
    // address: "0x22dad2301d4D9EAF1643Fe5A18779d4328b54104"
  // }

  await coreToken__supportMarket(
    unitoller.address, 
    sNibi.address
  )
  await priceOracle_setUnderlyingPrice(
    signer,
    testnetPriceOracle.address, 
    sNibi.address, 
    platformWrappedToken.price
  );
  await coreToken__setReserveFactor(sNibi.address)
  await comptroller__setCollateralFactor(unitoller.address, sNibi.address,platformWrappedToken.collateralFactor)

  const wbTCToken = await WNBTCTokenDeploy()
  // const wbTCToken = {
  //   address: "0x88B6938bE8180F5DdF0308bCea611A98255390bd"
  // }

  const bBTC = await deployDelegatorToken(wbTCToken.address,unitoller.address,jumpRateModelV2Savm.address,timeLock.address,sErc20Delegate.address,
    nebulaBtcToken.name,nebulaBtcToken.symbol,timeLock.address,nebulaBtcToken.initReserves,nebulaBtcToken.reserveFactor,nebulaBtcToken.initialExchangeRateMantissa)
  console.log("bBTC address is %s",bBTC.address)
    // const bBTC = {
    //   "address":"0xA46486E3b1ef3190A419a23A92357cbEd0235bBA"
    // }
   await priceOracle_setUnderlyingPrice(signer,testnetPriceOracle.address, bBTC.address, nebulaBtcToken.price);
   await comptroller__setCollateralFactor(unitoller.address, bBTC.address,nebulaBtcToken.collateralFactor);

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
    wbTCToken: wbTCToken.address,
    timeLock: timeLock.address,
    // savmLens: savmLens.address,
    // maxMillon: maxMillon.address,
    unitoller: unitoller.address,
    comptroller: comptroller.address,
    priceOracle: testnetPriceOracle.address,
    // whitePaperInterestRateModel:whitePaperInterestRateModel.address,
    jumpRateModelBase: jumpRateModelV2Base.address,
    jumpRateModelSavm: jumpRateModelV2Savm.address,
    sErc20Delegate: sErc20Delegate.address,
    sNibi: sNibi.address,
    bBTC: bBTC.address,

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