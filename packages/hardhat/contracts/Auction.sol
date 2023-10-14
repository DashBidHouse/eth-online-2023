// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction {
    address public manager;
    string public title;
    uint256 public maxOffer;
    uint256 public endDate;

    address public winningBidder;
    uint256 public winningBid;
    bool public isFinalized;

    // bidder => offer
    mapping(address => uint256) public bids;

    event BidPlaced(uint256 offer, address indexed bidder);

    event AuctionFinalized(
        address indexed manager,
        string title,
        uint256 maxOffer,
        uint256 endDate,
        address indexed bidder,
        uint256 winningBid
    );

    constructor(
        address _manager,
        string memory _title,
        uint256 _maxOffer,
        uint256 _endDate
    ) {
        manager = _manager;
        title = _title;
        maxOffer = _maxOffer;
        endDate = _endDate;
    }

    function placeBid(uint256 _offer) public payable {
        // require(block.timestamp < endDate, "Auction has ended.");
        // require(msg.value <= _offer, "Bid amount must match the offer.");

        // Additional bid validation logic if needed
        bids[msg.sender] = _offer;
        emit BidPlaced(_offer, msg.sender);
    }

    function finalizeAuction(
        address _winningBidder,
        uint256 _winningBid
    ) public {
        require(!isFinalized, "Auction has already been finalized.");
        // require(block.timestamp >= endDate, "Auction is still active.");
        require(
            msg.sender == manager,
            "Only the manager can finalize the auction."
        );

        winningBidder = _winningBidder;
        winningBid = _winningBid;

        // Perform finalization actions, e.g., transfer assets to the winner.

        // Capture information about the finalization
        emit AuctionFinalized(
            manager,
            title,
            maxOffer,
            endDate,
            winningBidder,
            winningBid
        );

        isFinalized = true;
    }
}
