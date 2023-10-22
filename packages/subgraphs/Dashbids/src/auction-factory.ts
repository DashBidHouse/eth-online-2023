import { createdAuction as createdAuctionEvent } from "../generated/AuctionFactory/AuctionFactory"
import { createdAuction } from "../generated/schema"

export function handlecreatedAuction(event: createdAuctionEvent): void {
  let entity = new createdAuction(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.manager = event.params.manager
  entity.newAuction = event.params.newAuction
  entity.title = event.params.title
  entity.maxOffer = event.params.maxOffer
  entity.submissionDeadline = event.params.submissionDeadline
  entity.startDate = event.params.startDate
  entity.endDate = event.params.endDate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
