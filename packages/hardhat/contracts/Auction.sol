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

  struct BidInfo {
    uint256 offerAmount; 
    string description; 
    BidStatus status; 
  }

  AuctionInfo auctionInfo;
  AuctionStatus auctionStatus;

  address public winningBidder;
  uint256 public winningBid;

  EnumerableSet.AddressSet private bidders;
  mapping(address => BidInfo) public biddingForAuction;

  uint256 public maxBidOffer;

  event BidPlaced(uint256 offer, string description, address indexed bidder);
  event BidCanceled(uint256 offer, address indexed bidder);
  event AuctionFinalized(address indexed manager, string title, uint256 maxOffer, uint256 endDate, address indexed bidder, uint256 winningBid);
  event AuctionCanceled(address indexed manager, string title, uint256 maxOffer, uint256 endDate, address indexed bidder, uint256 winningBid);

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
    require(biddingForAuction[_winningBidder].status != BidStatus.Canceled, 'Canceled Bid');
    
    winningBidder = _winningBidder;
    winningBid = _winningBid;

    // TODO: add logic for payment transfer. Blocked by finalization of WorkContract.sol

    biddingForAuction[winningBidder].status = BidStatus.Accepted;
    auctionStatus = AuctionStatus.Closed;
    emit AuctionFinalized(auctionInfo.manager, auctionInfo.title, auctionInfo.maxOffer, auctionInfo.endDate, winningBidder, winningBid);
  }

  function canelAuction() public onlyManager {
    require(auctionStatus == AuctionStatus.Opened, 'Auction has already been finalized.');
    
    auctionStatus = AuctionStatus.Canceled;

    emit AuctionCanceled(auctionInfo.manager, auctionInfo.title, auctionInfo.maxOffer, auctionInfo.endDate, winningBidder, winningBid);
  }

  function placeBid(uint256 _offer, string memory description) public {
    require(!bidders.contains(msg.sender), 'Already joined');
    require(auctionStatus == AuctionStatus.Opened && auctionInfo.endDate > block.timestamp, 'Auction has already been finalized.');
    require(maxBidOffer > _offer, 'Offer should smaller than prev offer');
    require(msg.sender != auctionInfo.manager, "You can't bid on your own auction.");

    biddingForAuction[msg.sender] = BidInfo(_offer, description, BidStatus.Placed);
    maxBidOffer = _offer;
    bidders.add(msg.sender);

    emit BidPlaced(_offer, description, msg.sender);
  }

  function cancelBid() public {
    require(auctionStatus == AuctionStatus.Opened && auctionInfo.endDate > block.timestamp, 'Auction has already been finalized.');
    
    BidInfo storage bidInfo_ = biddingForAuction[msg.sender];
    bidInfo_.status = BidStatus.Canceled;

    emit BidCanceled(bidInfo_.offerAmount, msg.sender);
  }
}
