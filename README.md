# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a contract that contain `store()` which store any natural in ethereum, `retrieve()` to get store number, `addPerson` which store name and a number in a sruct array and a mapping.
A test for that contract, a script that deploys that contract, and some tasks are implemented which are `block-number` to print the current block number, `confirmation` to print the block confirmations, `gas-used` the print the gas used for the transaction, and `fee-data` to print the current recommended FeeData to use in a transaction in both wei and gwei unit.

Try running some of the following tasks:

```shell
yarn hardhat help
yarn hardhat test
REPORT_GAS=true npx hardhat test
yarn hardhat node
yarn hardhat run scripts/deploy.js
yarn hardhat <task_name>
```
