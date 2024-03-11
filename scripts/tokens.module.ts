import { ethers } from "hardhat";

const usdtToken = "USDTToken"
const daiToken = "DAIToken"
const usdcToken = "USDCToken"
const uniToken = "UNIToken"
const linkToken = "LinkToken"

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
