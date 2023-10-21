import {
  finalizedAuction,
  canceledAuction,
  placedBid,
  canceledBid,
} from "../generated/Auction/Auction";
import {
  FinalizeAuction,
  CancelAuction,
  PlaceBid,
  CancelBid,
} from "../generated/schema";

export function handleFinalizedAuction(event: finalizedAuction): void {
  let auction = new FinalizeAuction(event.params.manager.toHexString());
  auction.manager = event.params.manager;
  auction.title = event.params.title;
  auction.maxOffer = event.params.maxOffer;
  auction.description = event.params.description;
  auction.endDate = event.params.endDate;
  auction.bidder = event.params.bidder;
  auction.winningBid = event.params.winningBid;
  auction.status = event.params.status;
  auction.save();
}

export function handleCanceledAuction(event: canceledAuction): void {
  let auction = new CancelAuction(event.params.manager.toHexString());
  auction.manager = event.params.manager;
  auction.title = event.params.title;
  auction.maxOffer = event.params.maxOffer;
  auction.description = event.params.description;
  auction.endDate = event.params.endDate;
  auction.status = event.params.status;
  auction.save();
}

export function handlePlacedBid(event: placedBid): void {
  let bid = new PlaceBid(event.params.bidder.toHexString());
  bid.offer = event.params.offer;
  bid.auction = event.params.auction;
  bid.description = event.params.description;
  bid.bidder = event.params.bidder;
  bid.status = event.params.status;
  bid.save();
}

export function handleCanceledBid(event: canceledBid): void {
  let bid = new CancelBid(event.params.bidder.toHexString());
  bid.offer = event.params.offer;
  bid.auction = event.params.auction;
  bid.description = event.params.description;
  bid.bidder = event.params.bidder;
  bid.status = event.params.status;
  bid.save();
}
