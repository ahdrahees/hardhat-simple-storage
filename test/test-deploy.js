const { ethers } = require("hardhat");
const { expect, assert } = require("chai");

// describe("SimpleStorage", () => {});
describe("SimpleStorage", function () {
    let SimpleStorageFactory, simpleStorage;

    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await SimpleStorageFactory.deploy();
    });

    it("Should start with a favorite numberof 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue);
        //expect(currentValue.toString()).to.equal(expectedValue);        // same as above with assert
    });

    it("Should Update when we call store", async function () {
        const expectedValue = "8";
        const transactionResponse = await simpleStorage.store(8);
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });
});
