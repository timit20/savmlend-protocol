import { BigNumber } from "ethers";
import { parseEther,parseUnits } from "ethers/lib/utils";

/**
 * @name 
 */
export const settlementRate = parseEther("0.5");

export const blockPerYear = BigNumber.from("15768000");

/**
 * @name closeFactor: 
 * @name liquidationIncentive 
 * if liquidationIncentive 8%，then 1.08 * 1 ^ 18;
 */
export const comptrollerConfig = {
    closeFactor: parseEther("0.5"),
    liquidationIncentive : parseEther("1.08")
    // liquidationIncentive : parseEther("1.00")
}


// uint baseRatePerYear,         
// uint multiplierPerYear,          if 7%，then 0.07 * 10 ^ 18
// uint jumpMultiplierPerYear,    if 3，then 3 * 10 ^ 18
// uint kink_,                              if 75%,then 0.75 * 10 ^ 18
// address owner_,                    msg.sender
// export const baseRatePerYear = 0;
// export const multiplierPerYear = parseEther("0.07");
// export const jumpMultiplierPerYear = parseEther("3");
// export const kink = parseEther("0.75");

export const whitePaperInterestRateConfig = {
    baseRatePerYear: BigNumber.from("19999999999728000"), 
    multiplierPerYear:  BigNumber.from("47564687975")
}

export const jumpRateModelConfig = {
    baseRatePerYear: parseEther("0"),  
    multiplierPerYear: parseEther("0.0625"),  
    jumpMultiplierPerYear: parseEther("1.1"),  
    kink_: parseEther("0.8") 
}


/**
 * chain token base config
 */
export const platformWrappedToken = {
    symbol : "nNibi",
    name : "Nebula nibi",
    decimals: "8",
    initReserves:"0",
    initialExchangeRateMantissa : BigNumber.from("200000000000000"),
    reserveFactor : parseEther("0.2"), 
    collateralFactor:"0.8",
    price: parseEther("0.00862"),
    supplySpeeds: parseEther("0"),
    borrowSpeeds: parseEther("0"),
    supplyCaps: parseEther("0"),
    borrowCaps: parseEther("0"),
    contractName: "SNibi"
}

export const nebulaBtcToken = {
    symbol : "nBTC",
    name : "Nebula Btc",
    decimals: "8",
    initReserves:"0",
    initialExchangeRateMantissa : BigNumber.from("200000000000000000000000000"),
    reserveFactor : parseEther("0.2"), 
    collateralFactor:"0.8",
    price: parseEther("54974.65"),
    supplySpeeds: parseEther("0"),
    borrowSpeeds: parseEther("0"),
    supplyCaps: parseEther("0"),
    borrowCaps: parseEther("0")
}


/**
 * goverment token config
 */
export const governorToken = {
    symbol: "SAVM",
    name : "Savmlend Token",
    decimals : "18",
    totalSupply: parseEther("6540888")
}

export const governorConfig = {
    votingDelay:10,
    votingPeriod:25,
    proposalThreshold:parseEther("25000")
}

//token config 
export const baseTokenConfig = [
    {
        name:"Savmlend USD Coin",
        symbol:"sUSDC",
        rateModel:"whitePaperInterestRateModel",
        address:"0xb54c3550E91b3F040C9C6f048769a76264B59bC7",
        collateralFactor:"0.5",
        isDelegateToken:true,
        initReserves:"0",
        reserveFactor:parseEther("1"),
        initialExchangeRateMantissa: BigNumber.from("216976347035425"),
        supplySpeeds: parseEther("0.06"),
        borrowSpeeds: parseEther("0.14"),
        supplyCaps: parseEther("20"),
        borrowCaps: parseEther("20"),
        price : parseEther("1")
    },
    {
        name:"Savmlend LINK",
        symbol:"sLINK",
        rateModel:"jumpRateModelV2",
        address:"0x7BcA84dE439aC6AA58a87cD13ADE31fA3B1B76E0",
        collateralFactor:"0.5",
        isDelegateToken:true,
        initReserves:"0",
        reserveFactor:parseEther("2"),
        initialExchangeRateMantissa: parseEther("22647293"),
        supplySpeeds: parseEther("0.01"),
        borrowSpeeds: BigNumber.from("2333333333333330"),
        supplyCaps: parseEther("20"),
        borrowCaps: parseEther("20"),
        price: parseEther("15.66")
    },
    {
        name:"Savmlend Uniswap",
        symbol:"sUNI",
        rateMdel:"whitePaperInterestRateModel",
        address:"0x1aC7574A051Ae118363E4D5CA62FA2431E0bc3e8",
        collateralFactor:"0.5",
        isDelegateToken:true,
        initReserves:"0",
        reserveFactor:parseEther("2"),
        initialExchangeRateMantissa: BigNumber.from("236931868489461585591097190"),
        supplySpeeds: parseEther("0.005"),
        borrowSpeeds: BigNumber.from("1166666666666670"),
        supplyCaps: parseEther("20"),
        borrowCaps: parseEther("20"),
        price: parseEther("6.3")
    }
]



