import { BiddingItem } from "@/utils/types";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { useRouter } from "next/router";
import { useState } from "react";

const TABLE_HEAD = [
  "Bidder",
  "Bid",
  "Status",
  "Succesfull Deals",
  "Ongoing Deals",
  "Canceled Deals",
  "Bid Address",
];

export default function BiddingList({
  biddingList,
  biddingAccepted,
}: {
  biddingList: Array<BiddingItem>;
  biddingAccepted: ({ bidder, offer }: { bidder: string; offer: number }) => {};
}) {
  const router = useRouter();
  const { user } = router.query;
  // TODO: Replace mockdata with data from subgraph or tabelland
  const TABLE_ROWS = biddingList;

  const [auctionStatus, setAuctionStatus] = useState("Opened");

  // call contract auction.finalizeAuction() in the Accept Button
  // call smart contract function Auction.cancelBid() - cancel Bid button

  const acceptOffer = async (bidder: string, offer: number) => {
    biddingAccepted({ bidder, offer });
    setAuctionStatus("Closed");
  };

  return (
    <Card className="shadow-none border-top border-orange-200 h-full w-full bg-beige1">
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-orange-200  p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TABLE_ROWS?.length > 0 &&
              TABLE_ROWS.map(
                (
                  {
                    bidderAddress,
                    offer,
                    status,
                    successFullDeals,
                    ongoingDeals,
                    canceledDeals,
                  },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = "p-4 ";

                  return (
                    <tr key={bidderAddress}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-bold"
                          >
                            <a
                              href="http://"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {bidderAddress}
                            </a>
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {offer}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={status}
                            color={
                              status === "accepted"
                                ? "green"
                                : status === "open"
                                ? "amber"
                                : "red"
                            }
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {successFullDeals}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {ongoingDeals}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {canceledDeals}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {user === "client" ? (
                          <Button
                            onClick={() => acceptOffer(bidderAddress, offer)}
                            color="deep-purple"
                            className="font-normal"
                            disabled={
                              auctionStatus === "Closed" ||
                              status === "declined" ||
                              status === "accepted"
                            }
                          >
                            Accept
                            {/* TODO: Import auction status from detail Page  */}
                            {/* TODO: As soon as a bid is accepted, all the other ones are cancled  */}
                          </Button>
                        ) : (
                          <Button color="deep-purple" className="font-normal">
                            Cancel
                            {/* TODO: Import auction status from detail Page  */}
                            {/* TODO: As soon as a bid is accepted, all the other ones are cancled  */}
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}
