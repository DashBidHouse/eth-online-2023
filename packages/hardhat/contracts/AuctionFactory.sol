// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Auction.sol'; // Import the Auction contract

contract AuctionFactory {
  uint256 public constant AUCTION_PERIOD = 3600 * 48;

  address[] public deployedAuctions;

  event createdAuction(
    address indexed manager,
    address indexed newAuction,
    string title,
    uint256 maxOffer,
    uint256 submissionDeadline,
    uint256 startDate,
    uint256 endDate
  );

  function createAuction(string memory title, string memory description, uint256 maxOffer, uint256 submissionDeadline, uint256 startDate) public {
    require(maxOffer != 0, 'Factory: maxOffer should be bigger than 0');
    require(startDate > block.timestamp, 'Factory: Start Date needs to be in the future');

    address newAuction = address(new Auction(msg.sender, title, description, maxOffer, submissionDeadline, startDate, startDate + AUCTION_PERIOD));
    deployedAuctions.push(newAuction);

    emit createdAuction(msg.sender, newAuction, title, maxOffer, submissionDeadline, startDate, startDate + AUCTION_PERIOD);
  }

  function getDeployedAuctions() public view returns (address[] memory) {
    return deployedAuctions;
  }
}
