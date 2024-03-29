import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";
import { settlementRate } from "./config";
import { BigNumber } from "ethers";
import { comptrollerConfig } from "./config";


const unitrollerName = "Unitroller";
const comptrollerName = "contracts/Comptroller.sol:Comptroller";

export const unitollerDeploy = async () => {
    const Unitroller = await ethers.getContractFactory(unitrollerName);
    const unitroller = await Unitroller.deploy();
    await unitroller.deployed().catch(err => console.log(err));
    await contractAbi(unitroller.address, unitrollerName);
    console.log("unitoller address is %s",unitroller.address)
    return unitroller;
}

//
export const unitoller__setPendingImplementation =async (unitrollerAddress:string, comptrollerAddress:string) => {
    const unitroller = await ethers.getContractAt("Unitroller", unitrollerAddress);
    await unitroller._setPendingImplementation(comptrollerAddress);
    console.log("unitoller__setPendingImplementation call  success !!");
}

export const conoptroller_setMaxAssets = async(comptrollerAddress:string) =>{
    // const comptroller = await ethers.getContractAt(comptrollerName, comptrollerAddress);
    // await comptroller.();

}



export const comptrollerDeploy = async () => {
    const Comptroller = await ethers.getContractFactory(comptrollerName);
    const comptroller = await Comptroller.deploy();
    await comptroller.deployed();
    // await contractAbi(comptroller.address, comptrollerName);
    console.log("comptroller address is %s",comptroller.address);
    return comptroller;
}

// 
export const comptroller__become = async(unitrollerAddress:string, comptrollerAddress:string)=>{
    const comptroller = await ethers.getContractAt(comptrollerName, comptrollerAddress);
    await comptroller._become(unitrollerAddress,{gasLimit:10000000});
    console.log("comptroller__become call  success !!");
}

//
export const comptroller__setCloseFactor =async (unitrollerAddress:string) => {
    const comptroller = await ethers.getContractAt(comptrollerName, unitrollerAddress);
    await comptroller._setCloseFactor(comptrollerConfig.closeFactor,{gasLimit:10000000});   //  0.5
    console.log("comptroller__setCloseFactor call  success !!");
}


// 8%,percent 
export const comptroller__setLiquidationIncentive = async(unitrollerAddress:string) => {
    const comptroller = await ethers.getContractAt(comptrollerName, unitrollerAddress);
    await comptroller._setLiquidationIncentive(comptrollerConfig.liquidationIncentive,{gasLimit:10000000});    //  1.08
    console.log("comptroller__setLiquidationIncentive call  success !!");
}

// 
export const comptroller__setPriceOracle = async(unitrollerAddress:string, simplePriceOracleAddress:string) => {
    const comptroller = await ethers.getContractAt(comptrollerName, unitrollerAddress);
    await comptroller._setPriceOracle(simplePriceOracleAddress);
    console.log("comptroller__setPriceOracle call  success !!");
}


// 
export const comptroller__setCollateralFactor = async(unitrollerAddress:string,cErc20DelegatorAddress:string,rate?:string) => {
    const comptroller = await ethers.getContractAt(comptrollerName,unitrollerAddress);
    // //  CToken cToken,CErc20Delegator.sol 地址
    // 0.6 * 10 ^ 18
    // 100 * 0.75 = 75usdt
    await comptroller._setCollateralFactor(cErc20DelegatorAddress,parseEther(rate ? rate :"0.75"));    
    console.log("comptroller__setCollateralFactor call success !!")
} 

/**
 * @param comptollerAddress 
 * @param cTokens 
 * @param supplySpeeds 
 * @param borrowSpeeds 
 */
export const comptroller_setSavmlendSpeeds = async(unitrollerAddress:string,cTokens:string[],supplySpeeds:BigNumber[],borrowSpeeds:BigNumber[]) =>{
    const comptroller = await ethers.getContractAt(comptrollerName,unitrollerAddress);
    await comptroller._setSavmlendSpeeds(cTokens,supplySpeeds,borrowSpeeds);

}

/**
 * 
 * @param comptollerAddress 
 * @param cTokens 
 * @param newBorrowCaps 
 */
export const comptroller_setMarketCaps = async(unitrollerAddress:string,cTokens:string[],newSupplyCaps:BigNumber[],newBorrowCaps:BigNumber[]) =>{
    const comptroller = await ethers.getContractAt(comptrollerName,unitrollerAddress);
    await comptroller._setMarketCaps(cTokens,newSupplyCaps,newBorrowCaps);
}

/**
 * 
 * @param comptrollerAddress 
 * @param newBorrowCapGuardian 
 */
export const comptroller_setMarketCapGuardian = async(unitrollerAddress:string,newBorrowCapGuardian:string) =>{
    const comptroller = await ethers.getContractAt(comptrollerName,unitrollerAddress);
    await comptroller._setMarketCapGuardian(newBorrowCapGuardian);
}

/**
 * 
 * @param comptrollerAddress 
 * @param pauseGuardian 
 */
export const comptroller_setPauseGuardian = async(unitrollerAddress:string,pauseGuardian:string) =>{
    const comptroller = await ethers.getContractAt(comptrollerName,unitrollerAddress);
    await comptroller._setPauseGuardian(pauseGuardian);
}

/**
 * 
 * @param comptroller 
 * @param owner 
 */
export const comptroller_setReserveInfo = async(unitrollerAddress:string,owner:string) =>{
    const comptroller = await ethers.getContractAt(comptrollerName,unitrollerAddress);
    await comptroller._setReserveInfo(owner,owner);
}


/**
 * 
 * @param comptrollerAddress 
 * @param cToken 
 */
export const comptroller_existMarket = async(comptrollerAddress:string,cToken:string) =>{
    // const comptroller = await ethers.getContractAt(comptrollerName,comptrollerAddress);
    // await comptroller.exitMarket(cToken);
}
