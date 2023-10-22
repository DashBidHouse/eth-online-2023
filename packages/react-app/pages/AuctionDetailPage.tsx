import AuctionDetail from "@/components/AuctionDetail";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import components from "../utils/components.json";
import { auctions } from "../utils/mockData";
import { Typography } from "@material-tailwind/react";
import { graphClient } from "@/utils/graphClient";
import { allBidsRelatedToOneAuction, auctionById } from "@/utils/queries";
import { AuctionItem, BiddingItem, ComponentItem } from "@/utils/types";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const detailFields: Array<ComponentItem> = components.auctionItems;

export default function AuctionDetailPage() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  const auctionId = "";
  const [project, setProject] = useState<AuctionItem>();
  const [biddings, setBiddings] = useState<Array<BiddingItem>>();

  const fetchAuctionData = useCallback(async () => {
    try {
      const auctionResult = await graphClient
        .query(auctionById, { auctionId })
        .toPromise();

      console.log(auctionResult);
      // auctionResult && setProject(auctionResult);

      const biddingResult = await graphClient
        .query(allBidsRelatedToOneAuction, { auctionId })
        .toPromise();

      // biddingResult.length && setBiddings(biddingResult);

      console.log(auctionResult);

      // result.length && setProjects(result);
    } catch (error: any) {
      // Handle the error
      console.error("An error occurred:", error);
    }
  }, [auctionId]);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }

    fetchAuctionData();
  }, [address, isConnected, fetchAuctionData]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h1">
        <Typography>Project Information</Typography>
        <ErrorBoundary fallback={<h1>Error Encountered</h1>}>
          <AuctionDetail
            detailFields={detailFields}
            auctionItem={auctions[0]}
          ></AuctionDetail>
        </ErrorBoundary>
      </div>
    </div>
  );
}
