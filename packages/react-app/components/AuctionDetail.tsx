import { Button, Typography } from "@material-tailwind/react";
import BiddingList from "./BiddingList";
import { bids } from "../utils/mockData";

export default function AuctionDetail({
  detailFields,
  auctionItem,
}: {
  detailFields: Array<ComponentItem>;
  auctionItem: AuctionItem;
}) {
  console.log("data", bids);

  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8 flex-col">
      <div className="flex w-72 flex-col gap-6 m-5">
        {detailFields.map((item) => (
          <Typography key={item.key}>
            {item.key}: {auctionItem[item.key]}
          </Typography>
        ))}
      </div>
      <div className="flex items-center gap-4 m-5">
        <Button color="blue" ripple={true}>
          Bid Now
        </Button>{" "}
        <Button color="blue" ripple={true}>
          Submit Proof of Work
        </Button>{" "}
        <Button color="blue" ripple={true}>
          Cancel Work Agreement
        </Button>{" "}
      </div>
      <div className="flex items-center gap-4 m-5">
        {bids?.length > 0 && <BiddingList biddingList={bids}></BiddingList>}
      </div>
    </div>
  );
}
