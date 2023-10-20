type ComponentItem = {
  name: string;
  key: string;
  type: string;
};

type AuctionItem = {
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

type BiddingItem = {
  bidderAddress: string;
  offer: number;
  status: "open" | "accepted" | "declined";
  successFullDeals: number;
  ongoingDeals: number;
  canceledDeals: number;
};
