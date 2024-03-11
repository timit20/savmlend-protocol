//  local network
npx hardhat run scripts/deploy.ts
//  mainnet or testnet  
npx hardhat run scripts/deploy.ts --network oke
npx hardhat run scripts/compLensDeploy.ts --network goerli
npx hardhat run scripts/tokenDeploy.ts --network satoshi_test