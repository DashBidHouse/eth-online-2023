import AuctionDetail from "@/components/AuctionDetail";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import components from "../../utils/components.json";
import { auctions } from "../../utils/mockData";
import { Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";

const detailFields: Array<ComponentItem> = components.auctionItems;

export default function AuctionDetailPage() {
  const router = useRouter();
  const { user } = router.query;
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

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
