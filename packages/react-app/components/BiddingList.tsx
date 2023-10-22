import { useEthersProvider, useEthersSigner } from "@/utils/ethers";
import { BiddingItem } from "@/utils/types";
import {
  Button,
  Card,
  CardBody,
  Chip,
  Typography,
} from "@material-tailwind/react";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import Auction from "../abis/Auction.json";
import { useAccount } from "wagmi";

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
  const { address, isConnected } = useAccount();

  //  smart contract address
  const auctionContractAddress = "0x51250a9E990fbF72Df64e707e2b4e815E4eC3aF5"; // MantleTestnet2
  // 0x0eeCE62d3F778211565b33d97906D4C5974291FA; Mantle Testnet1
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

  const [auctionStatus, setAuctionStatus] = useState("Opened");
  const [tx, setTx] = useState("");

  // call contract auction.finalizeAuction(address _winningBidder, uint256 _winningBid) in the Accept Button
  const finalizeAuction = async ({
    winningBidder,
    winningBid,
  }: {
    winningBidder: string;
    winningBid: number;
  }) => {
    // checks if user is connected with their wallet
    if (!signer) {
      alert("Please Connect your Wallet.");
    }

    console.log(winningBidder);

    try {
      // call smart contract function
      // const result = await auctionContract.finalizeAuction(
      //   winningBidder,
      //   winningBid
      // );
      const result = await auctionContract.finalizeAuction(
        "0xBCd80f8469B0A04a9f66A97c35a2AE78C4fDEa7E",
        300
      );

      setTx(result.hash);
      const transaction = await result.wait();
      setTx(transaction);
      console.log(tx);
      // biddingAccepted({ winningBidder, winningBid });
      setAuctionStatus("Closed");
    } catch (error) {
      // Handle the error
      alert(error.message);
      console.error("An error occurred:", error);
    }
  };

  // call smart contract function Auction.cancelBid() - cancel Bid button
  const cancelBid = async () => {
    // checks if user is connected with their wallet
    if (!signer) {
      alert("Please Connect your Wallet.");
    }

    try {
      // call smart contract function
      // const result = await auctionContract.cancelBid(bidder, offer);
      const result = await auctionContract.cancelBid();

      setTx(result.hash);
      const transaction = await result.wait();
      setTx(transaction);
      console.log(tx);
    } catch (error) {
      // Handle the error
      alert(error.message);
      console.error("An error occurred:", error);
    }
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
                            color="deep-purple"
                            className="font-normal"
                            disabled={
                              auctionStatus === "Closed" ||
                              status === "declined" ||
                              status === "accepted"
                            }
                            onClick={() =>
                              finalizeAuction({
                                winningBidder: bidderAddress,
                                winningBid: offer,
                              })
                            }
                          >
                            Accept
                            {/* TODO: Import auction status from detail Page  */}
                            {/* TODO: As soon as a bid is accepted, all the other ones are cancled  */}
                          </Button>
                        ) : (
                          <Button
                            onClick={cancelBid}
                            color="deep-purple"
                            className="font-normal"
                          >
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
