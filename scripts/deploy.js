//import
const { ethers, run, network } = require("hardhat"); // hardhat has inbuilt plugin of ethers.js library

//async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying contract...");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    // rpc url
    //private key
    console.log(`Deployed contract to: ${simpleStorage.address}`);

    console.log(`Txn Hash: ${simpleStorage.deployTransaction.hash}`);

    // Verifying contract by calling verify() . only work on testnet
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block confirmations...");
        await simpleStorage.deployTransaction.wait(6);
        await verify(simpleStorage.address, []);
    }
    // Changing the value of favorite number
    const currentValue = await simpleStorage.retrieve();
    console.log(`Current Favorite Number is ${currentValue}`);
    const transactionResponse = await simpleStorage.store(8);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log(`Updated Favorite Number is ${updatedValue}`);
}

async function verify(contractAddresss, args) {
    console.log("Verifying contract...");
    try {
        await run("verify:verify", {
            address: contractAddresss,
            constructorArguments: args,
        });
    } catch (error) {
        if (error.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!");
        } else {
            console.log(error);
        }
    }
}

//main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

// Txn Hash: 0x5d50ed9aea25bf0518fcb79232921f8f5906db8c793cee5ec7edc85cfe492456
