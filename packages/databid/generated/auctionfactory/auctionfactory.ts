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

export class AuctionCreated extends ethereum.Event {
  get params(): AuctionCreated__Params {
    return new AuctionCreated__Params(this);
  }
}

export class AuctionCreated__Params {
  _event: AuctionCreated;

  constructor(event: AuctionCreated) {
    this._event = event;
  }

  get manager(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newAuction(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get title(): string {
    return this._event.parameters[2].value.toString();
  }

  get maxOffer(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get endDate(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class auctionfactory extends ethereum.SmartContract {
  static bind(address: Address): auctionfactory {
    return new auctionfactory("auctionfactory", address);
  }

  deployedAuctions(param0: BigInt): Address {
    let result = super.call(
      "deployedAuctions",
      "deployedAuctions(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return result[0].toAddress();
  }

  try_deployedAuctions(param0: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "deployedAuctions",
      "deployedAuctions(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getDeployedAuctions(): Array<Address> {
    let result = super.call(
      "getDeployedAuctions",
      "getDeployedAuctions():(address[])",
      []
    );

    return result[0].toAddressArray();
  }

  try_getDeployedAuctions(): ethereum.CallResult<Array<Address>> {
    let result = super.tryCall(
      "getDeployedAuctions",
      "getDeployedAuctions():(address[])",
      []
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddressArray());
  }
}

export class CreateAuctionCall extends ethereum.Call {
  get inputs(): CreateAuctionCall__Inputs {
    return new CreateAuctionCall__Inputs(this);
  }

  get outputs(): CreateAuctionCall__Outputs {
    return new CreateAuctionCall__Outputs(this);
  }
}

export class CreateAuctionCall__Inputs {
  _call: CreateAuctionCall;

  constructor(call: CreateAuctionCall) {
    this._call = call;
  }

  get title(): string {
    return this._call.inputValues[0].value.toString();
  }

  get maxOffer(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get endDate(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class CreateAuctionCall__Outputs {
  _call: CreateAuctionCall;

  constructor(call: CreateAuctionCall) {
    this._call = call;
  }
}
