export type ComponentItem = {
  name: string;
  key: string;
  type: string;
};

export type AuctionItem = {
  address: string;
  manager: string;
  status: "open" | "closed";
  title: string;
  maxOffer: number;
  numberOfBids: number;
  endDate: string;
  description: string;
  [key: string]: any;
};

export type BiddingItem = {
  bidderAddress: string;
  offer: number;
  auction: string;
  description: string;
  status: "open" | "accepted" | "declined";
  successFullDeals: number;
  ongoingDeals: number;
  canceledDeals: number;
};
