import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export default function AuctionCard(item: AuctionItem) {
  return (
    <Card className="mt-6 w-96">
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {item.title}
        </Typography>

        <Typography className="black whitespace-nowrap overflow-hidden overflow-ellipsis w-2/3 mb-5">
          By{" "}
          <a
            className="whitespace-nowrap overflow-hidden overflow-ellipsis w-32"
            href="https://goerli-optimism.etherscan.io/"
            target="_blank"
          >
            {item.manager}
          </a>
        </Typography>
        <div className="flex flex-row justify-between gap-5  w-2/3 mb-5">
          <div className=" flex flex-col">
            <Typography className="black">Max Budget: </Typography>
            <Typography variant="h4">$ {item.maxOffer}</Typography>
          </div>
          <div className="flex flex-col">
            {/* TODO: add queried Offers */}
            <Typography>Best Offer: </Typography>
            <Typography variant="h4">$ {item.maxOffer}</Typography>
          </div>
        </div>
        <div className="flex flex-row mb-5">
          {/* <Typography>Number of Bids: {item.numberOfBids}</Typography> */}
          <Typography className="text-color-green bg-light-green-200  rounded-lg p-1 w-2/3 border border-r20">
            Project Deadline: {item.endDate}
          </Typography>
          {/* <Typography className="mr-5 w-20 p-2 black text-color-green bg-yellow-200  rounded-lg ">
            {" "}
            {item.status}
          </Typography> */}
        </div>
        {/* <Typography>Description: {item.description}</Typography> */}
      </CardBody>
      <CardFooter className="pt-0 flex flex-row justify-center">
        <Button color="deep-purple">Make Offer</Button>
      </CardFooter>
    </Card>
  );
}
