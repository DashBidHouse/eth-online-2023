import AuctionDetail from "@/components/AuctionDetail";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import components from "../../utils/components.json";
import { auctions } from "../../utils/mockData";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { graphClient } from "@/utils/graphClient";
import { allBidsRelatedToOneAuction, auctionById } from "@/utils/queries";
import { AuctionItem, BiddingItem, ComponentItem } from "@/utils/types";

const detailFields: Array<ComponentItem> = components.auctionItems;

export default function AuctionDetailPage() {
  const router = useRouter();
  const { user } = router.query;
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  const auctionId = "";
  const [project, setProject] = useState<AuctionItem>();
  const [biddings, setBiddings] = useState<Array<BiddingItem>>();

  const fetchAuctionData = useCallback(async () => {
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
  }, [auctionId]);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }

    fetchAuctionData();
  }, [address, isConnected, fetchAuctionData]);

  // TODO: get subgraph data on the auction
  // TODO: add dynamic routing

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h1">
        <Typography>Project Information</Typography>
        <AuctionDetail
          detailFields={detailFields}
          auctionItem={auctions[0]}
        ></AuctionDetail>
      </div>
    </div>
  );
}
