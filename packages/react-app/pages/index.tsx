import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Image from "next/image";
import { Typography, Button } from "@material-tailwind/react";

export default function Home() {
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
          <Button className="m5" color="deep-purple">
            Company
          </Button>
          <Button className="m5">Data Analyst</Button>
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
