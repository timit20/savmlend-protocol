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
    console.log("unitoller Transaction Hash:", unitroller.deployTransaction.hash);
    return unitroller;
}

//
export const unitoller__setPendingImplementation =async (unitrollerAddress:string, comptrollerAddress:string) => {
    const unitroller = await ethers.getContractAt("Unitroller", unitrollerAddress);
    const setPendingImplementationResult = await unitroller._setPendingImplementation(comptrollerAddress);
    console.log("unitoller__setPendingImplementation call  success !!");
    console.log(`setPendingImplementationResult transactionHash is ${setPendingImplementationResult.hash}`);

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
    console.log("comptroller Transaction Hash:", comptroller.deployTransaction.hash);
    return comptroller;
}

// 
export const comptroller__become = async(unitrollerAddress:string, comptrollerAddress:string)=>{
    const comptroller = await ethers.getContractAt(comptrollerName, comptrollerAddress);
    const result = await comptroller._become(unitrollerAddress);
    console.log("comptroller__become call  success !!");
    console.log(`comptroller__become transactionHash is ${result.hash}`);
}

//
export const comptroller__setCloseFactor =async (unitrollerAddress:string) => {
    const comptroller = await ethers.getContractAt(comptrollerName, unitrollerAddress);
    const result = await comptroller._setCloseFactor(comptrollerConfig.closeFactor);   //  0.5
    console.log("comptroller__setCloseFactor call  success !!");
    console.log(`_setCloseFactor transactionHash is ${result.hash}`);
}


// 8%,percent 
export const comptroller__setLiquidationIncentive = async(unitrollerAddress:string) => {
    const comptroller = await ethers.getContractAt(comptrollerName, unitrollerAddress);
    // console.log(`comptroller is ${JSON.stringify(comptroller)}`)
    const result = await comptroller._setLiquidationIncentive(comptrollerConfig.liquidationIncentive);    //  1.08
    console.log("comptroller__setLiquidationIncentive call  success !!");
    console.log(`comptroller__setLiquidationIncentive transactionHash is ${result.hash}`);
}

// 
export const comptroller__setPriceOracle = async(unitrollerAddress:string, simplePriceOracleAddress:string) => {
    const comptroller = await ethers.getContractAt(comptrollerName, unitrollerAddress);
    const result = await comptroller._setPriceOracle(simplePriceOracleAddress);
    console.log("comptroller__setPriceOracle call  success !!");
    console.log(`comptroller__setPriceOracle transactionHash is ${result.hash}`);
}


// 
export const comptroller__setCollateralFactor = async(unitrollerAddress:string,cErc20DelegatorAddress:string,rate?:string) => {
    const comptroller = await ethers.getContractAt(comptrollerName,unitrollerAddress);
    // //  CToken cToken,CErc20Delegator.sol 地址
    // 0.6 * 10 ^ 18
    // 100 * 0.75 = 75usdt
    const result = await comptroller._setCollateralFactor(cErc20DelegatorAddress,parseEther(rate ? rate :"0.75"));    
    console.log("comptroller__setCollateralFactor call success !!")
    console.log(`comptroller__setCollateralFactor transactionHash is ${result.hash}`);

} 

/**
 * @param comptollerAddress 
 * @param cTokens 
 * @param supplySpeeds 
 * @param borrowSpeeds 
 */
export const comptroller_setSpeeds = async(unitrollerAddress:string,cTokens:string[],supplySpeeds:BigNumber[],borrowSpeeds:BigNumber[]) =>{
    const comptroller = await ethers.getContractAt(comptrollerName,unitrollerAddress);
    await comptroller._setSpeeds(cTokens,supplySpeeds,borrowSpeeds);

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
    const result = await comptroller._setMarketCapGuardian(newBorrowCapGuardian);
    console.log(`comptroller_setMarketCapGuardian transactionHash is ${result.hash}`);

}

/**
 * 
 * @param comptrollerAddress 
 * @param pauseGuardian 
 */
export const comptroller_setPauseGuardian = async(unitrollerAddress:string,pauseGuardian:string) =>{
    const comptroller = await ethers.getContractAt(comptrollerName,unitrollerAddress);
    const result =  await comptroller._setPauseGuardian(pauseGuardian);
    console.log(`comptroller_setPauseGuardian transactionHash is ${result.hash}`);
}

/**
 * 
 * @param comptroller 
 * @param owner 
 */
export const comptroller_setReserveInfo = async(unitrollerAddress:string,owner:string) =>{
    const comptroller = await ethers.getContractAt(comptrollerName,unitrollerAddress);
    const result = await comptroller._setReserveInfo(owner,owner);
    console.log(`comptroller_setReserveInfo transactionHash is ${result.hash}`);
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
