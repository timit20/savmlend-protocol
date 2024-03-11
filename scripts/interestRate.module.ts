import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";
import { whitePaperInterestRateConfig, jumpRateModelConfig} from "./config";
import { parseEther, parseUnits } from "ethers/lib/utils"
import { BigNumber } from "ethers";


const jumpRateModelV2Name = "JumpRateModelV2";
const whitePaperInterestRateModelName = "WhitePaperInterestRateModel";
const legacyJumpRateModelV2Name = "LegacyJumpRateModelV2";
export const jumpRateModelV2Deploy = async (owner: string) => {
    const JumpRateModelV2 = await ethers.getContractFactory(jumpRateModelV2Name);
    const jumpRateModelV2 = await JumpRateModelV2.deploy(
        jumpRateModelConfig.baseRatePerYear, 
        jumpRateModelConfig.multiplierPerYear, 
        jumpRateModelConfig.jumpMultiplierPerYear, 
        jumpRateModelConfig.kink_, 
        owner,
        {gasLimit:10000000}
    );
    await jumpRateModelV2.deployed();
    await contractAbi(jumpRateModelV2.address, jumpRateModelV2Name);
    console.log("jumpRateModelV2 address is %s",jumpRateModelV2.address);
    return jumpRateModelV2;
}

export const jumpRateModelV2Deploy2 = async (owner: string) => {
    const JumpRateModelV2 = await ethers.getContractFactory(jumpRateModelV2Name);
    const jumpRateModelV2 = await JumpRateModelV2.deploy(
        parseEther("0.02"), 
        parseEther("0.25"), 
        parseEther("0.55"), 
        parseEther("0.8"), 
        owner,
        {gasLimit:10000000}
    );
    await jumpRateModelV2.deployed();
    await contractAbi(jumpRateModelV2.address, jumpRateModelV2Name);
    console.log("jumpRateModelV2 address is %s",jumpRateModelV2.address);
    return jumpRateModelV2;
}


export const WhitePaperInterestRateModelDeploy = async (owner: string) => {
    const WhitePaperInterestRateModel = await ethers.getContractFactory(whitePaperInterestRateModelName);
    const whitePaperInterestRateModel = await WhitePaperInterestRateModel.deploy(
        whitePaperInterestRateConfig.baseRatePerYear, 
        whitePaperInterestRateConfig.multiplierPerYear, 
        {gasLimit:10000000}
    );
    await whitePaperInterestRateModel.deployed();
    await contractAbi(whitePaperInterestRateModel.address, whitePaperInterestRateModelName);
    console.log("whitePaperInterestRateModel address is %s",whitePaperInterestRateModel.address);
    return whitePaperInterestRateModel;
}

export const LegacyJumpRateModelV2Deploy = async(owner: string) =>{
    const LegacyJumpRateModelV2 = await ethers.getContractFactory(legacyJumpRateModelV2Name);
    const legacyJumpRateModelV2 = await LegacyJumpRateModelV2.deploy(
        parseUnits("0.1"), 
        parseEther("0.07"), 
        parseEther("3"), 
        parseEther("0.8"), 
        owner
    );
    await legacyJumpRateModelV2.deployed();
    await contractAbi(legacyJumpRateModelV2.address,legacyJumpRateModelV2Name);
    return legacyJumpRateModelV2;
}