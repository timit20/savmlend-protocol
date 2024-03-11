import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";

const timeLockName = "Timelock";

export const timeLockDeploy = async (governorAddress:string) => {
    const TimeLock = await ethers.getContractFactory(timeLockName);
    const timeLock = await TimeLock.deploy(governorAddress,172800,{gasLimit:10000000});
    await timeLock.deployed();
    await contractAbi(timeLock.address, timeLockName);
    console.log("timeLock address is %s",timeLock.address)
    return timeLock;
}
