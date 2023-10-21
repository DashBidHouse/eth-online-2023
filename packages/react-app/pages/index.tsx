import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import Image from "next/image";
import { Typography, Button } from "@material-tailwind/react";

export default function Home() {
  const router = useRouter();
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  return (
    <div className="flex flex-row justify-center items-center">
      <div className="flex flex-col gap-10">
        <Typography className="m5" variant="h1" color="blue-gray">
          Using reverse auctions to create new markets for blockchain data
          analytics
        </Typography>
        <Typography className="m5" variant="h3" color="black">
          Join as a Data Freelancer or Client
        </Typography>
        <div className="flex flex-row gap-10">
          <Button
            onClick={() => {
              router.push({
                pathname: "/auctionListPage",
                query: { user: "client" }, // Pass the property as a query parameter
              });
            }}
            className="m5"
            color="deep-purple"
          >
            Company
          </Button>
          <Button
            onClick={() => {
              router.push({
                pathname: "/auctionListPage",
                query: { user: "analyst" }, // Pass the property as a query parameter
              });
            }}
            className="m5"
          >
            Data Analyst
          </Button>
        </div>
      </div>
      <div>
        <Image
          src="/landing-page.svg"
          width={1000}
          height={1000}
          alt="two people draw data dashboards"
        />
      </div>
    </div>
  );
}
