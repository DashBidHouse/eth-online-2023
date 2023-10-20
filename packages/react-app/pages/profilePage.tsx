import AuctionList from "@/components/AuctionList";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { auctions, bids } from "../utils/mockData";
import BiddingList from "@/components/BiddingList";
import { Typography } from "@material-tailwind/react";

export default function ProfilePage() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

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
            {/* TODO: add condition for user */}
            {"Projects you’re working on" || "Projects you’ve listed"}
          </Typography>
          <AuctionList listEntries={auctions}></AuctionList>
        </div>
        <div className="flex items-center gap-4 mt-20">
          {bids?.length > 0 && <BiddingList biddingList={bids}></BiddingList>}
        </div>{" "}
      </div>
      <div>{/* <ProfilePage></ProfilePage> */}</div>
    </div>
  );
}
