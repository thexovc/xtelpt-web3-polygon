const { ethers } = require("hardhat")
const { utils } = require("mocha")

async function xleptFunc() {
    let xtelpt, xtelptContract, owner, account

    const accounts = await ethers.getSigners() // could also do with getNamedAccounts
    owner = accounts[0].address
    account = accounts[1].address
    xtelptContract = await ethers.getContractFactory("XTELPT")
    xtelpt = await xtelptContract.deploy()
    await xtelpt.deployed()

    await xtelpt.createHost(0, "Osas", "jsjs", "Great man", "Scientist")

    await xtelpt.createSchedule(334, 747, 1, "sjjd")

    await xtelpt.createUser(0, "Daniel", "jsjs", "I will be great")

    const join = await xtelpt.joinMeeting(owner, 0)

    console.log(join)

    const meeting = await xtelpt.getMeeting(owner)

    console.log("meeting:", meeting);
}

xleptFunc()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
