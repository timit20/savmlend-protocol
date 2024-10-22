import { ethers } from "hardhat";
import { platformWrappedToken} from "./config";


const sDelegatorName = "SErc20Delegator";
const comptrollerName = "contracts/Comptroller.sol:Comptroller";

export const coreWrapperTokenDeploy = async (
    unitrollerAddress: string,
    etherJumpRateModelV2Address: string,
    owner: string
) => {
    const ContractToken = await ethers.getContractFactory(platformWrappedToken.contractName);
    const coreWrapperToken = await ContractToken.deploy(
        unitrollerAddress,
        etherJumpRateModelV2Address,
        platformWrappedToken.initialExchangeRateMantissa, 
        platformWrappedToken.name,
        platformWrappedToken.symbol,
        platformWrappedToken.decimals,
        owner
    );
    await coreWrapperToken.deployed();

    console.log("coreWrapperToken address is %s",coreWrapperToken.address);
    console.log(`coreWrapperToken transactionHash is ${coreWrapperToken.deployTransaction.hash}`);

    return coreWrapperToken
}

// 设置保证金系数   0.1 * 10 ^ 18
export const coreToken__setReserveFactor = async(coreTokenAddress:string)=>{
    const cEther = await ethers.getContractAt(sDelegatorName,coreTokenAddress);
    await cEther._setReserveFactor(platformWrappedToken.reserveFactor);
    console.log("sEther__setReserveFactor call success !!");
}

// 添加到市场
export const coreToken__supportMarket = async (comptrollerG7Address:string, coreTokenAddress:string) => {
    const sToken = await ethers.getContractAt(comptrollerName,comptrollerG7Address);
    await sToken._supportMarket(coreTokenAddress);  //  把该ETH加入到市场中
    console.log("sEther__supportMarket call success !!")
}