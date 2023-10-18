const { expect } = require('chai');
const { deployments, ethers } = require('hardhat');

// You can find more details about RedStone oracles here: https://tinyurl.com/redstone-celo-docs

describe('Auction', function () {
  // account
  let owner;
  let alice;
  let bob;
  let quinn;

  // contract
  let auctionFactoryContract;
  let autionContract;

  // Constant
  const MAX_OFFER = 500;
  const SUBMISSION_DEADLINE = 3600 * 24 * 15;

  before(async () => {
    const signers = await ethers.getSigners();
    owner = signers[0];
    alice = signers[1];
    bob = signers[2];
    quinn = signers[3];

    const AuctionFactory = await ethers.getContractFactory('AuctionFactory');
    auctionFactoryContract = await AuctionFactory.deploy();
  });
  describe('Main', async () => {
    it('Create Auction', async () => {
      await auctionFactoryContract.createAuction('Auction1', 'Description', MAX_OFFER, SUBMISSION_DEADLINE, Math.floor(Date.now() / 1000) + 20);
      const deployedAuctions = await auctionFactoryContract.getDeployedAuctions();
      autionContract = await ethers.getContractAt('Auction', deployedAuctions[0]);
    });
    it('Place Bid', async () => {
      await autionContract.connect(alice).placeBid(MAX_OFFER, 'first Bid');
      await expect(autionContract.connect(bob).placeBid(MAX_OFFER, 'second Bid')).to.be.reverted;
      await autionContract.connect(bob).placeBid(MAX_OFFER - 1, 'second Bid');
      expect((await autionContract.maxBidOffer()) === MAX_OFFER - 1).to.be.equal;
    });

    it('Cancel Bid', async () => {
      await autionContract.connect(quinn).placeBid(MAX_OFFER - 3, 'third Bid');
      // Can't bid more than once
      await expect(autionContract.connect(quinn).placeBid(MAX_OFFER - 4, 'third Bid')).to.be.reverted;
      await autionContract.connect(quinn).cancelBid();

      const biddingForAuction = autionContract.biddingForAuction(quinn.address);
      expect(biddingForAuction.status === 3).to.be.equal;
    });

    it('Get Biddings', async () => {
      const bidders = await autionContract.getBidders();
      for (let i = 0; i < bidders.length; i++) {
        let biddingForAuction = await autionContract.biddingForAuction(bidders[i]);
      }
    });

    it('Close Auction', async () => {
      const bidders = await autionContract.getBidders();

      const winner = bidders[bidders.length - 2];
      const winnerBid = await autionContract.biddingForAuction(winner);
      await autionContract.finalizeAuction(winner, winnerBid.offerAmount);

      expect((await autionContract.winningBidder()) === winner).to.be.equal;
      expect((await autionContract.winningBid()) === winnerBid).to.be.equal;
    });
  });
});
