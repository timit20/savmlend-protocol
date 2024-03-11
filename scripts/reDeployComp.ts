import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { join, resolve } from "path";
import { cEtherDeploy, cEther__setReserveFactor, cEther__supportMarket } from "./sEther.module";
import { compTokenDeploy, setCompAddress } from "./strk.module";
import { unitollerDeploy, comptrollerDeploy, unitoller__setPendingImplementation, ccomptroller__setLiquidationIncentive, comptroller__become, comptroller__setCloseFactor, comptroller__setPriceOracle, comptroller__setCollateralFactor, comptroller_setCompAddress } from "./comptroller.module";
import { erc20TokenDeploy, CErc20DelegateDeploy, cErc20DelegatorDeploy, cToken__setReserveFactor, cErc20Delegator_supportMarket,cERC20TokenDepoloy } from "./cToken.module";
import { jumpRateModelV2Deploy, WhitePaperInterestRateModelDeploy } from "./interestRate.module";
import { simplePriceOracleDeploy, simplePriceOracle_setUnderlyingPrice } from "./priceOracle.module";
// import { DAITokenDeploy, USDTTokenDeploy } from "./tokens.module";
import { baseTokenConfig} from "./config";


async function main() {
  const signer = await ethers.provider.getSigner();
  const owner = await signer.getAddress();

  // Comp token 合约
  const comp = await compTokenDeploy();
  console.log("comp address is %s",comp.address)

  //set comp token address 
  await setCompAddress(comp.address);

  const comptroller = {
    address:"0x2F04F3c8338916665FE74eb96A7744346604eb70"
  }
  // 设置奖励comp token地址
  await comptroller_setCompAddress(comptroller.address, comp.address);

  //2 治理币
  const whitePaperInterestRateModel = {
    address:"0xc444FC7a64Ae4cE16549bBC09f5c3E7f1A8218Fa"
  }
  const cErc20Delegate = {
    address:"0x2190A8b03A758364426c7A2FF61190BC008e7B77"
  }
  const cComp = await deployDelegatorToken(comp.address,comptroller.address,whitePaperInterestRateModel.address,owner,cErc20Delegate.address,
    "Compound Collateral ","cCOMP")
  console.log("cComp address is %s",cComp.address)
  // const cComp = {
  //   addres:"0xf372bab90C84320143b8AA2f4c7518fE60667100"
  // }
   //设置测试预言机价格
    const simplePriceOracle = {
        address : "0x015FCe07115239213Aa6715e435Ce16FDE78380F"
    }

   await simplePriceOracle_setUnderlyingPrice(signer,simplePriceOracle.address, cComp.address, parseEther("1"));
   await comptroller__setCollateralFactor(comptroller.address, cComp.address,"0.5");
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