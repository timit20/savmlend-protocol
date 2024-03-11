import { BigNumber } from "ethers";
import { parseEther } from "ethers/lib/utils";

/**
 * @name 清算比例
 */
export const settlementRate = parseEther("0.5");

/**
 * @name closeFactor: 清算比例 债务超过资产抵押率的时候可以清算多少债务
 * @name liquidationIncentive 流动性激励 || 清算激励
 * 设置流动性激励为 8%，参数值就是1.08 * 1 ^ 18;
 */
export const comptrollerConfig = {
    closeFactor: parseEther("1"),
    // liquidationIncentive : parseEther("1.08")
    liquidationIncentive : parseEther("1.00")
}


// uint baseRatePerYear,         实际设置为 0
// uint multiplierPerYear,          实际设置 7%，即 0.07 * 10 ^ 18
// uint jumpMultiplierPerYear,  实际设置 3，即 3 * 10 ^ 18
// uint kink_,                             实际设置 75%，即 0.75 * 10 ^ 18
// address owner_,                   实际设置 msg.sender
// export const baseRatePerYear = 0;
// export const multiplierPerYear = parseEther("0.07");
// export const jumpMultiplierPerYear = parseEther("3");
// export const kink = parseEther("0.75");

export const whitePaperInterestRateConfig = {
    baseRatePerYear: BigNumber.from("19999999999728000"), //近似目标基础 APR，尾数（按 1e18 缩放）
    multiplierPerYear:  BigNumber.from("47564687975")//利率利用率的增长率（按 1e18 缩放）
}

export const jumpRateModelConfig = {
    baseRatePerYear: parseEther("0"),  //近似目标基础 APR，尾数（按 1e18 缩放）// 年基准利率
    multiplierPerYear: parseEther("0.0625"),  //利率利用率的增长率（按 1e18 缩放）// 年利率乘数
    jumpMultiplierPerYear: parseEther("1.1"),  //达到指定使用点后的 multiplierPerBlock  // 拐点年利率乘数
    kink_: parseEther("0.8") //应用跳转乘数的利用点 利率模型的拐点 // 拐点资金借出率
}


/**
 * 链币的基本配置
 */
export const marketPlatformToken ={
    symbol : "sETH",
    name : "Savmlend ETH",
    decimals: "18",
    initialExchangeRateMantissa : parseEther("1"),
    reserveFactor : parseEther("0.2"),
    collateralFactor:"0.5",
    price: parseEther("2000"),
    supplySpeeds: parseEther("0.06"),
    borrowSpeeds: parseEther("0.14"),
    supplyCaps: parseEther("0"),
    borrowCaps: parseEther("0")
}

export const marketBtcPlatformToken ={
    symbol : "sBTC",
    name : "Savmlend BTC",
    decimals: "18",
    initialExchangeRateMantissa : parseEther("0.1"),
    reserveFactor : parseEther("0.2"), 
    collateralFactor:"0.8",
    price: parseEther("51966.80"),
    supplySpeeds: parseEther("0"),
    borrowSpeeds: parseEther("0"),
    supplyCaps: parseEther("0"),
    borrowCaps: parseEther("0")
}


//这个在合约里面改
/**
 * 治理币的基本配置
 */
export const governorToken = {
    symbol: "SAVM",
    name : "Savmlend Token",
    decimals : "18",
    totalSupply: parseEther("6540888")
}

/**
 * 治理币包装币的基本信息
 */
export const sSavmlendTokenConfig = {
    name:"Savmlend SAVM",
    symbol:"sSAVM",
    initReserves:"0",
    reserveFactor:parseEther("0.2"),
    initialExchangeRateMantissa: BigNumber.from("1"),
    collateralFactor:"0.5",
    price : parseEther("3.7746"),
    supplySpeeds: parseEther("0"),
    borrowSpeeds: parseEther("0"),
    supplyCaps: parseEther("0"),
    borrowCaps: BigNumber.from("1")
}




// address underlying_,                                     erc20标的资产地址
// ComptrollerInterface comptroller_,                unitroller合约地址
// InterestRateModel interestRateModel_,        JumpRateModelV2合约地址
// uint initialExchangeRateMantissa_,               初始汇率，按 1：1 设置
// string memory name_,                                   cToken 的 name
// string memory symbol_,                                 cToken 的 symbol
// uint8 decimals_,                                             cToken 的 decimals ，设为 8
// address payable admin_,                               应该是时间锁定合约地址，此处设为 msg.sender
// address implementation_,                              CErc20Delegate 合约地址
// bytes memory becomeImplementationData,  额外初始数据，此处填入0x，即无数据
// export const underlying;
// export const comptroller;
// export const interestRateModel;
// export const initialExchangeRateMantissa;
// export const name;
// export const symbol;
// export const decimals;
// export const admin;
// export const implementation;
// export const becomeImplementationData;

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



