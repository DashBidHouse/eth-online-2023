import { AuctionCreated as AuctionCreatedEvent } from "../generated/auctionfactory/auctionfactory"
import { AuctionCreated } from "../generated/schema"

export function handleAuctionCreated(event: AuctionCreatedEvent): void {
  let entity = new AuctionCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.manager = event.params.manager
  entity.newAuction = event.params.newAuction
  entity.title = event.params.title
  entity.maxOffer = event.params.maxOffer
  entity.endDate = event.params.endDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
