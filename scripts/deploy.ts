import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join, resolve } from "path";
import { cEtherDeploy, cEther__setReserveFactor, cEther__supportMarket } from "./sEther.module";
import { compTokenDeploy, setCompAddress } from "./strk.module";
import { unitollerDeploy, comptrollerDeploy, unitoller__setPendingImplementation, ccomptroller__setLiquidationIncentive, comptroller__become, comptroller__setCloseFactor, comptroller__setPriceOracle, comptroller__setCollateralFactor } from "./comptroller.module";
import { erc20TokenDeploy, CErc20DelegateDeploy, cErc20DelegatorDeploy, cToken__setReserveFactor, cErc20Delegator_supportMarket,cERC20TokenDepoloy } from "./cToken.module";
import { jumpRateModelV2Deploy, WhitePaperInterestRateModelDeploy } from "./interestRate.module";
import { simplePriceOracleDeploy, simplePriceOracle_setUnderlyingPrice } from "./priceOracle.module";
// import { DAITokenDeploy, USDTTokenDeploy } from "./tokens.module";
import { baseTokenConfig} from "./config";


async function main() {
  const signer = await ethers.provider.getSigner();
  const owner = await signer.getAddress();

  // Comp token 合约
  const comp = await compTokenDeploy(owner);
  console.log("comp address is %s",comp.address)
  // const comp = {
  //   address:"0xb54c3550E91b3F040C9C6f048769a76264B59bC7"
  // }

  //set comp token address 
  await setCompAddress(comp.address);


  // 代理合约
  const unitoller = await unitollerDeploy();
  // const unitoller = {
  //   address:"0x6760b553721b158F1d853Ba9C8B3771c35F45C83"
  // }
  console.log("unitoller address is %s",unitoller.address)


  //  控制合约
  const comptroller = await comptrollerDeploy();
  // const comptroller = {
    // address:"0x2F04F3c8338916665FE74eb96A7744346604eb70"
  // }
  console.log("comptroller address is %s",comptroller.address);

  // 设置奖励comp token地址
  await comptroller_setCompAddress(comptroller.address, comp.address);

  // 预言机
  const simplePriceOracle = await simplePriceOracleDeploy();
  // const simplePriceOracle = {
    // address:"0x015FCe07115239213Aa6715e435Ce16FDE78380F"
  // }
  console.log("simplePriceOracle address is %s",simplePriceOracle.address);

  /**
   * 设置完成后对外提供 Comptroller 合约地址时，提供的是 Unitroller 合约地址。
   * 因为Comptroller 交给 Unitroller 代理了，所以对外需要提供 Unitroller 。
   */
  // 设置管理员 代理绑定 转移所有权
  await unitoller__setPendingImplementation(unitoller.address, comptroller.address);
  // 设置g7代理合约地址 新的 Comptroller 接受所有权
  await comptroller__become(comptroller.address, unitoller.address);
  //  清算比例
  await comptroller__setCloseFactor(comptroller.address);
  // 设置清算激励，额度来之被清算人
  await ccomptroller__setLiquidationIncentive(comptroller.address);
  // 设置预言机
  await comptroller__setPriceOracle(comptroller.address, simplePriceOracle.address)

  // 利率模型
  // 拐点型利率模型
  // const jumpRateModelV2 = await jumpRateModelV2Deploy(owner);
  // console.log("jumpRateModelV2 address is %s",jumpRateModelV2.address);
  const jumpRateModelV2 = {
    address:"0x6E754B936086Be61B10E99CC28c6550B3fb7784c"
  }


  // 直线型利率模型
  // const whitePaperInterestRateModel = await WhitePaperInterestRateModelDeploy(owner);
  // console.log("whitePaperInterestRateModel address is %s",whitePaperInterestRateModel.address);
  const whitePaperInterestRateModel = {
    address:"0xc444FC7a64Ae4cE16549bBC09f5c3E7f1A8218Fa"
  }

  //delegate部署
  // const cErc20Delegate = await CErc20DelegateDeploy();
  // console.log("cErc20Delegate address is %s",cErc20Delegate.address);
  const cErc20Delegate = {
    address:"0x2190A8b03A758364426c7A2FF61190BC008e7B77"
  }


  //固定的几个token部署
  //1 链币
  // erc20Token 真实token 兑换 cerc20Token
  const cEther = await cEtherDeploy(
    comptroller.address, 
    jumpRateModelV2.address, 
    owner
  );
  console.log("cEther address is %s",cEther.address);
  // const cEther = {
    // address:"0xf89D5Aa715d95C31A75f80e260441FfAcdd3e7D4"
  // }


  await cEther__supportMarket(
    comptroller.address, 
    cEther.address
  );
  await simplePriceOracle_setUnderlyingPrice(
    signer,
    simplePriceOracle.address, 
    cEther.address, 
    parseEther("2000")
  );
  await cEther__setReserveFactor(cEther.address);

  //todo  注释掉
  // const erc20Token = await erc20TokenDeploy();  //  不在compound合约中

  // console.log("comp address is %s",comp.address);
  //2 治理币
  const cComp = await deployDelegatorToken(comp.address,comptroller.address,whitePaperInterestRateModel.address,owner,cErc20Delegate.address,
    "Compound Collateral ","cCOMP")
  console.log("cComp address is %s",cComp.address)
  // const cComp = {
  //   addres:"0xf372bab90C84320143b8AA2f4c7518fE60667100"
  // }
   //设置测试预言机价格
   await simplePriceOracle_setUnderlyingPrice(signer,simplePriceOracle.address, cComp.address, parseEther("1"));
   await comptroller__setCollateralFactor(comptroller.address, cComp.address,"0.5");

  //其他币种
  const tokenAddresses = [],cTokenNames = [],cTokenAddresses =[]
  for(var token in baseTokenConfig){
    const config = baseTokenConfig[token];

    cTokenNames.push(config.address);
    tokenAddresses.push(config.address);

    if(config.isDelegateToken){
      const delegatorToken = await deployDelegatorToken(config.address,comptroller.address,whitePaperInterestRateModel.address,owner,cErc20Delegate.address,
        config.name,config.symbol)
        console.log("cToken deploy is %s,address is %s"+config.name,delegatorToken.address)
      cTokenAddresses.push(delegatorToken.address)
      await simplePriceOracle_setUnderlyingPrice(signer,simplePriceOracle.address, delegatorToken.address, parseEther("1"));
    }else{
      // const cErc20Token = await cERC20TokenDepoloy(erc20Token.address,comptroller.address,whitePaperInterestRateModel.address,config.collateralFactor,config.name,config.symbol)
      // // 加入市场
      // await cErc20Delegator_supportMarket(
      //   comptroller.address,
      //   cErc20Token.address
      // );
      // cTokenAddresses.push(cErc20Token.address)
      // //设置测试预言机价格
      // await simplePriceOracle_setUnderlyingPrice(signer,simplePriceOracle.address, cErc20Token.address, parseEther("1"));
    }
    
    await comptroller__setCollateralFactor(comptroller.address, config.address,config.collateralFactor)
  }

  //
  // usdt => cUsdt
  
  // 该方法就是 用token 还ctoken， 只能是传入的token兑换，其他token无法兑换
  // 等于部署cUSDT
  // const cErc20Delegator = await cErc20DelegatorDeploy(
  //   erc20Token.address, 
  //   comptroller.address, 
  //   jumpRateModelV2.address, 
  //   owner, 
  //   cErc20Delegate.address,
  //   "COMP USD",
  //   "cUSDT"
  // )
  // // 加入市场
  // await cErc20Delegator_supportMarket(
  //   comptroller.address, 
  //   cErc20Delegator.address
  // );
  

  // 设置市场价格 市场价格 根据  1 * 10 ** 18 == 1USDT 计算
  // cToken 价格
  // await simplePriceOracle_setUnderlyingPrice(
  //   signer,
  //   simplePriceOracle.address, 
  //   cErc20Delegator.address, 
  //   parseEther("1")
  // );
  // // cEther 价格


  // 设置储备金系数
  // await cToken__setReserveFactor(cErc20Delegator.address);

  
  // 设置抵押率
  // await comptroller__setCollateralFactor(
  //   comptroller.address, 
  //   cErc20Delegator.address
  // );

  //链币
  
  const info = {
    comp: comp.address,
    unitoller: unitoller.address,
    comptroller: comptroller.address,
    simplePriceOracle: simplePriceOracle.address,
    whitePaperInterestRateModel:whitePaperInterestRateModel.address,
    jumpRateModelV2: jumpRateModelV2.address,
    cErc20Delegate: cErc20Delegate.address,
    cEther: cEther.address,
    tokenAddresses: tokenAddresses,
    cTokenAddresses: cTokenAddresses
  }

  const infoPath = resolve(join(__dirname, "../abi/address.json"));
  await writeFileSync(infoPath, JSON.stringify(info));
  console.log(info);

}

async function deployDelegatorToken(tokenAddress:string,comptrollerAddress:string,rateModelAddress:string,ownerAddress:string,delegateAddress:string,
              tokenName:string,tokenSymbol:string){
  //2 治理币Comp
  const cErc20Delegator = await cErc20DelegatorDeploy(
    tokenAddress, 
    comptrollerAddress, 
    rateModelAddress, 
    ownerAddress, 
    delegateAddress,
    tokenName,
    tokenSymbol
  )

  // 加入市场
  await cErc20Delegator_supportMarket(
    comptrollerAddress, 
    cErc20Delegator.address
  );

  //设置储备金系数，默认先给个0.5吧
  await cToken__setReserveFactor(cErc20Delegator.address);
  
  return cErc20Delegator;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});