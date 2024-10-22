
import { BigNumber, Signer } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";

const testnetPriceOracleName = "TestNetPriceOracle";

export const testnetPriceOracleDeploy = async (symbol:string) => {
    const TestnetPriceOracleNamePriceOracle = await ethers.getContractFactory(testnetPriceOracleName);
    const testnetPriceOracle = await TestnetPriceOracleNamePriceOracle.deploy(symbol);
    await testnetPriceOracle.deployed();
    // await contractAbi(savmlendPriceOracle.address, savmlendPriceOracleName);
    console.log("savmlendPriceOracle address is %s",testnetPriceOracle.address);
    console.log(`testnetPriceOracle deploy hash is ${testnetPriceOracle.deployTransaction.hash}`);
    return testnetPriceOracle;
}


export const priceOracle_setUnderlyingPrice = async (signer:Signer,priceOracleAddress: string, sToken: string, underlyingPriceMantissa: BigNumber) => {
    const simple = await ethers.getContractAt(testnetPriceOracleName, priceOracleAddress, signer);
    // console.log("sToken is %s ,underlyingPriceMantissa is %s",cToken,underlyingPriceMantissa);
    await simple.setUnderlyingPrice(sToken, underlyingPriceMantissa).catch(err => console.log(err));
    // await simple.setUnderlyingPrice(cToken, underlyingPriceMantissa).catch(err => console.log(err));
    console.log(`savmlendPriceOracle_setUnderlyingPrice call success ${sToken} ${formatEther(underlyingPriceMantissa)}$ !!`)
}

export const queryPrice = async(signer:Signer,priceAddress:string,sToken:string) =>{
    const simple = await ethers.getContractAt(testnetPriceOracleName, priceAddress, signer);
    const price = simple.getUnderlyingPrice(sToken);
    console.log("price is %s",price)
}