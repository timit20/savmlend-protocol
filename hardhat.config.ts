import * as dotenv from "dotenv";
dotenv.config();
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";


const config: HardhatUserConfig = {


	defaultNetwork: "localhost",
	networks: {
		localhost: {
			from: "http://127.0.0.1:8545/",
				// mining: {	//	开启自动挖矿
				//   auto: false,
				//   interval: [500, 1000],	//	0.5s - 1s 随机时间创建区块
				// }
		},
		// oke:{
		// 	url:"https://exchaintestrpc.okex.org",
		// 	accounts:[process.env.OKE_PRIVATE_KEY!]
		// },
		// matic:{
		// 	url:"https://polygon-testnet.public.blastapi.io",
		// 	accounts:[process.env.OKE_PRIVATE_KEY!]
		// },
		goerli:{
			url:"https://goerli.infura.io/v3/390127fb7ec84735bb62424ea8da1ea2",
			gas:10000000,
			accounts:[process.env.SEPOLIA_PRIVATE_KEY!]
		},
		sepolia:{
			url:"https://sepolia.infura.io/v3/58332b13700446649123399e84567e07",
			gas:10000000,
			accounts:[process.env.SEPOLIA_PRIVATE_KEY!]
		},
		satoshi_test:{
			url:"107.22.17.178:8545",
			gas:10000000,
			accounts:[process.env.SEPOLIA_PRIVATE_KEY!]
		},
		biturbotestnet:{
		  url:"https://test-rpc.biturbo.io",
		//   gas:10000000,
		  accounts:[process.env.BITRUBO_PRIVATE_KEY!]
		}
	},
	solidity: {
		compilers: [
			{ 
				version: "0.5.16",
				settings:{
					optimizer:{
						enabled: true,
						runs: 200
					}
				}
			},
			{ version: "0.8.10" },
		]
	},
	etherscan: {
		apiKey: {
			// An API key needs to be written as the hardhat-verify plugin will require it, and the verification will fail if it is not provided.
			// The current bitlayer browser has not yet enabled API key verification, so you can write any random string for now.
			biturbotestnet: "U4NRVX2YX3ST4XI3UAM9CFG7MSDW12KFS6"
		},
		customChains: [
			{
			network: "biturbotestnet",
			chainId: 725019,
			urls: {
				apiURL: "https://testnet.biturboscan.io/api",
				browserURL: "https://testnet.biturboscan.io/"
				}
			}
		]
	}
};

export default config;



