import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join, resolve } from "path";
// import { sEtherDeploy, sEther__setReserveFactor, sEther__supportMarket } from "./sEther.module";
import { sBtcDeploy, sBtc__setReserveFactor, sBtc__supportMarket } from "./sBtc.module";
// import { strkTokenDeploy, setCompAddress } from "./strk.module";
import { unitollerDeploy, comptrollerDeploy, unitoller__setPendingImplementation, comptroller__setLiquidationIncentive, comptroller__become, comptroller__setCloseFactor, comptroller__setPriceOracle, comptroller__setCollateralFactor, comptroller_setSavmlendSpeeds,comptroller_setMarketCapGuardian,comptroller_setPauseGuardian, comptroller_setReserveInfo } from "./comptroller.module";
import { erc20TokenDeploy, SErc20DelegateDeploy, sErc20DelegatorDeploy, cToken__setReserveFactor, cErc20Delegator_supportMarket,cERC20TokenDepoloy,cErc20Delegator_addReserves,cErc20Delegator_setPendingAdmin } from "./cToken.module";
import { jumpRateModelV2Deploy, jumpRateModelV2Deploy2, WhitePaperInterestRateModelDeploy } from "./interestRate.module";
import { savmlendPriceOracleDeploy,savmlendPriceOracle_setUnderlyingPrice} from './savmPriceOracle.module';
import { timeLockDeploy} from "./timelock.module"
import { savmLensDeploy } from "./strikeLens-module";
import { maximillionDeploy } from "./maximillon.module";
// import { DAITokenDeploy, USDTTokenDeploy } from "./tokens.module";
import { baseTokenConfig,marketBtcPlatformToken,sSavmlendTokenConfig} from "./config";
import { BigNumber } from "ethers";
import { savmTokenDeploy,setCompAddress} from "./savm.module";


