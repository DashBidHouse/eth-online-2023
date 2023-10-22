// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Auction.sol'; // Import the Auction contract

contract AuctionFactory {
  event createdAuction(
    address indexed manager,
    address indexed newAuction,
    string title,
    uint256 maxOffer,
    string description,
    uint256 submissionDeadline,
    uint256 startDate,
    uint256 endDate,
    Auction.AuctionStatus status
  );

  uint256 public constant AUCTION_PERIOD = 3600 * 48;

  address[] public deployedAuctions;

  function createAuction(string memory _title, uint256 _maxOffer, string memory _description, uint256 _submissionDeadline) public {
    require(_maxOffer != 0, 'Factory: maxOffer should be bigger than 0');

    address newAuction = address(
      new Auction(msg.sender, _title, _maxOffer, _description, _submissionDeadline, block.timestamp, block.timestamp + AUCTION_PERIOD)
    );
    deployedAuctions.push(newAuction);

    emit createdAuction(
      msg.sender,
      newAuction,
      _title,
      _maxOffer,
      _description,
      _submissionDeadline,
      block.timestamp,
      block.timestamp + AUCTION_PERIOD,
      Auction.AuctionStatus.Opened
    );
  }

  function getDeployedAuctions() public view returns (address[] memory) {
    return deployedAuctions;
  }
}
