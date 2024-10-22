import {exponentialDeploy} from './exponential_module'
import { ethers } from "hardhat";


async function main() {
    const signer = await ethers.provider.getSigner();
    const owner = await signer.getAddress();
    const exponential = await exponentialDeploy();
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});