async function main() {

  const signer = await ethers.provider.getSigner();
  const owner = await signer.getAddress();

  // Strk token 合约
  // const savm = await savmTokenDeploy(owner);
  // const strk = {
  //   address: "0xd8a65CC6fDf7B89A4163d3ec9bB42D4c0B94695A"
  // }

  // timeLock 合约
  // const timeLock = await timeLockDeploy(owner);
  const timeLock ={
    address:owner
  }

  //compoundLens 合约
  // const savmLens = await savmLensDeploy();
  // const savmLens = {
  //   address: "0x8107508c34bC6896D6F2a7F583fF70FDEe465FF2"
  // }

  //修改comptroller里面的strkAddress地址
  // await setCompAddress(savm.address);

  // 代理合约
  // const unitoller = await unitollerDeploy();
  const unitoller = {
    address: "0x94445711a94C9A0d58614ffcAe169a50E55D55bC"
  }

  //  控制合约
  // const comptroller = await comptrollerDeploy();
  const comptroller = {
    address: "0xf9cc0aD1C72E3AE379F7aBE4f489F7a18A9bf69d"
  }

  // 预言机
  // const savmPriceOracle = await savmlendPriceOracleDeploy();
  const savmPriceOracle = {
    address: "0x9786C3Eb8C70069a585e6d8bCC5a786A89ef4850"
  }

  /**
   * 设置完成后对外提供 Comptroller 合约地址时，提供的是 Unitroller 合约地址。
   * 因为Comptroller 交给 Unitroller 代理了，所以对外需要提供 Unitroller 。
   * tips: unitroller调用pending_implement,然后comptroller调用become方法
   */
  // 设置管理员 代理绑定 转移所有权
  // await unitoller__setPendingImplementation(unitoller.address, comptroller.address);
  // 设置g7代理合约地址 新的 Comptroller 接受所有权
  // await comptroller__become(unitoller.address, comptroller.address);
  //  清算比例
  // await comptroller__setCloseFactor(unitoller.address);
  // 设置清算激励，额度来之被清算人
  // await comptroller__setLiquidationIncentive(unitoller.address);
  // 设置预言机
  // await comptroller__setPriceOracle(unitoller.address, savmPriceOracle.address)
  // 设置Borrow上限管理员
  // await comptroller_setMarketCapGuardian(unitoller.address,timeLock.address);
  //设置关闭服务管理员
  // await comptroller_setPauseGuardian(unitoller.address,timeLock.address);
  //设置reserves地址
  // await comptroller_setReserveInfo(unitoller.address,owner);


  // 利率模型
  // 拐点型利率模型
  // const jumpRateModelV2Base = await jumpRateModelV2Deploy(timeLock.address);
  const jumpRateModelV2Base = {
    address : "0x2Fa8cF48462a824E0DB8a2312DF56AD1eaa9f573"
  }

  //链币-稳定币的拐点型
  // const jumpRateModelV2Savm = await jumpRateModelV2Deploy2(timeLock.address);
  const jumpRateModelV2Savm = {
    address : "0xe2708958b8874AfFe6cAF49fDCCbe568f0BF5A7D"
  }

  // 直线型利率模型
  // const whitePaperInterestRateModel = await WhitePaperInterestRateModelDeploy(timeLock.address);
  // const whitePaperInterestRateModel = {
    // address : "0xE52934ab2268400Db198Af7139542ac6B8abC511"
  // }

  //delegate部署
  // const cErc20Delegate = await SErc20DelegateDeploy();
  const cErc20Delegate = {
    address : "0xFff750b7Cb4F1E9abaBab9694F432E980bE52b2F"
  }

  //固定的几个token部署
  //1 链币
  // erc20Token 真实token 兑换 cerc20Token
  // const sBtc = await sBtcDeploy(
  //   unitoller.address, 
  //   jumpRateModelV2Base.address, 
  //   timeLock.address
  // );
  const sBtc = {
    address : "0x06843B0814Ed2aE1819ae1811bb8c745565aBC8c"
  }
  
  //maximillon 合约
  // const maxMillon = await maximillionDeploy(sBtc.address);
  // const maxMillon = {
    // address : "0xd1ebdfbDdA3e89C379f6c6139340C1e22Cd31C48"
  // }

  // await sBtc__supportMarket(
  //   unitoller.address, 
  //   sBtc.address
  // );
  // await savmlendPriceOracle_setUnderlyingPrice(
  //   signer,
  //   savmPriceOracle.address, 
  //   sBtc.address, 
  //   marketBtcPlatformToken.price
  // );
  // await sBtc__setReserveFactor(sBtc.address);
  // await comptroller__setCollateralFactor(unitoller.address, sBtc.address,marketBtcPlatformToken.collateralFactor)

  //2 s治理币
  // const sSavm = await deployDelegatorToken("0x77726bfbe61b6ad7463466fd521a3a4b89b0efd8",unitoller.address,jumpRateModelV2Savm.address,timeLock.address,cErc20Delegate.address,
  //   sSavmlendTokenConfig.name,sSavmlendTokenConfig.symbol,timeLock.address,sSavmlendTokenConfig.initReserves,sSavmlendTokenConfig.reserveFactor,sSavmlendTokenConfig.initialExchangeRateMantissa)
  const sSavm ={
    address: "0xcdF01364CAF84c7d77D6Ce928127235126FFeb7C"
  }
  // console.log("sSavm address is %s",sSavm.address)

  //  //设置测试预言机价格
  //  await savmlendPriceOracle_setUnderlyingPrice(signer,savmPriceOracle.address, sSavm.address, sSavmlendTokenConfig.price);
   await comptroller__setCollateralFactor(unitoller.address, sSavm.address,sSavmlendTokenConfig.collateralFactor);

  //其他币种
  // todo 等稳定币好了之后再打开
  // const tokenAddresses = [],cTokenNames = [],cTokenAddresses =[],blockNumbers =[]
  // for(var token in baseTokenConfig){
  //   const config = baseTokenConfig[token]; 

  //   cTokenNames.push(config.address);
  //   tokenAddresses.push(config.address);
 
  //   if(config.isDelegateToken){
  //     const delegatorToken = await deployDelegatorToken(config.address,unitoller.address,whitePaperInterestRateModel.address,timeLock.address,cErc20Delegate.address,
  //       config.name,config.symbol,timeLock.address,config.initReserves,config.reserveFactor,config.initialExchangeRateMantissa)
  //       console.log("sToken deploy is %s,address is %s"+config.name,delegatorToken.address)
  //       sTokens.push(delegatorToken.address),sSupplySpeeds.push(config.supplySpeeds),sBorrowSpeeds.push(config.borrowSpeeds),blockNumbers.push(delegatorToken.provider.getBlockNumber);
  //     cTokenAddresses.push(delegatorToken.address)
  //     await savmlendPriceOracle_setUnderlyingPrice(signer,savmPriceOracle.address, delegatorToken.address, config.price);
  //     await comptroller__setCollateralFactor(unitoller.address, delegatorToken.address,config.collateralFactor)
  //   }
    
  // }

  //所有token初始化后开始设置comp速率(todo 打开)
  // await comptroller_setSavmlendSpeeds(unitoller.address,sTokens,sSupplySpeeds,sBorrowSpeeds)
  //设置borrow上限
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
    cErc20Delegate: cErc20Delegate.address,
    sBtc: sBtc.address,
    sSavm: sSavm.address,

    // tokenAddresses: tokenAddresses,
    // cTokenAddresses: cTokenAddresses,
    

    // strk_block: savm.provider.getBlockNumber,
    // timeLock_block: timeLock.provider.getBlockNumbe,
    // savmLens_block: savmLens.provider.getBlockNumber,
    // maxMillon_block: maxMillon.provider.getBlockNumber,
    // unitoller_block: unitoller.provider.getBlockNumber,
    // comptroller_block: comptroller.provider.getBlockNumber,
    // simplePriceOracle_block: savmPriceOracle.provider.getBlockNumber,
    // whitePaperInterestRateModel_block:whitePaperInterestRateModel.provider.getBlockNumber,
    // jumpRateModelV2_block: jumpRateModelV2.provider.getBlockNumber,
    // cErc20Delegate_block: cErc20Delegate.provider.getBlockNumber,
    // sEther_block: sBtc.provider.getBlockNumber
    // cTokenAddresses_block: blockNumbers
  }

  const infoPath = resolve(join(__dirname, "../abi/address.json"));
  await writeFileSync(infoPath, JSON.stringify(info));
  console.log(info);

}

