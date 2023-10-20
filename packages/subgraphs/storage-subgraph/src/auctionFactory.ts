import {
  AuctionCreated,
  AuctionFactory,
} from "../generated/AuctionFactory/AuctionFactory";
import { AuctionCreate } from "../generated/schema";

export function handleAuctionCreated(event: AuctionCreated): void {
  let auction = AuctionCreate.load(event.params.newAuction.toHexString());
  if (!auction) {
    auction = new AuctionCreate(event.params.newAuction.toHexString());
    auction.manager = event.params.manager;
    auction.newAuction = event.params.newAuction;
    auction.title = event.params.title;
    auction.maxOffer = event.params.maxOffer;
    auction.submissionDeadline = event.params.submissionDeadline;
    auction.startDate = event.params.startDate;
    auction.endDate = event.params.endDate;
  }
  auction.save();
}
