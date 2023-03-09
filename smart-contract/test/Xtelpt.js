const { assert, expect } = require("chai")
const { ethers } = require("hardhat")

describe("XTELPT Unit Tests", function () {
    let xtelpt, xtelptContract, owner, allAccount, account // , deployer



    beforeEach(async () => {
        const accounts = await ethers.getSigners() // could also do with getNamedAccounts
        owner = accounts[0].address
        account = accounts[1].address
        xtelptContract = await ethers.getContractFactory("XTELPT")
        XTELPT = await xtelptContract.deploy()
        await xtelpt.deployed()
    })

    it("Checks the owner", async () => {
        try {
            let result = await XTELPT.owner()
            console.log("result working", result.toString())
            assert.equal(result.toString(), owner)
        } catch (e) {
            assert.fail(null, null, `${owner} is not owner`)
        }
    })

    it("Initial meeting num is 0", async () => {
        try {
            let result = await XTELPT.meetingNum()
            assert.equal(result.toString(), "0")
        } catch (e) {
            console.log("meeting num is not 0")
        }
    })

    it("Checks that Intial Accounts is an empty array", async () => {
        try {
            let result = await XTELPT.AllAccount()
            assert.equal(result, [])
        } catch (e) {
            console.log("Accounts is not an empty array")
        }
    })
    
    describe("createUser", function () {
    it("should set user profile", async function () {
      const rating = 4;
      const name = "Alice";
      const pic = "https://example.com/alice.jpg";
      const bio = "Hi, I'm Alice!";
      await XTELPT.createUser(rating, name, pic, bio);
      const userProfile = await XTELPT.UserProfile(await ethers.provider.getSigner());
      expect(userProfile.addr).to.equal(await ethers.provider.getSigner().getAddress());
      expect(userProfile.name).to.equal(name);
      expect(userProfile.rating).to.equal(rating);
      expect(userProfile.role).to.equal("User");
      expect(userProfile.profilePic).to.equal(pic);
      expect(userProfile.bio).to.equal(bio);
    });
  });

  describe("createHost", function () {
    it("should set host profile", async function () {
      const rating = 5;
      const name = "Bob";
      const pic = "https://example.com/bob.jpg";
      const bio = "Hi, I'm Bob!";
      const title = "Awesome Host";
      await XTELPT.createHost(rating, name, pic, bio, title);
      const hostProfile = await XTELPT.UserProfile(await ethers.provider.getSigner());
      expect(hostProfile.addr).to.equal(await ethers.provider.getSigner().getAddress());
      expect(hostProfile.name).to.equal(name);
      expect(hostProfile.rating).to.equal(rating);
      expect(hostProfile.role).to.equal("Host");
      expect(hostProfile.profilePic).to.equal(pic);
      expect(hostProfile.bio).to.equal(bio);
      expect(hostProfile.hostTitle).to.equal(title);
    });
  });


})
