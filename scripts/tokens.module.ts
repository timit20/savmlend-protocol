import { ethers } from "hardhat";

const usdtToken = "USDTToken"
const daiToken = "DAIToken"
const usdcToken = "USDCToken"
const uniToken = "UNIToken"
const linkToken = "LinkToken"
const wbBtcToken = "WBBTCToken"
const wnBtcToken = "WNBTCToken"
const unicornToken = "UNICORNToken"

export const USDTTokenDeploy = async () => {
    const USDT = await ethers.getContractFactory(usdtToken);
    const usdt = await USDT.deploy();
    await usdt.deployed();
    // await contractAbi(usdt.address, usdtToken);
    console.log("usdt address is %s",usdt.address)
    return usdt;
}

export const DAITokenDeploy = async () => {
    const USDT = await ethers.getContractFactory(daiToken);
    const usdt = await USDT.deploy();
    await usdt.deployed();
    // await contractAbi(usdt.address, daiToken);
    console.log("dai address is %s",usdt.address)
    return usdt;
}

export const LinkTokenDepoly = async () => {
    const USDT = await ethers.getContractFactory(linkToken);
    const usdt = await USDT.deploy();
    await usdt.deployed();
    // await contractAbi(usdt.address, daiToken);
    console.log("link address is %s",usdt.address)
    return usdt;
}

export const UNITokenDepoly = async () => {
    const USDT = await ethers.getContractFactory(uniToken);
    const usdt = await USDT.deploy();
    await usdt.deployed();
    // await contractAbi(usdt.address, daiToken);
    console.log("dai address is %s",usdt.address)
    return usdt;
}

export const USDCTokenDepoly = async () => {
    const USDT = await ethers.getContractFactory(usdcToken);
    const usdt = await USDT.deploy();
    await usdt.deployed();
    // await contractAbi(usdt.address, daiToken);
    console.log("usdc address is %s",usdt.address)
    return usdt;
}

export const WBBTCTokenDepoly = async() =>{
    const WBBTC = await ethers.getContractFactory(wbBtcToken);
    const wbbtc = await WBBTC.deploy();
    await wbbtc.deployed();
    // await contractAbi(usdt.address, daiToken);
    console.log("wbbtc address is %s",wbbtc.address)
    return wbbtc;
}

export const WNBTCTokenDeploy = async() =>{
    const WNBTC = await ethers.getContractFactory(wnBtcToken);
    const wnbtc = await WNBTC.deploy();
    await wnbtc.deployed();
    // await contractAbi(usdt.address, daiToken);
    console.log("wnbtc address is %s",wnbtc.address)
    // console.log(`wnbtc deployed is ${JSON.stringify(wnbtc)}`)
    return wnbtc;
}

export const UNICORNTokenDeploy = async() =>{
    const UNICORN = await ethers.getContractFactory(unicornToken);
    const unicorn = await UNICORN.deploy();
    await unicorn.deployed();
    // await contractAbi(usdt.address, daiToken);
    console.log("unicorn address is %s",unicorn.address);
    // console.log(`unicorn deployed is ${JSON.stringify(wnbtc)}`)
    return unicorn;
}