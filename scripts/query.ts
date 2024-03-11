import { BigNumber, Signer } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";
import { jumpRateModelV2Deploy, jumpRateModelV2Deploy2, WhitePaperInterestRateModelDeploy } from "./interestRate.module";
import { sBtcDeploy } from "./sBtc.module";
import { constants } from "buffer";


const savmlendPriceOracleName = "SavmlendPriceOracle";
const savmlendPriceOracle = '0x9786C3Eb8C70069a585e6d8bCC5a786A89ef4850';

const comptrollerName = "contracts/Comptroller.sol:Comptroller";
const unitroller = '0x94445711a94C9A0d58614ffcAe169a50E55D55bC';

const SErc20DelegatorName = "SErc20Delegator";
const SBtcName = "SBtc";
const sUSDCAddress = "0x6d72c0f5e3ee1138096399722d79439f31048c3c"

const sETHAddress = "0x101726383cf89fb205efc8ed25d96d78e5092149"

const sSavm = "0x9128906e06849585076E81De45a79A021374629E";
const sbtcAddress = "0x06843B0814Ed2aE1819ae1811bb8c745565aBC8c";

const sSavm2 = "0xcdF01364CAF84c7d77D6Ce928127235126FFeb7C";

const address = "0xEC79934B99941A757a9201b872ae18fa60B48921";

export const queryPrice = async(signer:Signer,sToken:string) =>{
    const comptroller = await ethers.getContractAt(comptrollerName,unitroller);
    // const mintAllowed = await comptroller.callStatic.mintAllowed(sSavm2,address,parseEther("0.1"));
    // console.log("mintAllowed is %s",mintAllowed)

    // await comptroller.repayBorrowAllowed(sbtcAddress,,address,);


    const sbtc = await ethers.getContractAt(SBtcName,sbtcAddress,signer);
    // const balanceOfUndelying = await sbtc.callStatic.balanceOfUnderlying(address);
    // console.log("balanceOfUndelying is %s",balanceOfUndelying);

    const accrueInterest = await sbtc.callStatic.accrueInterest();
    console.log("accrueInterest is %s",accrueInterest)

    const borrowBalanceStored = await sbtc.borrowBalanceStored(address);
    console.log("borrowBalanceCurrent is %s",borrowBalanceStored);

    const exchangeRateStored = await sbtc.exchangeRateStored();
    console.log("exchangeRateStored is %s",exchangeRateStored);

    const borrowBalanceCurrrent =  await sbtc.callStatic.borrowBalanceCurrent(address);
    console.log("borrowBalanceCurrrent is %s",borrowBalanceCurrrent);


    // const repayBorrowAllowed = await comptroller.callStatic.repayBorrowAllowed(sbtcAddress,"0x35F0db66Cc8b0e59C3bB5Af3c8c23a27f8be3982",address,borrowBalanceStored);
    // console.log("repayBorrowAllowed is %s",repayBorrowAllowed)


    const repayResult = await sbtc.repayBorrow({value:borrowBalanceCurrrent}).catch(err => console.log(err));
    console.log("repayResult is %s",repayResult)

    // const getHypotheticalAccountLiquidity = await comptroller.getHypotheticalAccountLiquidity(address,sSavm,0,0);
    // console.log("getHypotheticalAccountLiquidity is %s",getHypotheticalAccountLiquidity);

    // const borrowGuardianPaused = await comptroller.borrowGuardianPaused(sSavm);
    // console.log("borrowGuardianPaused is %s",borrowGuardianPaused);
    


    // const collateralResult = await comptroller._setCollateralFactor(sbtcAddress,parseEther("0.8"))
    // console.log("result is %s",collateralResult)
    // console.log("comptroller__setCollateralFactor call success !!")


    // const result = await comptroller.markets(savmlendAddress);
    // console.log("result is %s",result)

    // const result2 = await comptroller.markets(sbtcAddress);
    // console.log("result2 is %s",result2)

    // const addresses = []
    // addresses.push(savmlendAddress)
    // const result = await comptroller.getAssetsIn(address);
    // console.log("result is %s",result)

    // const result2 = await comptroller.callStatic.borrowAllowed(sbtcAddress, "0xec79934b99941a757a9201b872ae18fa60b48921", parseEther("100"));
    // console.log("result is %s",result2)

    // const oracle = await comptroller.oracle();
    // console.log("priceOracle is %s",oracle);

    // const price = await ethers.getContractAt(savmlendPriceOracleName,oracle,signer);
    // const priceResult = await price.getUnderlyingPrice(sUSDCAddress);

    // const priceResult2 = await price.assetPrices("0xe40645BF2E74D5848E87f81336032eE622Ea8CEd");

    // console.log("priceResult is %s",priceResult)
    // console.log("priceResult2 is %s",priceResult2)


    // const result = await comptroller.callStatic.exitMarket(sETHAddress).catch(error => console.log(error));
    // console.log("result is %s",result)

    

    // const simple = await ethers.getContractAt(savmlendPriceOracleName, savmlendPriceOracle, signer);
    // const price = await simple.getUnderlyingPrice("0xcdF01364CAF84c7d77D6Ce928127235126FFeb7C");
    
    // console.log("price is %s",price)

    // const sUSDC = await ethers.getContractAt(SErc20DelegatorName,savmlendAddress,signer);
    // const result = await sUSD.co.accrueInterest()
    // console.log("result is %s",result)
    // // const balanceOfUnderlying = await sUSDC.callStatic.balanceOfUnderlying("0x9b1b991927Fe96cA3971eFDcb9308de1b33671b8");
    // const balance = await sUSDC.balanceOf("0xec79934b99941a757a9201b872ae18fa60b48921");
    // const exchangeRate = await sUSDC.callStatic.exchangeRateCurrent();
    // const borrowAmount = await sUSDC.borrowBalanceStored("0xec79934b99941a757a9201b872ae18fa60b48921");
    // console.log("balance is %s",balance);
    // console.log("borrowAmount is %s",borrowAmount);
    // const borrowBalanceCurrent = await sUSDC.callStatic.borrowBalanceCurrent("0xec79934b99941a757a9201b872ae18fa60b48921").catch(err => console.log(err));
    // const userSnapShot = await sUSDC.getAccountSnapshot("0xec79934b99941a757a9201b872ae18fa60b48921");
    // // console.log("balanceOfUnderlying is %s",balanceOfUnderlying)
    // console.log("borrowBalanceCurrent is %s",borrowBalanceCurrent)
    // console.log("exchangeRate is %s",exchangeRate)
    // console.log("userSnapShot is %s",userSnapShot)

    // const accrueInterest = await sUSDC.callStatic.accrueInterest()

    // const borrow = await sUSDC.borrow("100").catch(error => console.log(error))

    // console.log("borrow Error is %s" ,borrow)

    // console.log("accrueInterest is %s",accrueInterest)

    // const sSavmContract = await ethers.getContractAt(SErc20DelegatorName,sSavm2,signer);
    // const result =  await sSavmContract.callStatic.exchangeRateStored();
    // console.log("result is %s",result)
    // const result = sSavmContract.callStatic.mint(parseEther("0.1"));
    // console.log("result is %s",result)
    // const sBtcContract = await ethers.getContractAt(SErc20DelegatorName,sbtcAddress,signer);

    // const sSavmInterestRateModel = await sSavmContract.interestRateModel();
    // const sBtcInterestRateModel = await sBtcContract.interestRateModel();

    // const sSavmRepayBorrow = await sSavmContract.borrowBalanceStored(address);
    // const repayResult = await sSavmContract.callStatic.repayBorrow(sSavmRepayBorrow).catch(err => console.log(err));
    // const sBtcOracle = await sBtcContract.borrowBalanceStored(address);

    // console.log("sSavmRepayBorrow is %s",sSavmRepayBorrow)
    // console.log("repayResult result is %s",repayResult )


    // console.log(parseEther("0.2"))
    // console.log(parseEther("2"))
    // console.log(parseEther("2.5"))
    // console.log("sBtcOracle is %s",sBtcOracle)

}

