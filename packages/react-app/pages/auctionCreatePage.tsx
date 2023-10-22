import CreateAuction from "@/components/CreateAuction";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import components from "../utils/components.json";
import { ComponentItem } from "@/utils/types";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inputFields: Array<ComponentItem> = components.auctionItems;

export default function Home() {
  const [userAddress, setUserAddress] = useState("");
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    }
  }, [address, isConnected]);

  // Call contract auctionfactory.createAuction()

  return (
    <div className="flex flex-col justify-center items-center">
      {inputFields.length > 0 && (
        <div className="h1">
          <ErrorBoundary fallback={<h1>Error Encountered</h1>}>
            <CreateAuction inputFields={inputFields} />
          </ErrorBoundary>
        </div>
      )}
    </div>
  );
}
