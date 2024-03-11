import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";

const maximillionName = "Maximillion";


export const maximillionDeploy = async (cEtherAddress:string) => {
    const MaximillionLens = await ethers.getContractFactory(maximillionName);
    const maximillion = await MaximillionLens.deploy(cEtherAddress);
    await maximillion.deployed().catch(err => console.log(err));
    await contractAbi(maximillion.address, maximillionName);
    console.log("maxMillon address is %s",maximillion.address);
    return maximillion;
}
