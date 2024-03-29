import AuctionList from "@/components/AuctionList";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { auctions } from "../utils/mockData";
import { Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import { graphClient } from "@/utils/graphClient";
import { allAuctions } from "@/utils/queries";
import { AuctionItem } from "@/utils/types";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function AuctionListPage() {
  const router = useRouter();
  const { user } = router.query;
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();
  const [projects, setProjects] = useState<Array<AuctionItem>>();

  const fetchAuctionData = useCallback(async () => {
    try {
      const result = await graphClient
        .query(allAuctions, { userAddress })
        .toPromise();

      console.log(result);
    } catch (error: any) {
      // Handle the error
      console.error("An error occurred:", error);
    }

    // result.length && setProjects(result);
  }, [userAddress]);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }

    fetchAuctionData();
  }, [address, isConnected, fetchAuctionData]);

  return (
    <div className="flex flex-col justify-center items-center">
      {user === "client" ? (
        <Button
          onClick={() => {
            router.push({
              pathname: "/auctionCreatePage",
              query: { user }, // Pass the property as a query parameter
            });
          }}
          color="deep-purple"
          className="m-5"
        >
          Create Project
        </Button>
      ) : (
        <Typography>
          Are you a data freelancer? Send your offer (bid) to work on an active
          project here:
        </Typography>
      )}
      <div className="">
        <ErrorBoundary fallback={<h1>Error Encountered</h1>}>
          <AuctionList listEntries={auctions}></AuctionList>
        </ErrorBoundary>
      </div>
    </div>
  );
}