export const changeRateModel= async() =>{
 const signer = await ethers.provider.getSigner();
 const owner = await signer.getAddress();
  // const savm = await savmTokenDeploy(owner);
  // const savm = {
  //   address: "0xd8a65CC6fDf7B89A4163d3ec9bB42D4c0B94695A"
  // }

  // const timeLock = await timeLockDeploy(owner);
  const timeLock ={
    address:owner
  }
  const jumpRateModelV2Base = await jumpRateModelV2Deploy(timeLock.address);
//   const jumpRateModelV2Base = {
//     address : "0x3c3C809859150b62eDD595174A026dfc0907aAE3"
//   }

  const jumpRateModelV2Savm = await jumpRateModelV2Deploy2(timeLock.address);
//   const jumpRateModelV2Savm = {
//     address : "0x1599a526ecBeBA1B76ea518D63D1d7178605d78A"
//   }

  const sSavmContract = await ethers.getContractAt(SErc20DelegatorName,sSavm,signer);
  const sBtcContract = await ethers.getContractAt(SErc20DelegatorName,sbtcAddress,signer);

  await sSavmContract._setInterestRateModel(jumpRateModelV2Savm.address);
  await sBtcContract._setInterestRateModel(jumpRateModelV2Base.address);

  console.log("jumpBase addreess : %s",jumpRateModelV2Base.address);
  console.log("jumpSavm address : %s",jumpRateModelV2Savm.address);
}



async function main() {
    const signer = await ethers.provider.getSigner();
    const sToken = '0xDC7a729882aBB8F9bd3faA59F1957b2173E1A1f0';
    queryPrice(signer,sToken)
    // changeRateModel()
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });