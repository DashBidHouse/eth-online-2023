import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AuctionFinalized } from "../generated/schema"
import { AuctionFinalized as AuctionFinalizedEvent } from "../generated/Auction/Auction"
import { handleAuctionFinalized } from "../src/auction"
import { createAuctionFinalizedEvent } from "./auction-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let manager = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let title = "Example string value"
    let maxOffer = BigInt.fromI32(234)
    let endDate = BigInt.fromI32(234)
    let bidder = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let winningBid = BigInt.fromI32(234)
    let newAuctionFinalizedEvent = createAuctionFinalizedEvent(
      manager,
      title,
      maxOffer,
      endDate,
      bidder,
      winningBid
    )
    handleAuctionFinalized(newAuctionFinalizedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AuctionFinalized created and stored", () => {
    assert.entityCount("AuctionFinalized", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AuctionFinalized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "manager",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AuctionFinalized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "title",
      "Example string value"
    )
    assert.fieldEquals(
      "AuctionFinalized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "maxOffer",
      "234"
    )
    assert.fieldEquals(
      "AuctionFinalized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "endDate",
      "234"
    )
    assert.fieldEquals(
      "AuctionFinalized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bidder",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AuctionFinalized",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "winningBid",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
