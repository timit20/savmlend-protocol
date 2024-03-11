/**
 * setCompSpeedInternal 设置挖矿速率
 */
import { createContracts } from "../contracts";
import { formatUnits, parseUnits } from "ethers/lib/utils";
import { ethers } from "hardhat";


// 存款 USDT
export const mint = async () => {
    const { cErc20Delegator, erc20Token, signer, comptroller } = await createContracts();
    const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

    // 开启挖矿奖励
    await comptroller._setCompSpeeds([cErc20Delegator.address],[parseUnits("1")],[0]);
    await erc20Token.approve(cErc20Delegator.address, ethers.constants.MaxUint256)
    // await provider.send("evm_setIntervalMining", [1000]);
    await cErc20Delegator.mint(parseUnits("100"));

    setInterval(async()=>{
        console.log(await provider.getBlockNumber())
        await comptroller.updateCompSupply(cErc20Delegator.address,signer.address, { gasLimit: 3000000 });
        console.log(formatUnits(await comptroller.compAccrued(signer.address)));
    },1000)
}

mint()
    .catch(err => console.log(err));