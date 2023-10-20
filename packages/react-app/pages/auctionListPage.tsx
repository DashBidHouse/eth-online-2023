import AuctionList from "@/components/AuctionList";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { auctions } from "../utils/mockData";
import { Typography } from "@material-tailwind/react";

export default function AuctionListPage() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

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
