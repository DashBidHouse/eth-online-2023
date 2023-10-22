// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './library/EnumerableSet.sol';

contract Auction {
  using EnumerableSet for EnumerableSet.AddressSet;

  struct AuctionInfo {
    address manager;
    string title;
    uint256 maxOffer;
    string description;
    uint256 submissionDeadline;
    uint256 startDate;
    uint256 endDate;
    AuctionStatus status;
  }

  struct BidInfo {
    address bidder;
    uint256 offerAmount;
    string description;
    BidStatus status;
  }

  enum AuctionStatus {
    Opened,
    Closed,
    Canceled
  }

  enum BidStatus {
    Accepted,
    Declined,
    Placed,
    Canceled
  }

  AuctionInfo public auctionInfo;
  AuctionStatus public auctionStatus;

  address public winningBidder;
  uint256 public winningBid;

  EnumerableSet.AddressSet private bidders;
  mapping(address => BidInfo) public biddingByBidder;

  uint256 public maxBidOffer;

  event finalizedAuction(
    address indexed manager,
    string title,
    string description,
    uint256 maxOffer,
    uint256 endDate,
    address indexed bidder,
    uint256 winningBid,
    AuctionStatus status
  );
  event canceledAuction(address indexed manager, string title, string description, uint256 maxOffer, uint256 endDate, AuctionStatus status);
  event placedBid(uint256 offer, string description, address indexed auction, address indexed bidder, BidStatus status);
  event canceledBid(uint256 offer, string description, address indexed auction, address indexed bidder, BidStatus status);

  constructor(
    address _manager,
    string memory _title,
    uint256 _maxOffer,
    string memory _description,
    uint256 _submissionDeadline,
    uint256 _startDate,
    uint256 _endDate
  ) {
    auctionStatus = AuctionStatus.Opened;
    auctionInfo = AuctionInfo(_manager, _title, _maxOffer, _description, _submissionDeadline, _startDate, _endDate, auctionStatus);
    maxBidOffer = _maxOffer + 1;
  }

  modifier onlyManager() {
    require(auctionInfo.manager == msg.sender, 'Caller is not manager');
    _;
  }

  function getBidders() external view returns (address[] memory) {
    return bidders.values();
  }

  function finalizeAuction(address _winningBidder, uint256 _winningBid) public onlyManager {
    require(auctionStatus == AuctionStatus.Opened, 'Auction has already been finalized');
    require(biddingByBidder[_winningBidder].status != BidStatus.Canceled, 'Bid has already been canceled');

    winningBidder = _winningBidder;
    winningBid = _winningBid;

    // TODO: add logic for payment transfer. Blocked by finalization of WorkContract.sol

    biddingByBidder[winningBidder].status = BidStatus.Accepted;
    auctionStatus = AuctionStatus.Closed;
    emit finalizedAuction(
      auctionInfo.manager,
      auctionInfo.title,
      auctionInfo.description,
      auctionInfo.maxOffer,
      auctionInfo.endDate,
      winningBidder,
      winningBid,
      auctionStatus
    );
  }

  function cancelAuction() public onlyManager {
    require(auctionStatus == AuctionStatus.Opened, 'Auction has already been finalized.');

    auctionStatus = AuctionStatus.Canceled;

    emit canceledAuction(auctionInfo.manager, auctionInfo.title, auctionInfo.description, auctionInfo.maxOffer, auctionInfo.endDate, auctionStatus);
  }

  function placeBid(uint256 _offer, string memory description) public {
    require(!bidders.contains(msg.sender), 'User has already joined');
    require(auctionStatus == AuctionStatus.Opened && auctionInfo.endDate > block.timestamp, 'Auction has already been finalized.');
    require(maxBidOffer > _offer, 'Offer needs to be smaller than the previous offer');
    require(msg.sender != auctionInfo.manager, "You can't bid on your own auction.");

    BidInfo memory bid = BidInfo(msg.sender, _offer, description, BidStatus.Placed);
    biddingByBidder[msg.sender] = bid;
    maxBidOffer = _offer;
    bidders.add(msg.sender);

    emit placedBid(_offer, description, address(this), msg.sender, BidStatus.Placed);
  }

  function cancelBid() public {
    require(auctionStatus == AuctionStatus.Opened && auctionInfo.endDate > block.timestamp, 'Auction has already been finalized.');

    biddingByBidder[msg.sender].status = BidStatus.Canceled;
    BidInfo storage bidInfo_ = biddingByBidder[msg.sender];

    emit canceledBid(bidInfo_.offerAmount, bidInfo_.description, address(this), msg.sender, BidStatus.Canceled);
  }
}
