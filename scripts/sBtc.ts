import { parseEther } from "ethers/lib/utils";
import { writeFileSync } from "fs";
import { ethers } from "hardhat";
import { sBtcDeploy,sBtc__setReserveFactor,sBtc__supportMarket} from "./sBtc.module";
import { simplePriceOracleDeploy, simplePriceOracle_setUnderlyingPrice } from "./priceOracle.module";
import { comptroller_existMarket, unitoller__setPendingImplementation, comptroller__setLiquidationIncentive, comptroller__become, comptroller__setCloseFactor, comptroller__setPriceOracle, comptroller__setCollateralFactor, comptroller_setStrikeSpeeds,comptroller_setMarketCapGuardian,comptroller_setPauseGuardian, comptroller_setReserveInfo } from "./comptroller.module";


async function main() {
    const signer = await ethers.provider.getSigner();
    const owner = await signer.getAddress();
  

    // const sBtc = await sBtcDeploy(
    //     "0x015FCe07115239213Aa6715e435Ce16FDE78380F", 
    //     "0x43820A0C87d2A1D30499eDA9548B5819c1c44Eb0", 
    //     "0x2F04F3c8338916665FE74eb96A7744346604eb70"
    //   );
    // console.log("btc address is %s",sBtc.address)

    //   await sBtc__supportMarket(
    //     "0x015FCe07115239213Aa6715e435Ce16FDE78380F", 
    //     sBtc.address
    //   );
    const sBtc = "0x8107508c34bC6896D6F2a7F583fF70FDEe465FF2";
    //   await simplePriceOracle_setUnderlyingPrice(
    //     signer,
    //     "0xDC7a729882aBB8F9bd3faA59F1957b2173E1A1f0", 
    //     sBtc, 
    //     parseEther("338399")
    //   );
    //   await sBtc__setReserveFactor(sBtc);
    
      await comptroller__setCollateralFactor("0x015FCe07115239213Aa6715e435Ce16FDE78380F", sBtc,"0.5").catch(err => console.log(err))

    // await comptroller_existMarket("0x015FCe07115239213Aa6715e435Ce16FDE78380F","0x101726383cF89fB205eFc8Ed25D96d78E5092149")
    
}





main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});