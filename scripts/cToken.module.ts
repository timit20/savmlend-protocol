import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat"
import { contractAbi } from "../utils/contractInfo";
import { string } from "hardhat/internal/core/params/argumentTypes";
import { BigNumber } from "ethers";

const erc20TokenName = "ERC20Token"
const SErc20DelegateName = "SErc20Delegate";
const SErc20DelegatorName = "SErc20Delegator";
const Cerc20TokenName = "CErc20V1";
const comptrollerName = "contracts/Comptroller.sol:Comptroller";
// 用于测试的token
export const erc20TokenDeploy = async () => {
    const ERC20Token = await ethers.getContractFactory(erc20TokenName);
    const erc20Token = await ERC20Token.deploy();
    await erc20Token.deployed();
    await contractAbi(erc20Token.address, erc20TokenName);
    return erc20Token;
}

export const cERC20TokenDepoloy = async(erc20Address:string,
    comptrollerAddress:string,
    jumpRateModelV2Address:string,
    exchangeRate:string,
    name:string,
    symbol:string) =>{
    console.log("address is %s,comptroller address is %s,rateModel is %s,exchangeRate is %s",erc20Address,comptrollerAddress,jumpRateModelV2Address,exchangeRate)
    const CErc20Token = await ethers.getContractFactory(Cerc20TokenName);
        const erc20Token = await CErc20Token.deploy(
        erc20Address,
        comptrollerAddress,
        jumpRateModelV2Address,
        parseEther(exchangeRate),
        name,
        symbol,
        18,
        {"gasLimit":30000}
    );
    await erc20Token.deployed();
    console.log("deploy success");
    await contractAbi(erc20Token.address, erc20TokenName);
    return erc20Token;
}

// 用于支持代理CToken使用，不支持代理的CToken不需要此合约
// 所有 ERC20 基础资产的 CToken 采用委托代理模式
export const SErc20DelegateDeploy = async () => {
    const SErc20Delegate = await ethers.getContractFactory(SErc20DelegateName);
    const sErc20Delegate = await SErc20Delegate.deploy(
        {gasLimit:10000000});
    await sErc20Delegate.deployed();
    await contractAbi(sErc20Delegate.address, SErc20DelegateName);
    console.log("sErc20Delegate address is %s",sErc20Delegate.address);
    return sErc20Delegate;
}

/**
 * 部署cToken
 * @param erc20Address 
 * @param comptrollerAddress 
 * @param jumpRateModelV2Address 
 * @param owner 
 * @param sErc20DelegateAddress 
 * @param name 
 * @param symbol 
 * @returns 
 */
export const sErc20DelegatorDeploy =async (
    erc20Address:string,
    comptrollerAddress:string,
    jumpRateModelV2Address:string,
    exchangeRateMantissa:BigNumber,
    owner:string,
    sErc20DelegateAddress:string,
    name:string,
    symbol:string
) => {
    const SErc20Delegator = await ethers.getContractFactory(SErc20DelegatorName);
    const sErc20Delegator = await SErc20Delegator.deploy(
        erc20Address,  //  erc20 token address
        comptrollerAddress, //  comptroller address
        jumpRateModelV2Address, //  jumpRateModelV2 address
        parseEther("0.1"),  // 1个token 可以还  1 / 0.1(10)个cToken
        name, //  name
        symbol,     //  symbol
        "18",       //  decimals
        owner,      // msg.sender
        sErc20DelegateAddress,  //  cErc20Delegate address  
        "0x"   //  额外初始数据，此处填入0x，即无数据
    );
    // initialExchangeRateMantissa_ = 1 * 10 ^ (18 + underlyingDecimals - cTokenDecimals)
    await sErc20Delegator.deployed();
    await contractAbi(sErc20Delegator.address, SErc20DelegatorName);
    return sErc20Delegator;
}


// 设置保证金系数   0.1 * 10 ^ 18
export const cToken__setReserveFactor = async(CErc20DelegatorAddress:string,reserveFactor:BigNumber)=>{
    const cToken = await ethers.getContractAt("CErc20Delegator",CErc20DelegatorAddress);
    await cToken._setReserveFactor(reserveFactor);
    console.log("cToken__setReserveFactor call success !!");
}


// 加入市场
// export const cToken__supportMarket = async (comptrollerAddress:string, tokenAddress:string) => {
//     const cToken = await ethers.getContractAt("Comptroller",comptrollerAddress);
//     await cToken._supportMarket(tokenAddress);  //  把该token加入到市场中
// }

/**
 * 代币加入到市场中
 * @param comptrollerAddress 
 * @param cErc20DelegatorAddress 
 */
export const cErc20Delegator_supportMarket = async (comptrollerAddress:string, address:string) => {
    const cToken = await ethers.getContractAt(comptrollerName,comptrollerAddress);
    await cToken._supportMarket(address);  //  把该token加入到市场中
    console.log("cErc20Delegator_supportMarket call success !!")
}

/**
 * 代币设置timeLock
 * @param timeLockAddress 
 * @param CErc20DelegatorAddress 
 */
export const cErc20Delegator_setPendingAdmin = async (CErc20DelegatorAddress:string,timeLockAddress:string)=>{
    const cToken = await ethers.getContractAt(SErc20DelegatorName,CErc20DelegatorAddress);
    await cToken._setPendingAdmin(timeLockAddress);
    console.log("cToken__PendingAdmin success !!");
}

/**
 * 储备金
 * @param CErc20DelegatorAddress s
 * @param amount 
 */
export const cErc20Delegator_addReserves = async(CErc20DelegatorAddress:string,amount:string) =>{
    const cToken = await ethers.getContractAt(SErc20DelegatorName,CErc20DelegatorAddress);
    await cToken._addReserves(parseEther(amount));
    console.log("cToken__addReserves success !!");
}