const { task } = require("hardhat/config");

///////////////////////////////////////////////////////////////

task("confirmation", "Print the block confirmations")
    .addParam("hash", "The hash of the transaction")
    .setAction(async (taskArgs, hre) => {
        const transactionReceipt =
            await hre.ethers.provider.getTransactionReceipt(taskArgs.hash);
        console.log(
            `The Block Confirmations is : ${transactionReceipt["confirmations"]}`
        );
    });

module.exports = {};

////////////////////////////////////////////////////////////////

task("gas-used", "Print the gas used for the transaction")
    .addOptionalParam("hash", "The hash of the transaction")
    .setAction(async ({ hash }, hre) => {
        const transactionReceipt =
            await hre.ethers.provider.getTransactionReceipt(hash);
        console.log(`The Gas Usage by Txn: ${transactionReceipt["gasUsed"]}`);
    });

module.exports = {};

////////////////////////////////////////////////////////////////
