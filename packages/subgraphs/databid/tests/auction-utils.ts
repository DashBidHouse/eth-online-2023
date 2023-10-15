import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { AuctionFinalized, BidPlaced } from "../generated/Auction/Auction"

export function createAuctionFinalizedEvent(
  manager: Address,
  title: string,
  maxOffer: BigInt,
  endDate: BigInt,
  bidder: Address,
  winningBid: BigInt
): AuctionFinalized {
  let auctionFinalizedEvent = changetype<AuctionFinalized>(newMockEvent())

  auctionFinalizedEvent.parameters = new Array()

  auctionFinalizedEvent.parameters.push(
    new ethereum.EventParam("manager", ethereum.Value.fromAddress(manager))
  )
  auctionFinalizedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  auctionFinalizedEvent.parameters.push(
    new ethereum.EventParam(
      "maxOffer",
      ethereum.Value.fromUnsignedBigInt(maxOffer)
    )
  )
  auctionFinalizedEvent.parameters.push(
    new ethereum.EventParam(
      "endDate",
      ethereum.Value.fromUnsignedBigInt(endDate)
    )
  )
  auctionFinalizedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  auctionFinalizedEvent.parameters.push(
    new ethereum.EventParam(
      "winningBid",
      ethereum.Value.fromUnsignedBigInt(winningBid)
    )
  )

  return auctionFinalizedEvent
}

export function createBidPlacedEvent(
  offer: BigInt,
  bidder: Address
): BidPlaced {
  let bidPlacedEvent = changetype<BidPlaced>(newMockEvent())

  bidPlacedEvent.parameters = new Array()

  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("offer", ethereum.Value.fromUnsignedBigInt(offer))
  )
  bidPlacedEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )

  return bidPlacedEvent
}
