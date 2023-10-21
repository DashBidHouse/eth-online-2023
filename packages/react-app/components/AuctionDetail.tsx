import { Button, Card, Input, Typography } from "@material-tailwind/react";
import BiddingList from "./BiddingList";
import { bids } from "../utils/mockData";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuctionItem, ComponentItem } from "@/utils/types";

export default function AuctionDetail({
  detailFields,
  auctionItem,
}: {
  detailFields: Array<ComponentItem>;
  auctionItem: AuctionItem;
}) {
  const router = useRouter();
  const { user } = router.query;

  // countdown until the auction ends
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("Opened");

  const makeOffer = async (status: string) => {
    setStatus(status);
    console.log(status);
  };
  const changeAuctionState = async (data: {
    bidder: string;
    offer: number;
  }) => {
    console.log(data);
    setStatus("Closed");
    console.log(status);
  };
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
    // Start the countdown initially.
    updateCountdown(new Date(auctionItem.endDate));
  }, []);

  // call contract auction.placebid()
  // call contract auction.cancelAuction()

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
        {user === "client" ? (
          <div className="flex flex-col">
            <Button
              onClick={() => makeOffer("Canceled")}
              className="m-3"
              color="orange"
              ripple={true}
            >
              Cancel Project
            </Button>{" "}
            <Typography color="gray" variant="h4" className="ml-3">
              Deadline
            </Typography>
            <Typography variant="h3" id="deadline" className="ml-3">
              {deadline}
            </Typography>
          </div>
        ) : (
          <div className="flex flex-col">
            {status === "Opened" ? (
              <div>
                <Button className="m-3" color="deep-purple" ripple={true}>
                  Make an Offer
                </Button>
                <div className="m-4">
                  <Input
                    crossOrigin="true"
                    variant="standard"
                    label="Offer"
                    type="number"
                    size="md"
                  />
                  <div className="m-4"></div>

                  <Input
                    crossOrigin="true"
                    variant="standard"
                    label="Description of your proposal"
                    type="string"
                    size="lg"
                  />
                </div>
              </div>
            ) : status === "Closed" ? (
              <div>
                <Button className="m-3" color="orange" ripple={true}>
                  Report
                </Button>{" "}
                <Button className="m-3" color="deep-purple" ripple={true}>
                  Submit Work
                </Button>{" "}
              </div>
            ) : (
              <Typography color="red" variant="h4" className="ml-3 mt-4">
                Canceled
              </Typography>
            )}
            {status === "Canceled" || (
              <div>
                <Typography color="gray" variant="h4" className="ml-3 mt-4">
                  Deadline
                </Typography>
                <Typography variant="h3" id="deadline" className="ml-3">
                  {deadline}
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 mt-20">
        {bids?.length > 0 && (
          <BiddingList
            biddingAccepted={changeAuctionState}
            biddingList={bids}
          ></BiddingList>
        )}
      </div>
    </div>
  );
}
