import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";
import { marketBtcPlatformToken } from "./config";


const SBtcName = "SBtc";
const sDelegatorName = "SErc20Delegator";
const comptrollerName = "contracts/Comptroller.sol:Comptroller";


export const sBtcDeploy = async (
    unitrollerAddress: string,
    etherJumpRateModelV2Address: string,
    owner: string
) => {
    const SBtc = await ethers.getContractFactory(SBtcName);
    const sBtc = await SBtc.deploy(
        unitrollerAddress,
        etherJumpRateModelV2Address,
        marketBtcPlatformToken.initialExchangeRateMantissa, 
        marketBtcPlatformToken.name,  
        marketBtcPlatformToken.symbol,
        marketBtcPlatformToken.decimals,
        owner
    );
    await sBtc.deployed();
    // await contractAbi(sEther.address, sBtcName);
    console.log("sBtc address is %s",sBtc.address);
    return sBtc
}


// 设置保证金系数   0.1 * 10 ^ 18
export const sBtc__setReserveFactor = async(sBtcAddress:string)=>{
    const cEther = await ethers.getContractAt(sDelegatorName,sBtcAddress);
    await cEther._setReserveFactor(marketBtcPlatformToken.reserveFactor);
    console.log("sEther__setReserveFactor call success !!");
}

// 添加到市场
export const sBtc__supportMarket = async (comptrollerG7Address:string, sEtherAddress:string) => {
    const sToken = await ethers.getContractAt(comptrollerName,comptrollerG7Address);
    await sToken._supportMarket(sEtherAddress);  //  把该ETH加入到市场中
    console.log("sEther__supportMarket call success !!")
}