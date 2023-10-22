// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class canceledAuction extends ethereum.Event {
  get params(): canceledAuction__Params {
    return new canceledAuction__Params(this);
  }
}

export class canceledAuction__Params {
  _event: canceledAuction;

  constructor(event: canceledAuction) {
    this._event = event;
  }

  get manager(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get title(): string {
    return this._event.parameters[1].value.toString();
  }

  get maxOffer(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get endDate(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get bidder(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get winningBid(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class canceledBid extends ethereum.Event {
  get params(): canceledBid__Params {
    return new canceledBid__Params(this);
  }
}

export class canceledBid__Params {
  _event: canceledBid;

  constructor(event: canceledBid) {
    this._event = event;
  }

  get offer(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get auction(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get bidder(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class finalizedAuction extends ethereum.Event {
  get params(): finalizedAuction__Params {
    return new finalizedAuction__Params(this);
  }
}

export class finalizedAuction__Params {
  _event: finalizedAuction;

  constructor(event: finalizedAuction) {
    this._event = event;
  }

  get manager(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get title(): string {
    return this._event.parameters[1].value.toString();
  }

  get maxOffer(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get endDate(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get bidder(): Address {
    return this._event.parameters[4].value.toAddress();
  }

  get winningBid(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }
}

export class placedBid extends ethereum.Event {
  get params(): placedBid__Params {
    return new placedBid__Params(this);
  }
}

export class placedBid__Params {
  _event: placedBid;

  constructor(event: placedBid) {
    this._event = event;
  }

  get offer(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get description(): string {
    return this._event.parameters[1].value.toString();
  }

  get auction(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get bidder(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class Auction__biddingByBidderResult {
  value0: BigInt;
  value1: string;
  value2: i32;

  constructor(value0: BigInt, value1: string, value2: i32) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set(
      "value2",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value2))
    );
    return map;
  }

  getOfferAmount(): BigInt {
    return this.value0;
  }

  getDescription(): string {
    return this.value1;
  }

  getStatus(): i32 {
    return this.value2;
  }
}

export class Auction extends ethereum.SmartContract {
  static bind(address: Address): Auction {
    return new Auction("Auction", address);
  }

  biddingByBidder(param0: Address): Auction__biddingByBidderResult {
    let result = super.call(
      "biddingByBidder",
      "biddingByBidder(address):(uint256,string,uint8)",
      [ethereum.Value.fromAddress(param0)]
    );

    return new Auction__biddingByBidderResult(
      result[0].toBigInt(),
      result[1].toString(),
      result[2].toI32()
    );
  }

  try_biddingByBidder(
    param0: Address
  ): ethereum.CallResult<Auction__biddingByBidderResult> {
    let result = super.tryCall(
      "biddingByBidder",
      "biddingByBidder(address):(uint256,string,uint8)",
      [ethereum.Value.fromAddress(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new Auction__biddingByBidderResult(
        value[0].toBigInt(),
        value[1].toString(),
        value[2].toI32()
      )
    );
  }

  getBidders(): Array<Address> {
    let result = super.call("getBidders", "getBidders():(address[])", []);

    return result[0].toAddressArray();
  }

  try_getBidders(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall("getBidders", "getBidders():(address[])", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }

  maxBidOffer(): BigInt {
    let result = super.call("maxBidOffer", "maxBidOffer():(uint256)", []);

    return result[0].toBigInt();
  }

  try_maxBidOffer(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("maxBidOffer", "maxBidOffer():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  winningBid(): BigInt {
    let result = super.call("winningBid", "winningBid():(uint256)", []);

    return result[0].toBigInt();
  }

  try_winningBid(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("winningBid", "winningBid():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  winningBidder(): Address {
    let result = super.call("winningBidder", "winningBidder():(address)", []);

    return result[0].toAddress();
  }

  try_winningBidder(): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "winningBidder",
      "winningBidder():(address)",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _manager(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _title(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _description(): string {
    return this._call.inputValues[2].value.toString();
  }

  get _maxOffer(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _submissionDeadline(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _startDate(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _endDate(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class CancelBidCall extends ethereum.Call {
  get inputs(): CancelBidCall__Inputs {
    return new CancelBidCall__Inputs(this);
  }

  get outputs(): CancelBidCall__Outputs {
    return new CancelBidCall__Outputs(this);
  }
}

export class CancelBidCall__Inputs {
  _call: CancelBidCall;

  constructor(call: CancelBidCall) {
    this._call = call;
  }
}

export class CancelBidCall__Outputs {
  _call: CancelBidCall;

  constructor(call: CancelBidCall) {
    this._call = call;
  }
}

export class CanelAuctionCall extends ethereum.Call {
  get inputs(): CanelAuctionCall__Inputs {
    return new CanelAuctionCall__Inputs(this);
  }

  get outputs(): CanelAuctionCall__Outputs {
    return new CanelAuctionCall__Outputs(this);
  }
}

export class CanelAuctionCall__Inputs {
  _call: CanelAuctionCall;

  constructor(call: CanelAuctionCall) {
    this._call = call;
  }
}

export class CanelAuctionCall__Outputs {
  _call: CanelAuctionCall;

  constructor(call: CanelAuctionCall) {
    this._call = call;
  }
}

export class FinalizeAuctionCall extends ethereum.Call {
  get inputs(): FinalizeAuctionCall__Inputs {
    return new FinalizeAuctionCall__Inputs(this);
  }

  get outputs(): FinalizeAuctionCall__Outputs {
    return new FinalizeAuctionCall__Outputs(this);
  }
}

export class FinalizeAuctionCall__Inputs {
  _call: FinalizeAuctionCall;

  constructor(call: FinalizeAuctionCall) {
    this._call = call;
  }

  get _winningBidder(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get _winningBid(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class FinalizeAuctionCall__Outputs {
  _call: FinalizeAuctionCall;

  constructor(call: FinalizeAuctionCall) {
    this._call = call;
  }
}

export class PlaceBidCall extends ethereum.Call {
  get inputs(): PlaceBidCall__Inputs {
    return new PlaceBidCall__Inputs(this);
  }

  get outputs(): PlaceBidCall__Outputs {
    return new PlaceBidCall__Outputs(this);
  }
}

export class PlaceBidCall__Inputs {
  _call: PlaceBidCall;

  constructor(call: PlaceBidCall) {
    this._call = call;
  }

  get _offer(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get description(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class PlaceBidCall__Outputs {
  _call: PlaceBidCall;

  constructor(call: PlaceBidCall) {
    this._call = call;
  }
}