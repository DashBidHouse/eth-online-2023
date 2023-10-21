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
  let auctionContract;

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
      await auctionFactoryContract.createAuction('Auction1', MAX_OFFER, 'Description', SUBMISSION_DEADLINE);
      const deployedAuctions = await auctionFactoryContract.getDeployedAuctions();
      auctionContract = await ethers.getContractAt('Auction', deployedAuctions[0]);
    });
    it('Place Bid', async () => {
      await auctionContract.connect(alice).placeBid(MAX_OFFER, 'first Bid');
      // if the bidding amount is equal or higher it should fail
      await expect(auctionContract.connect(bob).placeBid(MAX_OFFER, 'second Bid')).to.be.reverted;

      // if the bidding amount is lower it should succeed
      await auctionContract.connect(bob).placeBid(MAX_OFFER - 1, 'second Bid');
      expect((await auctionContract.maxBidOffer()) === MAX_OFFER - 1).to.be.equal;

      // Bidder should not be able to place more than one bid
      await expect(auctionContract.connect(bob).placeBid(MAX_OFFER - 2, 'third Bid')).to.be.reverted;
    });

    it('Cancel Bid', async () => {
      await auctionContract.connect(quinn).placeBid(MAX_OFFER - 3, 'fourth Bid');
      await auctionContract.connect(quinn).cancelBid();

      const biddingForAuction = auctionContract.biddingByBidder(quinn.address);
      expect(biddingForAuction.status === 3).to.be.equal;
    });

    it('Get Biddings', async () => {
      const bidders = await auctionContract.getBidders();
      for (let i = 0; i < bidders.length; i++) {
        let biddingByBidder = await auctionContract.biddingByBidder(bidders[i]);
      }
    });

    it('Close Auction', async () => {
      const bidders = await auctionContract.getBidders();

      const winner = bidders[bidders.length - 2];
      const winnerBid = await auctionContract.biddingByBidder(winner);
      await auctionContract.finalizeAuction(winner, winnerBid.offerAmount);

      expect(await auctionContract.winningBidder()).to.equal(winner);
      expect(await auctionContract.winningBid()).to.equal(winnerBid.offerAmount);
    });
  });
});
