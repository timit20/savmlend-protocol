import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";
import { baseRatePerYear, jumpMultiplierPerYear, kink, multiplierPerYear } from "./config";
import { parseEther, parseUnits } from "ethers/lib/utils"
import { governorConfig } from "./config"

const governorBravoDelegateName = "GovernorBravoDelegate";
const governorBravoDelegatorName = "GovernorBravoDelegator";
const legacyJumpRateModelV2Name = "LegacyJumpRateModelV2";

/**
 * 初始化governorBravoDelegate池子
 * @returns 
 */
export const governorBravoDelegateDeploy = async () => {
    const GovernorBravoDelegate = await ethers.getContractFactory(governorBravoDelegateName);
    const governorBravoDelegate = await GovernorBravoDelegate.deploy();
    await governorBravoDelegate.deployed();
    await contractAbi(governorBravoDelegate.address, governorBravoDelegateName);
    return governorBravoDelegate;
}

/**
 * 初始化governorBravoDelegator池子
 * @param timeLockAddress 
 * @param compAddress 
 * @param adminAddress 
 * @param governorBravoDelegate 
 * @returns 
 */
export const governorBravoDelegatorDeploy = async(timeLockAddress:string,compAddress:string,adminAddress:string,governorBravoDelegate:string,)=>{
    const GovernorBravoDelegator = await ethers.getContractFactory(governorBravoDelegatorName);
    const governorBravoDelegator = await GovernorBravoDelegator.deploy(
        timeLockAddress,
        compAddress,
        adminAddress,
        governorBravoDelegate,
        governorConfig.votingPeriod,
        governorConfig.votingDelay,
        governorConfig.proposalThreshold
    );
    await governorBravoDelegator.deployed();
    await contractAbi(governorBravoDelegator.address, governorBravoDelegateName);
    return governorBravoDelegator;
}

/**
 * 设置管理员地址
 * @param governorAddress 
 * @param pendingAdminAddress 
 */
export const governor_setPendAdmin = async(governorAddress:string,pendingAdminAddress:string) => {
    const governorBravoDelegator = await ethers.getContractAt(governorBravoDelegateName,governorAddress);
    await governorBravoDelegator._setPendingAdmin(pendingAdminAddress);
}