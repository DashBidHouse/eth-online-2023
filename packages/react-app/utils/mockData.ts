export const bids: BiddingItem[] = [
  {
    bidderAddress: "0xajdnl",
    offer: 100,
    status: "accepted",
    successFullDeals: 2,
    ongoingDeals: 1,
    canceledDeals: 3,
  },
  {
    bidderAddress: "0xajdnm",
    offer: 200,
    status: "declined",
    successFullDeals: 2,
    ongoingDeals: 1,
    canceledDeals: 3,
  },
  {
    bidderAddress: "0xajdnn",
    offer: 200,
    status: "declined",
    successFullDeals: 2,
    ongoingDeals: 1,
    canceledDeals: 3,
  },
];

export const auctions: AuctionItem[] = [
  {
    manager: "0x78344979959C9d25Beb73748269A2B5533F87a51",
    title: "Uniswap NCT Pool",
    description: "make a dashboard for the pool",
    maxOffer: 200,
    endDate: "2023-11-14",
    status: "open",
    address: "0xwert",
    numberOfBids: 3,
  },
  {
    manager: "0x78344979959C9d25Beb73748269A2B5533F87a51",
    address: "0xabcde",
    status: "closed",
    title: "Crypto Art Auction",
    maxOffer: 500,
    numberOfBids: 10,
    endDate: "2023-11-05",
    description: "bid on unique digital art pieces",
  },
  {
    manager: "0x78344979959C9d25Beb73748269A2B5533F87a51",
    address: "0xfghij",
    status: "open",
    title: "NFT Collectibles Auction",
    maxOffer: 1000,
    numberOfBids: 5,
    endDate: "2023-11-05",
    description: "bid on a collection of rare NFTs",
  },
];
