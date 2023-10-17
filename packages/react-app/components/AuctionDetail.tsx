import { Button, Input, Typography } from "@material-tailwind/react";
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

  // call contract auction.placebid()
  // call contract auction.cancelAuction()

  return (
    <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8 flex-col">
      <div className="flex flex-row">
        <div className="flex flex-row">
          <div className=" w-72  gap-6 m-5">
            {detailFields.map((item) => (
              <div className="flex flex-row" key={item.key}>
                <Typography>{item.name}:</Typography>
              </div>
            ))}
          </div>
          <div className=" w-72  gap-6 m-5">
            {detailFields.map((item) => (
              <div className="flex flex-row" key={item.key}>
                <Typography key={item.name}>{auctionItem[item.key]}</Typography>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <Button className="m-3" color="blue" ripple={true}>
            Submit Proof of Work
          </Button>{" "}
          <Button className="m-3" color="blue" ripple={true}>
            Cancel Work Agreement
          </Button>{" "}
        </div>
      </div>
      <div className="flex items-center gap-4 m-5">
        <Input
          crossOrigin="true"
          variant="standard"
          label="Offer"
          type="number"
          size="md"
        />
        <Input
          crossOrigin="true"
          variant="standard"
          label="Description of your proposal"
          type="string"
          size="lg"
        />
        <Button className="w-max" color="blue">
          Bid Now
        </Button>{" "}
      </div>
      <div className="flex items-center gap-4 m-5">
        {bids?.length > 0 && <BiddingList biddingList={bids}></BiddingList>}
      </div>
    </div>
  );
}
