import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";
import { marketPlatformToken } from "./config";

const SEtherName = "SEther";
const WET9NAME = "WETH9";
const comptrollerName = "contracts/Comptroller.sol:Comptroller";
const sDelegatorName = "SErc20Delegator";

// WET
// export const weth9Deploy = async() => {
//     const WETH9 = await ethers.getContractFactory(WET9NAME);
//     const weth9 = await WETH9.deploy();
//     await weth9.deployed();
//     await contractAbi(weth9.address, WET9NAME);
//     return weth9;
// }

export const sEtherDeploy = async (
    unitrollerAddress: string,
    etherJumpRateModelV2Address: string,
    owner: string
) => {
    const SEther = await ethers.getContractFactory(SEtherName);
    const sEther = await SEther.deploy(
        unitrollerAddress,
        etherJumpRateModelV2Address,
        marketPlatformToken.initialExchangeRateMantissa, 
        marketPlatformToken.name,  
        marketPlatformToken.symbol,
        marketPlatformToken.decimals,
        owner
    );
    await sEther.deployed();
    await contractAbi(sEther.address, SEtherName);
    console.log("cEther address is %s",sEther.address);
    return sEther
}


//  0.1 * 10 ^ 18
export const sEther__setReserveFactor = async(sEtherAddress:string)=>{
    const cEther = await ethers.getContractAt(sDelegatorName,sEtherAddress);
    await cEther._setReserveFactor(marketPlatformToken.reserveFactor);
    console.log("sEther__setReserveFactor call success !!");
}

export const sEther__supportMarket = async (comptrollerG7Address:string, sEtherAddress:string) => {
    const sToken = await ethers.getContractAt(comptrollerName,comptrollerG7Address);
    await sToken._supportMarket(sEtherAddress);  
    console.log("sEther__supportMarket call success !!")
}

/**
 * @param sEtherAddress 
 */
export const sEther_reduceReserves = async(sEtherAddress:string) =>{

}