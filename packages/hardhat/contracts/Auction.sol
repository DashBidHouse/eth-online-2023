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

    event BidPlaced(uint256 offer, string description, address indexed bidder);
    event BidCancled(uint256 offer, address indexed bidder);

    event AuctionFinalized(
        address indexed manager,
        string title,
        uint256 maxOffer,
        uint256 endDate,
        address indexed bidder,
        uint256 winningBid
    );

    event AuctionCancled(
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

    function finalizeAuction(
        address _winningBidder,
        uint256 _winningBid
    ) public payable {
        require(!isFinalized, "Auction has already been finalized.");
        // require(block.timestamp >= endDate, "Auction is still active.");
        require(
            msg.sender == manager,
            "Only the manager can finalize the auction."
        );

        winningBidder = _winningBidder;
        winningBid = _winningBid;

        // Perform finalization actions, e.g., transfer assets to the winner.
        // manager has to deposit the funds into the conttract - amount = _winningBid
        // status of all Biddings has to be set to declined except the choosen one
        // all deposits of all people that places a bid is being returned IMPORTANT
        // set auction status to closed

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

    function canelAuction(address _winningBidder, uint256 _winningBid) public {
        require(!isFinalized, "Auction has already been finalized.");
        // require(block.timestamp >= endDate, "Auction is still active.");
        require(
            msg.sender == manager,
            "Only the manager can finalize the auction."
        );

        // all deposits of all people that places a bid is being returned IMPORTANT
        // status of Auction is set to canceled

        emit AuctionCancled(
            manager,
            title,
            maxOffer,
            endDate,
            winningBidder,
            winningBid
        );

        isFinalized = true;
    }

    function placeBid(
        uint256 _offer,
        string memory description
    ) public payable {
        // require(block.timestamp < endDate, "Auction has ended.");
        // require(msg.value <= _offer, "Bid amount must match the offer.");
        // require(msg.sender != manager, "You can't bid on your own auction.");

        // transfer tokens to the contract from bidder amount ==  offer
        // add bid to the biddingForAuction mapping
        // add bid to the auction

        bids[msg.sender] = _offer;
        emit BidPlaced(_offer, description, msg.sender);
    }

    function cancelBid(uint256 _offer) public payable {
        // require(block.timestamp < endDate, "Auction has ended.");
        // require(msg.value <= _offer, "Bid amount must match the offer.");

        // set bid status to cancled
        // return deposit

        bids[msg.sender] = _offer;
        emit BidCancled(_offer, msg.sender);
    }
}
