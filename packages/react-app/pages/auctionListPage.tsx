import AuctionList from "@/components/AuctionList";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Typography } from "@material-tailwind/react";
import { graphClient } from "@/utils/graphClient";
import { allAuctions } from "@/utils/queries";
import { gql } from "@urql/core";
import { auctions } from "../utils/mockData";

export default function AuctionListPage() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();
  const [projects, setProjects] = useState<Array<AuctionItem>>();

  const fetchAuctionData = useCallback(async () => {
    const result = await graphClient
      .query(gql(allAuctions), { userAddress })
      .toPromise();

    console.log(result);

    // result.length && setProjects(result);
  }, [userAddress]);

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }

    fetchAuctionData();
  }, [address, isConnected, fetchAuctionData]);

  return (
    <div className="">
      <Typography>
        Are you a data freelancer? Send your offer (bid) to work on an active
        project here:
      </Typography>
      <div className="">
        <AuctionList listEntries={auctions}></AuctionList>
      </div>
      {/* {isConnected && (
        <div className="h2 text-center">Your address: {userAddress}</div>
      )} */}
    </div>
  );
}
