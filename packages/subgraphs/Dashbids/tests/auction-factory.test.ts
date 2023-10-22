import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { createdAuction } from "../generated/schema"
import { createdAuction as createdAuctionEvent } from "../generated/AuctionFactory/AuctionFactory"
import { handlecreatedAuction } from "../src/auction-factory"
import { createcreatedAuctionEvent } from "./auction-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let manager = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAuction = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let title = "Example string value"
    let maxOffer = BigInt.fromI32(234)
    let submissionDeadline = BigInt.fromI32(234)
    let startDate = BigInt.fromI32(234)
    let endDate = BigInt.fromI32(234)
    let newcreatedAuctionEvent = createcreatedAuctionEvent(
      manager,
      newAuction,
      title,
      maxOffer,
      submissionDeadline,
      startDate,
      endDate
    )
    handlecreatedAuction(newcreatedAuctionEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("createdAuction created and stored", () => {
    assert.entityCount("createdAuction", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "createdAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "manager",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "createdAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newAuction",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "createdAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "title",
      "Example string value"
    )
    assert.fieldEquals(
      "createdAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "maxOffer",
      "234"
    )
    assert.fieldEquals(
      "createdAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "submissionDeadline",
      "234"
    )
    assert.fieldEquals(
      "createdAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "startDate",
      "234"
    )
    assert.fieldEquals(
      "createdAuction",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "endDate",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
