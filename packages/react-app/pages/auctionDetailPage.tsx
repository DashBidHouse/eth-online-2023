import AuctionDetail from "@/components/AuctionDetail";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import components from "../utils/components.json";
import { auctions } from "../utils/mockData";

const detailFields: Array<ComponentItem> = components.auctionItems;

export default function AuctionDetailPage() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="h1">
        <AuctionDetail
          detailFields={detailFields}
          auctionItem={auctions[0]}
        ></AuctionDetail>
      </div>
      {isConnected && (
        <div className="h2 text-center">Your address: {userAddress}</div>
      )}
    </div>
  );
}
