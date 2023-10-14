export const bids: BiddingItem[] = [
  {
    bidderAddress: "0xajdnk",
    offer: 100,
    status: "accepted",
    successFullDeals: 2,
    ongoingDeals: 1,
    canceledDeals: 3,
    address: "0x123k",
  },
  {
    bidderAddress: "0xajdnk",
    offer: 200,
    status: "declined",
    successFullDeals: 2,
    ongoingDeals: 1,
    canceledDeals: 3,
    address: "0x123l",
  },
  {
    bidderAddress: "0xajdnk",
    offer: 200,
    status: "declined",
    successFullDeals: 2,
    ongoingDeals: 1,
    canceledDeals: 3,
    address: "0x123m",
  },
];

export const auctions: AuctionItem[] = [
  {
    title: "Uniswap NCT Pool",
    description: "make a dashboard for the pool",
    maxOffer: 200,
    endDate: "2023-01-14",
    status: "open",
    address: "0xwert",
    numberOfBids: 3,
  },
  {
    address: "0xabcde",
    status: "closed",
    title: "Crypto Art Auction",
    maxOffer: 500,
    numberOfBids: 10,
    endDate: "2023-03-05",
    description: "bid on unique digital art pieces",
  },
  {
    address: "0xfghij",
    status: "open",
    title: "NFT Collectibles Auction",
    maxOffer: 1000,
    numberOfBids: 5,
    endDate: "2023-03-05",
    description: "bid on a collection of rare NFTs",
  },
];
