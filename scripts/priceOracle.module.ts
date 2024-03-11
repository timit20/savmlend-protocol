// 代理合约

import { BigNumber, Signer } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { contractAbi } from "../utils/contractInfo";

const simplePriceOracleName = "SimplePriceOracle";

// 预言机
export const simplePriceOracleDeploy = async () => {
    const SimplePriceOracle = await ethers.getContractFactory(simplePriceOracleName);
    const simplePriceOracle = await SimplePriceOracle.deploy();
    await simplePriceOracle.deployed();
    await contractAbi(simplePriceOracle.address, simplePriceOracleName);
    console.log("simplePriceOracle address is %s",simplePriceOracle.address);
    return simplePriceOracle;
}

// 设置市场价格
export const simplePriceOracle_setUnderlyingPrice = async (signer:Signer,simplePriceOracleAddress: string, sToken: string, underlyingPriceMantissa: BigNumber) => {
    const simple = await ethers.getContractAt(simplePriceOracleName, simplePriceOracleAddress, signer);
    //消耗gas比较多
    // console.log("sToken is %s ,underlyingPriceMantissa is %s",cToken,underlyingPriceMantissa);
    await simple.setUnderlyingPrice(sToken, underlyingPriceMantissa, { gasLimit: 10000000 }).catch(err => console.log(err));
    // await simple.setUnderlyingPrice(cToken, underlyingPriceMantissa).catch(err => console.log(err));
    console.log(`simplePriceOracle_setUnderlyingPrice call success ${sToken} ${formatEther(underlyingPriceMantissa)}$ !!`)
}

export const priceOracleAggregatorDepoly = async() =>{


    
}
    
