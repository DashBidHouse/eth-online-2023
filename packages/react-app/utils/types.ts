type ComponentItem = {
  name: string;
  key: string;
  type: string;
  size: string;
};

type AuctionItem = {
  address: string;
  status: "open" | "closed";
  title: string;
  maxOffer: number;
  numberOfBids: number;
  endDate: string;
  description: string;
};

type BiddingItem = {
  bidderAddress: string;
  offer: number;
  status: "open" | "accepted" | "declined";
  successFullDeals: number;
  ongoingDeals: number;
  canceledDeals: number;
  address: string;
};
