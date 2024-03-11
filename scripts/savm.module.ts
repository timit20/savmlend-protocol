import type { Contract } from "ethers";
import { ethers } from "hardhat";
import { readFile, writeFile } from "fs";
import { join } from "path";
import { contractAbi } from "../utils/contractInfo";

/**
 * @module comp token module
 */

const savmName ="Savm";


/**
 * 
 * @param address 部署savmToken
 * @returns 
 */
export const savmTokenDeploy = async(address:string):Promise<Contract>=>{
    const Savm = await ethers.getContractFactory(savmName);
    const savm = await Savm.deploy(address);
    await savm.deployed();
    await contractAbi(savm.address, savmName);
    console.log("strk address is %s",savm.address)
    return savm;
}


export const setCompAddress = async (address:string) => {
    const path = join(__dirname,"../contracts/Comptroller.sol");
    readFile(path,"utf-8",(err, data)=>{
        if(err != null)return console.log(err);
        const context = data.replace(/\/\*\*start\*\/(\S+)\/\*\*end\*\//,`${address}`)
        writeFile(path, context, err => {
            if(err != null) return console.log(err);
            console.log("change savm address success !");
        })
    })
}
