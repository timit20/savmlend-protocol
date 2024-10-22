import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";

const exponentialName = "MorkExponential";

export const exponentialDeploy = async () => {
    const Exponential = await ethers.getContractFactory(exponentialName);
    const exponential = await Exponential.deploy();
    await exponential.deployed().catch(err => console.log(err));
    await contractAbi(exponential.address, exponentialName);
    console.log("exponential address is %s",exponential.address);
    return exponential;
}