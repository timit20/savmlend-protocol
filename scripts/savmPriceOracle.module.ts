// 代理合约

import { BigNumber, Signer } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";

const savmlendPriceOracleName = "SavmlendPriceOracle";

// 预言机
export const savmlendPriceOracleDeploy = async () => {
    const SavmlendPriceOracle = await ethers.getContractFactory(savmlendPriceOracleName);
    const savmlendPriceOracle = await SavmlendPriceOracle.deploy();
    await savmlendPriceOracle.deployed();
    // await contractAbi(savmlendPriceOracle.address, savmlendPriceOracleName);
    console.log("savmlendPriceOracle address is %s",savmlendPriceOracle.address);
    return savmlendPriceOracle;
}


// 设置市场价格
export const savmlendPriceOracle_setUnderlyingPrice = async (signer:Signer,simplePriceOracleAddress: string, sToken: string, underlyingPriceMantissa: BigNumber) => {
    const simple = await ethers.getContractAt(savmlendPriceOracleName, simplePriceOracleAddress, signer);
    //消耗gas比较多
    // console.log("sToken is %s ,underlyingPriceMantissa is %s",cToken,underlyingPriceMantissa);
    await simple.setUnderlyingPrice(sToken, underlyingPriceMantissa, { gasLimit: 10000000 }).catch(err => console.log(err));
    // await simple.setUnderlyingPrice(cToken, underlyingPriceMantissa).catch(err => console.log(err));
    console.log(`savmlendPriceOracle_setUnderlyingPrice call success ${sToken} ${formatEther(underlyingPriceMantissa)}$ !!`)
}

export const queryPrice = async(signer:Signer,priceAddress:string,sToken:string) =>{
    const simple = await ethers.getContractAt(savmlendPriceOracleName, priceAddress, signer);
    const price = simple.getUnderlyingPrice(sToken);
    console.log("price is %s",price)
}