// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Auction.sol"; // Import the Auction contract

struct AuctionType {
    address manager;
    address newAuction;
    string title;
    string description;
    uint256 maxOffer;
    uint256 submissionDeadline;
    uint256 startDat;
    uint256 endDate;
    string status; // open | closed | cancled
}
struct Bidding {
    address auction;
    uint256 offer;
    string description;
    string status; // accepted | declined | cancled
}

contract AuctionFactory {
    address[] public deployedAuctions;

    // auction address => Bidding list
    mapping(address => Bidding[]) public biddingForAuction;

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

        // add start time: Auction should end after 48 hours
        // add end time for auction
        // set status to open - after 48 hours it hould automatically be set to closed

        emit AuctionCreated(msg.sender, newAuction, title, maxOffer, endDate);
    }

    function getDeployedAuctions() public view returns (address[] memory) {
        return deployedAuctions;
    }
}
