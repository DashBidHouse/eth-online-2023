import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { AuctionCreated } from "../generated/AuctionFactory/AuctionFactory"

export function createAuctionCreatedEvent(
  manager: Address,
  newAuction: Address,
  title: string,
  maxOffer: BigInt,
  endDate: BigInt
): AuctionCreated {
  let auctionCreatedEvent = changetype<AuctionCreated>(newMockEvent())

  auctionCreatedEvent.parameters = new Array()

  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("manager", ethereum.Value.fromAddress(manager))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "newAuction",
      ethereum.Value.fromAddress(newAuction)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxOffer",
      ethereum.Value.fromUnsignedBigInt(maxOffer)
    )
  )
  auctionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "endDate",
      ethereum.Value.fromUnsignedBigInt(endDate)
    )
  )

  return auctionCreatedEvent
}
