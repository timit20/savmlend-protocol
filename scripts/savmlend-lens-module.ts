import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";

const savmLensName = "SavmLens";

export const savmLensDeploy = async () => {
    const SavmLens = await ethers.getContractFactory(savmLensName);
    const savmLens = await SavmLens.deploy();
    await savmLens.deployed();
    await contractAbi(savmLens.address, savmLensName);
    console.log("savmlendLens address is %s",savmLens.address);

    return savmLens;
}
