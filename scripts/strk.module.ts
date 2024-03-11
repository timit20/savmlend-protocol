import type { Contract } from "ethers";
import { ethers } from "hardhat";
import { readFile, writeFile } from "fs";
import { join } from "path";
import { contractAbi } from "../utils/contractInfo";

/**
 * @module comp token module
 */

const strkName ="STRK";


/**
 * 
 * @param address 部署strkToken
 * @returns 
 */
export const strkTokenDeploy = async(address:string):Promise<Contract>=>{
    const Strk = await ethers.getContractFactory(strkName);
    const strk = await Strk.deploy(address);
    await strk.deployed();
    await contractAbi(strk.address, strkName);
    console.log("strk address is %s",strk.address)
    return strk;
}


export const setCompAddress = async (address:string) => {
    const path = join(__dirname,"../contracts/Comptroller.sol");
    readFile(path,"utf-8",(err, data)=>{
        if(err != null)return console.log(err);
        const context = data.replace(/\/\*\*start\*\/(\S+)\/\*\*end\*\//,`${address}`)
        writeFile(path, context, err => {
            if(err != null) return console.log(err);
            console.log("change strk address success !");
        })
    })
}
