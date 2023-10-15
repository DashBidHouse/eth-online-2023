import {
  AuctionFinalized as AuctionFinalizedEvent,
  BidPlaced as BidPlacedEvent
} from "../generated/Auction/Auction"
import { AuctionFinalized, BidPlaced } from "../generated/schema"

export function handleAuctionFinalized(event: AuctionFinalizedEvent): void {
  let entity = new AuctionFinalized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.manager = event.params.manager
  entity.title = event.params.title
  entity.maxOffer = event.params.maxOffer
  entity.endDate = event.params.endDate
  entity.bidder = event.params.bidder
  entity.winningBid = event.params.winningBid

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBidPlaced(event: BidPlacedEvent): void {
  let entity = new BidPlaced(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.offer = event.params.offer
  entity.bidder = event.params.bidder

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
