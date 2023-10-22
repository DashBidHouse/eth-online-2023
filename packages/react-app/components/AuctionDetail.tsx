import { Button, Card, Input, Typography } from "@material-tailwind/react";
import BiddingList from "./BiddingList";
import { bidsClosed, bidsOpen } from "../utils/mockData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuctionItem, ComponentItem } from "@/utils/types";
import SismoConnect from "./SismoConnect";
import Auction from "../abis/Auction.json";
import { useEthersProvider, useEthersSigner } from "@/utils/ethers";
import { ethers } from "ethers";

export default function AuctionDetail({
  detailFields,
  auctionItem,
}: {
  detailFields: Array<ComponentItem>;
  auctionItem: AuctionItem;
}) {
  const router = useRouter();
  const { user } = router.query;

  //  smart contract address
  const auctionContractAddress = "0x51250a9E990fbF72Df64e707e2b4e815E4eC3aF5"; // MantleTestnet
  // "0x692a38F2578ac99D17215B1D5305542eDc721742"; // Scroll Sepolia

  // get signer & provider
  const signer = useEthersSigner();
  const provider = useEthersProvider();

  // create auctionFactoryContract so we can call a function
  const auctionContract = new ethers.Contract(
    auctionContractAddress,
    Auction.abi,
    signer || provider
  );

  // call smart contract function Auction.placeBid() - Make an Offer Button
  const [userState, setUserState] = useState("Opened");
  const [status, setStatus] = useState("Opened");
  const [deadline, setDeadline] = useState("Opened");
  const [offer, setOffer] = useState(0);
  const [description, setDescription] = useState("");
  const [tx, setTx] = useState("");

  // function is called when project is created - button "Create Project"
  const makeOffer = async (offer: number, description: string) => {
    // set Auction Status
    setStatus(status);
    console.log(status);
    console.log(auctionContract);
    console.log(offer, description);

    // checks if user is connected with their wallet
    if (!signer) {
      alert("Please Connect your Wallet.");
    }

    try {
      // call smart contract function
      const result = await auctionContract.placeBid(offer, description);

      setTx(result.hash);
      const transaction = await result.wait();
      setTx(transaction);
      console.log(tx);
    } catch (error: any) {
      // Handle the error
      alert(error.message);
      console.error("An error occurred:", error);
    }
  };

  // call contract auction.cancelAuction() - cancel Job
  const cancelAuction = async () => {
    user
      ? setUserState(typeof user === "string" ? user : user[0])
      : setUserState("analyst");

    // checks if user is connected with their wallet
    if (!signer) {
      alert("Please Connect your Wallet.");
    }

    try {
      // call smart contract function
      const result = await auctionContract.cancelAuction();

      setTx(result.hash);
      const transaction = await result.wait();
      setTx(transaction);
      console.log(tx);
    } catch (error: any) {
      // Handle the error
      alert(error.message);
      console.error("An error occurred:", error);
    }
  };

  const changeAuctionState = async (data: {
    bidder: string;
    offer: number;
  }) => {
    user
      ? setUserState(typeof user === "string" ? user : user[0])
      : setUserState("analyst");

    console.log(data);
    // setStatus("Closed");
    console.log(status);
  };

  // countdown until the auction ends

  function updateCountdown(deadline: Date) {
    const now = new Date();
    const timeDifference = deadline.getTime() - now.getTime();

    if (timeDifference <= 0) {
      // The deadline has passed.
      document.getElementById("deadline")!.textContent = "Time's up!";
    } else {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      const countdownText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      setDeadline(countdownText);

      // Update the countdown every 1 second (1000 milliseconds)
      setTimeout(() => {
        updateCountdown(deadline);
      }, 1000);
    }
  }

  useEffect(() => {
    setStatus("Opened");
    // Start the countdown initially.
    updateCountdown(new Date(auctionItem.endDate));
  }, []);

  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8 flex-col">
      <div className="flex flex-row gap-20">
        <Card className="bg-white">
          <div className="flex flex-row">
            <div className=" w-30  gap-6 m-5">
              {detailFields.map((item) => (
                <div className="flex flex-row" key={item.key}>
                  <Typography>{item.name}:</Typography>
                </div>
              ))}
            </div>
            <div className=" w-72  gap-6 m-5">
              {detailFields.map((item) => (
                <div className="flex flex-row" key={item.key}>
                  <Typography key={item.name}>
                    {auctionItem[item.key]}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </Card>
        {/* <SismoConnect></SismoConnect> */}
        {status === "Canceled" ? (
          <Typography color="red" variant="h4" className="ml-3 mt-4">
            Canceled
          </Typography>
        ) : status === "Opened" ? (
          user === "client" ? (
            <div className="flex flex-col">
              <div>
                <Button
                  onClick={cancelAuction}
                  className="m-3"
                  color="orange"
                  ripple={true}
                >
                  Cancel Project
                </Button>{" "}
                <Typography color="gray" variant="h4" className="ml-3 mt-4">
                  Deadline
                </Typography>
                <Typography variant="h3" id="deadline" className="ml-3">
                  {deadline}
                </Typography>
              </div>
            </div>
          ) : (
            user === "analyst" &&
            status === "Opened" && (
              <div className="flex flex-col">
                <div>
                  <Button
                    onClick={() => makeOffer(offer, description)}
                    className="m-3"
                    color="deep-purple"
                    ripple={true}
                  >
                    Make an Offer
                  </Button>
                  <div className="m-4">
                    <Input
                      crossOrigin="true"
                      variant="standard"
                      label="Offer"
                      type="number"
                      size="md"
                      onChange={(event) => setOffer(Number(event.target.value))}
                    />
                    <div className="m-4"></div>

                    <Input
                      crossOrigin="true"
                      variant="standard"
                      label="Description of your proposal"
                      type="string"
                      size="lg"
                      onChange={(event) => setDescription(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            )
          )
        ) : (
          status === "Closed" && (
            <div>
              <Button className="m-3" color="orange" ripple={true}>
                Report
              </Button>{" "}
              <Button className="m-3" color="deep-purple" ripple={true}>
                Submit Work
              </Button>{" "}
              <Typography color="gray" variant="h4" className="ml-3 mt-4">
                Deadline
              </Typography>
              <Typography variant="h3" id="deadline" className="ml-3">
                {deadline}
              </Typography>
            </div>
          )
        )}
      </div>
      <div className="flex items-center gap-4 mt-20">
        {bidsOpen?.length > 0 && (
          <BiddingList
            biddingAccepted={changeAuctionState}
            biddingList={true ? bidsOpen : bidsClosed}
          ></BiddingList>
        )}
      </div>
    </div>
  );
}
