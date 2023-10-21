export const allAuctions = `
      query ($walletAddress: String) {
        users(id: $walletAddress) {
          batchesOwned(orderBy: id, orderDirection: desc) {
            id
            tx
            serialNumber
            quantity
            confirmationStatus
            comments {
              id
              comment
              sender {
                id
              }
            }
            creator {
              id
            }
          }
        }
      }
    `;

export const allAuctionsFilteredByManager = `
      query ($walletAddress: String) {
        users(id: $walletAddress) {
          batchesOwned(orderBy: id, orderDirection: desc) {
            id
            tx
            serialNumber
            quantity
            confirmationStatus
            comments {
              id
              comment
              sender {
                id
              }
            }
            creator {
              id
            }
          }
        }
      }
    `;

export const allAuctionsFilteredByAnalyst = `
      query ($walletAddress: String) {
        users(id: $walletAddress) {
          batchesOwned(orderBy: id, orderDirection: desc) {
            id
            tx
            serialNumber
            quantity
            confirmationStatus
            comments {
              id
              comment
              sender {
                id
              }
            }
            creator {
              id
            }
          }
        }
      }
    `;

export const allBidsRelatedToOneAuction = `
      query ($walletAddress: String) {
      }
    `;

export const allBidsRelatedToOneBidder = `
      query ($walletAddress: String) {
      }
    `;

export const auctionById = `
      query ($id: String) {
      }
    `;
