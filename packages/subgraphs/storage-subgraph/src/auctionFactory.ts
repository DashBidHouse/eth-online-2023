import { Auction } from "../generated/Auction/Auction";
import { createdAuction } from "../generated/AuctionFactory/AuctionFactory";
import { CreateAuction } from "../generated/schema";

export function handleCreatedAuction(event: createdAuction): void {
  let auction = CreateAuction.load(event.params.newAuction.toHexString());
  if (!auction) {
    auction = new CreateAuction(event.params.newAuction.toHexString());
    auction.manager = event.params.manager;
    auction.title = event.params.title;
    auction.maxOffer = event.params.maxOffer;
    auction.description = event.params.description;
    auction.submissionDeadline = event.params.submissionDeadline;
    auction.startDate = event.params.startDate;
    auction.endDate = event.params.endDate;
    auction.status = event.params.status;
  }
  auction.save();
}
