import AuctionList from "@/components/AuctionList";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { auctions } from "../utils/mockData";
import { Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";

export default function AuctionListPage() {
  const router = useRouter();
  const { user } = router.query;
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <div className="flex flex-col justify-center align-items">
      {user === "client" ? (
        <Button
          onClick={() => {
            router.push({
              pathname: "/auctionCreatePage",
              query: { user }, // Pass the property as a query parameter
            });
          }}
          color="deep-purple"
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
        <AuctionList listEntries={auctions}></AuctionList>
      </div>
    </div>
  );
}
