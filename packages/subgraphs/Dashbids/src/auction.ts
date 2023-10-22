import {
  canceledAuction as canceledAuctionEvent,
  canceledBid as canceledBidEvent,
  finalizedAuction as finalizedAuctionEvent,
  placedBid as placedBidEvent
} from "../generated/Auction/Auction"
import {
  canceledAuction,
  canceledBid,
  finalizedAuction,
  placedBid
} from "../generated/schema"

export function handlecanceledAuction(event: canceledAuctionEvent): void {
  let entity = new canceledAuction(
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

export function handlecanceledBid(event: canceledBidEvent): void {
  let entity = new canceledBid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.offer = event.params.offer
  entity.auction = event.params.auction
  entity.bidder = event.params.bidder

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlefinalizedAuction(event: finalizedAuctionEvent): void {
  let entity = new finalizedAuction(
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

export function handleplacedBid(event: placedBidEvent): void {
  let entity = new placedBid(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.offer = event.params.offer
  entity.description = event.params.description
  entity.auction = event.params.auction
  entity.bidder = event.params.bidder

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