async function deployDelegatorToken(tokenAddress:string,unitoller:string,rateModelAddress:string,ownerAddress:string,delegateAddress:string,
              tokenName:string,tokenSymbol:string,timeLockAddress:string,reservesAmount:string,reserveFactor:BigNumber,exchangeRateMantissa:BigNumber){
  console.log("tokenAddress is %s,comptorllerAddress is %s,rateModelAddress is %s ,ownerAddress is %s,delegate is %s, tokenName is %s,tokenSymbol is %s,reservesAmount is %s,timeLockAddress is %s,reserveFactor is %s"
  ,tokenAddress,unitoller,rateModelAddress,ownerAddress,delegateAddress,tokenName,tokenSymbol,reservesAmount,timeLockAddress,reserveFactor)
  
  //2 治理币Comp
  const cErc20Delegator = await sErc20DelegatorDeploy(
    tokenAddress, 
    unitoller, 
    rateModelAddress,
    exchangeRateMantissa,
    ownerAddress, 
    delegateAddress,
    tokenName,
    tokenSymbol
  )

  // 加入市场
  await cErc20Delegator_supportMarket(
    unitoller, 
    cErc20Delegator.address
  );

  //设置储备金系数，默认先给个0.5吧
  await cToken__setReserveFactor(cErc20Delegator.address,reserveFactor);
  
  //转账当储备金
  await cErc20Delegator_addReserves(cErc20Delegator.address,reservesAmount);

  //设置管理员
  await cErc20Delegator_setPendingAdmin(cErc20Delegator.address,timeLockAddress);

  return cErc20Delegator;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});