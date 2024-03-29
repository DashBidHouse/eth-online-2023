import AuctionList from "@/components/AuctionList";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { auctions, bidsOpen } from "../utils/mockData";
import BiddingList from "@/components/BiddingList";
import { Typography } from "@material-tailwind/react";
import { graphClient } from "@/utils/graphClient";
import {
  allAuctions,
  allAuctionsFilteredByAnalyst,
  allBidsRelatedToOneBidder,
} from "@/utils/queries";
import { AuctionItem, BiddingItem } from "@/utils/types";
import { useRouter } from "next/router";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function ProfilePage() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  const router = useRouter();
  const { user } = router.query;

  const [projects, setProjects] = useState<Array<AuctionItem>>();
  const [biddings, setBiddings] = useState<Array<BiddingItem>>();

  const dontDoAnything = async (data: { bidder: string; offer: number }) => {};
  const fetchAuctionData = useCallback(async () => {
    const auctionResult = await graphClient
      .query(allAuctionsFilteredByAnalyst, { userAddress })
      .toPromise();

    console.log(auctionResult);
    // auctionResult && setProject(auctionResult);

    const biddingResult = await graphClient
      .query(allBidsRelatedToOneBidder, { userAddress })
      .toPromise();

    // biddingResult.length && setBiddings(biddingResult);
  }, [userAddress]);
  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <div className="">
      <div className="">
        <div className="">
          <Typography>
            {user === "client"
              ? "Projects you’ve listed"
              : "Projects you’re working on"}
          </Typography>
          <ErrorBoundary fallback={<h1>Error Encountered</h1>}>
            <AuctionList listEntries={auctions}></AuctionList>
          </ErrorBoundary>
        </div>
        {user === "client" || (
          <div className="flex items-center gap-4 mt-20">
            {bidsOpen?.length > 0 && (
              <ErrorBoundary fallback={<h1>Error Encountered</h1>}>
                <BiddingList
                  biddingAccepted={dontDoAnything}
                  biddingList={bidsOpen}
                ></BiddingList>
              </ErrorBoundary>
            )}
          </div>
        )}
      </div>
      <div>{/* <ProfilePage></ProfilePage> */}</div>
    </div>
  );
}
