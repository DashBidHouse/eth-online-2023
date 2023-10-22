import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { canceledAuction } from "../generated/schema"
import { canceledAuction as canceledAuctionEvent } from "../generated/Auction/Auction"
import { handlecanceledAuction } from "../src/auction"
import { createcanceledAuctionEvent } from "./auction-utils"

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
    let newcanceledAuctionEvent = createcanceledAuctionEvent(
      manager,
      title,
      maxOffer,
      endDate,
      bidder,
      winningBid
    )
    handlecanceledAuction(newcanceledAuctionEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("canceledAuction created and stored", () => {
    assert.entityCount("canceledAuction", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "canceledAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "manager",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "canceledAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "title",
      "Example string value"
    )
    assert.fieldEquals(
      "canceledAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "maxOffer",
      "234"
    )
    assert.fieldEquals(
      "canceledAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "endDate",
      "234"
    )
    assert.fieldEquals(
      "canceledAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bidder",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "canceledAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "winningBid",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
