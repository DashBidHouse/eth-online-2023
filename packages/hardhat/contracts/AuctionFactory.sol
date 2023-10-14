// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Auction.sol"; // Import the Auction contract

contract AuctionFactory {
    address[] public deployedAuctions;

    event AuctionCreated(
        address indexed manager,
        address indexed newAuction,
        string title,
        uint256 maxOffer,
        uint256 endDate
    );

    function createAuction(
        string memory title,
        uint256 maxOffer,
        uint256 endDate
    ) public {
        address newAuction = address(
            new Auction(msg.sender, title, maxOffer, endDate)
        );
        deployedAuctions.push(newAuction);

        emit AuctionCreated(msg.sender, newAuction, title, maxOffer, endDate);
    }

    function getDeployedAuctions() public view returns (address[] memory) {
        return deployedAuctions;
    }
}
