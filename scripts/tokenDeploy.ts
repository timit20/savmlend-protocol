import { DAITokenDeploy, USDTTokenDeploy,LinkTokenDepoly,UNITokenDepoly,USDCTokenDepoly } from "./tokens.module";
import { ethers } from "hardhat";



async function main() {
    const signer = await ethers.provider.getSigner();
    const owner = await signer.getAddress();

    // const dai = await DAITokenDeploy();
    // console.log("dai address is %s",dai.address)

    const link = await LinkTokenDepoly();
    console.log("link address is %s",link.address)

    const uni = await UNITokenDepoly();
    console.log("uni address is %s",uni.address)

    const usdc = await USDCTokenDepoly();
    console.log("usdc address is %s",usdc.address)

}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

