// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Auction.sol"; // Import the Auction contract

struct AuctionType {
    address manager; // input
    address newAuction; // created in SC
    string title; // input
    string description; // input
    uint256 maxOffer; // input
    uint256 submissionDeadline; // input
    uint256 startDat; // created in SC
    uint256 endDate; // created in SC
    string status; // open | closed | cancled  - // created/set in SC
}
struct Bidding {
    address auction; // input
    uint256 offer; // input
    string description; // input
    string status; // accepted | declined | cancled - // created/set in SC
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
