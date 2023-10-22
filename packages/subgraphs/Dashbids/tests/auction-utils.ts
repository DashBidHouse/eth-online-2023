import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  canceledAuction,
  canceledBid,
  finalizedAuction,
  placedBid
} from "../generated/Auction/Auction"

export function createcanceledAuctionEvent(
  manager: Address,
  title: string,
  maxOffer: BigInt,
  endDate: BigInt,
  bidder: Address,
  winningBid: BigInt
): canceledAuction {
  let canceledAuctionEvent = changetype<canceledAuction>(newMockEvent())

  canceledAuctionEvent.parameters = new Array()

  canceledAuctionEvent.parameters.push(
    new ethereum.EventParam("manager", ethereum.Value.fromAddress(manager))
  )
  canceledAuctionEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  canceledAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "maxOffer",
      ethereum.Value.fromUnsignedBigInt(maxOffer)
    )
  )
  canceledAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "endDate",
      ethereum.Value.fromUnsignedBigInt(endDate)
    )
  )
  canceledAuctionEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  canceledAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "winningBid",
      ethereum.Value.fromUnsignedBigInt(winningBid)
    )
  )

  return canceledAuctionEvent
}

export function createcanceledBidEvent(
  offer: BigInt,
  auction: Address,
  bidder: Address
): canceledBid {
  let canceledBidEvent = changetype<canceledBid>(newMockEvent())

  canceledBidEvent.parameters = new Array()

  canceledBidEvent.parameters.push(
    new ethereum.EventParam("offer", ethereum.Value.fromUnsignedBigInt(offer))
  )
  canceledBidEvent.parameters.push(
    new ethereum.EventParam("auction", ethereum.Value.fromAddress(auction))
  )
  canceledBidEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )

  return canceledBidEvent
}

export function createfinalizedAuctionEvent(
  manager: Address,
  title: string,
  maxOffer: BigInt,
  endDate: BigInt,
  bidder: Address,
  winningBid: BigInt
): finalizedAuction {
  let finalizedAuctionEvent = changetype<finalizedAuction>(newMockEvent())

  finalizedAuctionEvent.parameters = new Array()

  finalizedAuctionEvent.parameters.push(
    new ethereum.EventParam("manager", ethereum.Value.fromAddress(manager))
  )
  finalizedAuctionEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  finalizedAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "maxOffer",
      ethereum.Value.fromUnsignedBigInt(maxOffer)
    )
  )
  finalizedAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "endDate",
      ethereum.Value.fromUnsignedBigInt(endDate)
    )
  )
  finalizedAuctionEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )
  finalizedAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "winningBid",
      ethereum.Value.fromUnsignedBigInt(winningBid)
    )
  )

  return finalizedAuctionEvent
}

export function createplacedBidEvent(
  offer: BigInt,
  description: string,
  auction: Address,
  bidder: Address
): placedBid {
  let placedBidEvent = changetype<placedBid>(newMockEvent())

  placedBidEvent.parameters = new Array()

  placedBidEvent.parameters.push(
    new ethereum.EventParam("offer", ethereum.Value.fromUnsignedBigInt(offer))
  )
  placedBidEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  placedBidEvent.parameters.push(
    new ethereum.EventParam("auction", ethereum.Value.fromAddress(auction))
  )
  placedBidEvent.parameters.push(
    new ethereum.EventParam("bidder", ethereum.Value.fromAddress(bidder))
  )

  return placedBidEvent
}
