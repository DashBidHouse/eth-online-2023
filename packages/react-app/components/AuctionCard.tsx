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
        <Typography>Max Offer: {item.maxOffer}</Typography>
        <Typography>Status: {item.status}</Typography>
        <Typography>Number of Bids: {item.numberOfBids}</Typography>
        <Typography>Deadline: {item.endDate}</Typography>
        <Typography>Description: {item.description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Go to Auction</Button>
      </CardFooter>
    </Card>
  );
}
