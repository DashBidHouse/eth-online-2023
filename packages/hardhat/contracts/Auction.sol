// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './library/EnumerableSet.sol';

contract Auction {
  using EnumerableSet for EnumerableSet.AddressSet;

  struct AuctionInfo {
    address manager;
    string title;
    string description;
    uint256 maxOffer;
    uint256 submissionDeadline;
    uint256 startDate;
    uint256 endDate;
  }

  struct BidInfo {
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

  AuctionInfo auctionInfo;
  AuctionStatus auctionStatus;

  address public winningBidder;
  uint256 public winningBid;

  EnumerableSet.AddressSet private bidders;
  mapping(address => BidInfo) public biddingByBidder;

  uint256 public maxBidOffer;

  event placedBid(uint256 offer, string description, address indexed auction, address indexed bidder);
  event canceledBid(uint256 offer, string description, address indexed auction, address indexed bidder);
  event finalizedAuction(
    address indexed manager,
    string title,
    string description,
    uint256 maxOffer,
    uint256 endDate,
    address indexed bidder,
    uint256 winningBid
  );
  event canceledAuction(address indexed manager, string title, string description, uint256 maxOffer, uint256 endDate);

  constructor(
    address _manager,
    string memory _title,
    string memory _description,
    uint256 _maxOffer,
    uint256 _submissionDeadline,
    uint256 _startDate,
    uint256 _endDate
  ) {
    auctionInfo = AuctionInfo(_manager, _title, _description, _maxOffer, _submissionDeadline, _startDate, _endDate);
    auctionStatus = AuctionStatus.Opened;
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
      winningBid
    );
  }

  function canelAuction() public onlyManager {
    require(auctionStatus == AuctionStatus.Opened, 'Auction has already been finalized.');

    auctionStatus = AuctionStatus.Canceled;

    emit canceledAuction(auctionInfo.manager, auctionInfo.title, auctionInfo.description, auctionInfo.maxOffer, auctionInfo.endDate);
  }

  function placeBid(uint256 _offer, string memory description) public {
    require(!bidders.contains(msg.sender), 'User has already joined');
    require(auctionStatus == AuctionStatus.Opened && auctionInfo.endDate > block.timestamp, 'Auction has already been finalized.');
    require(maxBidOffer > _offer, 'Offer needs to be smaller than the previous offer');
    require(msg.sender != auctionInfo.manager, "You can't bid on your own auction.");

    biddingByBidder[msg.sender] = BidInfo(_offer, description, BidStatus.Placed);
    maxBidOffer = _offer;
    bidders.add(msg.sender);

    emit placedBid(_offer, description, address(this), msg.sender);
  }

  function cancelBid() public {
    require(auctionStatus == AuctionStatus.Opened && auctionInfo.endDate > block.timestamp, 'Auction has already been finalized.');

    BidInfo storage bidInfo_ = biddingByBidder[msg.sender];
    bidInfo_.status = BidStatus.Canceled;

    emit canceledBid(bidInfo_.offerAmount, bidInfo_.description, address(this), msg.sender);
  }
}
