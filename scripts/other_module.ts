import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";

const multiCallName = "Multicall3";

export const multiCallDeploy = async () => {
    const MultiCallLens = await ethers.getContractFactory(multiCallName);
    const multiCall = await MultiCallLens.deploy();
    await multiCall.deployed().catch(err => console.log(err));
    console.log("multiCall address is %s",multiCall.address);
    return multiCall;
}
