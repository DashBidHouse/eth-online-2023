import AuctionList from "@/components/AuctionList";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { auctions } from "../utils/mockData";

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
      <div className="">
        <AuctionList listEntries={auctions}></AuctionList>
      </div>
      {/* {isConnected && (
        <div className="h2 text-center">Your address: {userAddress}</div>
      )} */}
    </div>
  );
}
