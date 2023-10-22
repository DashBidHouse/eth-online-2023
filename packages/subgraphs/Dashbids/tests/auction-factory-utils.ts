import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { createdAuction } from "../generated/AuctionFactory/AuctionFactory"

export function createcreatedAuctionEvent(
  manager: Address,
  newAuction: Address,
  title: string,
  maxOffer: BigInt,
  submissionDeadline: BigInt,
  startDate: BigInt,
  endDate: BigInt
): createdAuction {
  let createdAuctionEvent = changetype<createdAuction>(newMockEvent())

  createdAuctionEvent.parameters = new Array()

  createdAuctionEvent.parameters.push(
    new ethereum.EventParam("manager", ethereum.Value.fromAddress(manager))
  )
  createdAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "newAuction",
      ethereum.Value.fromAddress(newAuction)
    )
  )
  createdAuctionEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  createdAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "maxOffer",
      ethereum.Value.fromUnsignedBigInt(maxOffer)
    )
  )
  createdAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "submissionDeadline",
      ethereum.Value.fromUnsignedBigInt(submissionDeadline)
    )
  )
  createdAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "startDate",
      ethereum.Value.fromUnsignedBigInt(startDate)
    )
  )
  createdAuctionEvent.parameters.push(
    new ethereum.EventParam(
      "endDate",
      ethereum.Value.fromUnsignedBigInt(endDate)
    )
  )

  return createdAuctionEvent
}
