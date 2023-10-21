// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './Auction.sol'; // Import the Auction contract

contract AuctionFactory {
  uint256 public constant AUCTION_PERIOD = 3600 * 48;

  address[] public deployedAuctions;

  function createAuction(string memory title, uint256 maxOffer, string memory description, uint256 submissionDeadline) public {
    require(maxOffer != 0, 'Factory: maxOffer should be bigger than 0');

    address newAuction = address(
      new Auction(msg.sender, title, maxOffer, description, submissionDeadline, block.timestamp, block.timestamp + AUCTION_PERIOD)
    );
    deployedAuctions.push(newAuction);
  }

  function getDeployedAuctions() public view returns (address[] memory) {
    return deployedAuctions;
  }
}
