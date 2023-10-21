import { createdAuction } from "../generated/AuctionFactory/AuctionFactory";
import { CreateAuction } from "../generated/schema";

export function handleAuctionCreated(event: createdAuction): void {
  let auction = CreateAuction.load(event.params.newAuction.toHexString());
  if (!auction) {
    auction = new CreateAuction(event.params.newAuction.toHexString());
    auction.manager = event.params.manager;
    auction.newAuction = event.params.newAuction;
    auction.title = event.params.title;
    auction.description = event.params.description;
    auction.maxOffer = event.params.maxOffer;
    auction.submissionDeadline = event.params.submissionDeadline;
    auction.startDate = event.params.startDate;
    auction.endDate = event.params.endDate;
  }
  auction.save();
}
