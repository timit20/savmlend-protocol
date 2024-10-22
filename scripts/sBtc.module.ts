import { ethers } from "hardhat";
import { platformWrappedToken} from "./config";

const sDelegatorName = "SErc20Delegator";
const comptrollerName = "contracts/Comptroller.sol:Comptroller";
const STboName = "STbo";

export const sTboDeploy = async (
    unitrollerAddress: string,
    etherJumpRateModelV2Address: string,
    owner: string
) => {
    const STbo = await ethers.getContractFactory(STboName);
    const sTbo = await STbo.deploy(
        unitrollerAddress,
        etherJumpRateModelV2Address,
        platformWrappedToken.initialExchangeRateMantissa, 
        platformWrappedToken.name,
        platformWrappedToken.symbol,
        platformWrappedToken.decimals,
        owner
    );
    await sTbo.deployed();
    // await contractAbi(sEther.address, sBtcName);
    console.log("sTbo address is %s",sTbo.address);
    return sTbo
}

// 设置保证金系数   0.1 * 10 ^ 18
export const sBtc__setReserveFactor = async(sBtcAddress:string)=>{
    const cEther = await ethers.getContractAt(sDelegatorName,sBtcAddress);
    await cEther._setReserveFactor(platformWrappedToken.reserveFactor);
    console.log("sEther__setReserveFactor call success !!");
}

// 添加到市场
export const sBtc__supportMarket = async (comptrollerG7Address:string, sEtherAddress:string) => {
    const sToken = await ethers.getContractAt(comptrollerName,comptrollerG7Address);
    await sToken._supportMarket(sEtherAddress);  //  把该ETH加入到市场中
    console.log("sEther__supportMarket call success !!")
}


// sBto添加到市场
export const sTbo__supportMarket = async (comptrollerG7Address:string, sEtherAddress:string) => {
    const sToken = await ethers.getContractAt(comptrollerName,comptrollerG7Address);
    await sToken._supportMarket(sEtherAddress);  //  把该ETH加入到市场中
    console.log("sTbo__supportMarket call success !!")
}

// 设置保证金系数   0.1 * 10 ^ 18
export const sTbo__setReserveFactor = async(sTboAddress:string)=>{
    const cEther = await ethers.getContractAt(sDelegatorName,sTboAddress);
    await cEther._setReserveFactor(platformWrappedToken.reserveFactor);
    console.log("sTbo__setReserveFactor call success !!");
}