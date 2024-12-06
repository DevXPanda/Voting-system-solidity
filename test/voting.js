const { expect } = require("chai");

describe("Voting Contract", function () {
    let Voting;
    let voting;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        Voting = await ethers.getContractFactory("Voting");
        voting = await Voting.deploy();
    });

    it("should allow adding a candidate", async function () {
        await voting.addCandidate("Alice");
        const candidate = await voting.getCandidate(1);
        expect(candidate[0]).to.equal("Alice");
        expect(candidate[1]).to.equal(0);
    });

    it("should allow users to vote", async function () {
        await voting.addCandidate("Alice");
        await voting.connect(addr1).vote(1);
        const candidate = await voting.getCandidate(1);
        expect(candidate[1]).to.equal(1);
    });

    it("should not allow double voting", async function () {
        await voting.addCandidate("Alice");
        await voting.connect(addr1).vote(1);
        await expect(voting.connect(addr1).vote(1)).to.be.revertedWith("You have already voted!");
    });
});
