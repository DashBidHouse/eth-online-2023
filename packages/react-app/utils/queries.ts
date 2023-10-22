import { gql } from "@urql/core";

export const allAuctions = gql`
  query {
    createdAuctions {
      title
      id
      description
      endDate
      manager
      maxOffer
      status
      transactionHash
    }
  }
`;

export const allAuctionsFilteredByManager = gql`
  query ($manager: String) {
    createdAuctions(where: { manager: $manager }) {
      title
      id
      description
      endDate
      manager
      maxOffer
      status
      transactionHash
    }
  }
`;

export const allAuctionsFilteredByAnalyst = gql`
  query ($auction: String) {
    createdAuctions(where: { auction: $auction }) {
      title
      id
      description
      endDate
      manager
      maxOffer
      status
      transactionHash
    }
  }
`;

export const allBidsRelatedToOneAuction = gql`
  query ($auction: String) {
    createdBids(where: { auction: $auction }) {
      offer
      auction
      description
      bidder
      status
      transactionHash
    }
  }
`;

export const allBidsRelatedToOneBidder = gql`
  query ($walletAddress: String) {
    createdBids(where: { bidder: $walletAddress }) {
      offer
      auction
      description
      bidder
      status
      transactionHash
    }
  }
`;

export const auctionById = gql`
  query ($id: String) {
    createdAuction(id: $id) {
      title
      id
      description
      endDate
      manager
      maxOffer
      status
      transactionHash
    }
  }
`;
