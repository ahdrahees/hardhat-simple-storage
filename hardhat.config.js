require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("./tasks/block-number");
require("./tasks/transaction");
require("hardhat-gas-reporter");
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */

const GOERLI_RPC_URL =
    process.env.GOERLI_RPC_URL || "https://eth-georli/example";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "0xkey";
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "key";
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || "key";

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
        },
        localhost: {
            url: "http://127.0.0.1:8545/",
            // accounts hardhat automaticaly place
            chainId: 31337,
        },
    },
    solidity: "0.8.7",
    etherscan: {
        apiKey: ETHERSCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        outputFile: "gas-report.txt",
        noColors: true,
        currency: "USD",
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: "ETH",
    },
};

/////////////////////////////// task section /////////////////////////////////
task(
    "fee-data",
    "Print the current recommended FeeData to use in a transaction"
).setAction(async (taskArgs, hre) => {
    // The gas price (in wei)...
    const feeData = await hre.ethers.provider.getFeeData();
    console.log(`The maximum Fee per Gas ${feeData.maxFeePerGas} wei`);

    // ...often these values are easier to understand or
    // display to the user in gwei
    console.log(
        `The maximum Fee per Gas ${hre.ethers.utils.formatUnits(
            feeData.maxFeePerGas,
            "gwei"
        )} gwei`
    );
});
