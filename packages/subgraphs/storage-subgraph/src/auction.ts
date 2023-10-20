import {
  finalizedAuction,
  canceledAuction,
  placedBid,
  canceledBid,
} from "../generated/Auction/Auction";
import {
  AuctionFinalize,
  AuctionCancel,
  BidPlace,
  BidCancel,
} from "../generated/schema";

export function handleAuctionFinalized(event: finalizedAuction): void {
  let auction = new AuctionFinalize(event.params.manager.toHexString());
  auction.manager = event.params.manager;
  auction.title = event.params.title;
  auction.maxOffer = event.params.maxOffer;
  auction.endDate = event.params.endDate;
  auction.bidder = event.params.bidder;
  auction.winningBid = event.params.winningBid;
  auction.save();
}

export function handleAuctionCanceled(event: canceledAuction): void {
  let auction = new AuctionCancel(event.params.manager.toHexString());
  auction.manager = event.params.manager;
  auction.title = event.params.title;
  auction.maxOffer = event.params.maxOffer;
  auction.endDate = event.params.endDate;
  auction.bidder = event.params.bidder;
  auction.winningBid = event.params.winningBid;
  auction.save();
}

export function handleBidPlaced(event: placedBid): void {
  let auction = new BidPlace(event.params.bidder.toHexString());
  auction.offer = event.params.offer;
  auction.description = event.params.description;
  auction.bidder = event.params.bidder;
  auction.save();
}

export function handleBidCanceled(event: canceledBid): void {
  let auction = new BidCancel(event.params.bidder.toHexString());
  auction.offer = event.params.offer;
  auction.bidder = event.params.bidder;
  auction.save();
}
