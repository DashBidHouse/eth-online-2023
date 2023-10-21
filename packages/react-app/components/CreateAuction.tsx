import { ComponentItem } from "@/utils/types";
import { Button, Card, Input, Typography } from "@material-tailwind/react";
import { useRouter } from "next/router";
import AuctionFactory from "../../hardhat/artifacts/contracts/AuctionFactory.sol/AuctionFactory.json";
import { ethers } from "ethers";
import { useEthersProvider, useEthersSigner } from "@/utils/ethers";
import { useState } from "react";

export default function CreateAuction({
  inputFields,
}: {
  inputFields: Array<ComponentItem>;
}) {
  const router = useRouter();
  const { user } = router.query;

  const auctionFactoryContractAddress =
    "0x487eD08169b76dB16f64E27A9512e776A2B5ecFd"; // OptimismGoerli

  // get signer & provider
  const signer = useEthersSigner();
  const provider = useEthersProvider();

  const [tx, setTx] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxOffer, setMaxOffer] = useState(0);
  const [submissionDeadline, setSubmissionDeadline] = useState(0);
  const [startDate, setStartDate] = useState(0);

  // create auctionFactoryContract
  const auctionFactoryContract = new ethers.Contract(
    auctionFactoryContractAddress,
    AuctionFactory.abi,
    signer || provider
  );

  const setValue = (input: any, field: string) => {
    field === "title" && setTitle(input);
    field === "description" && setDescription(input);
    field === "maxOffer" && setMaxOffer(input);
    field === "endDate" && setSubmissionDeadline(new Date(input).getTime());
    field === "startDate" && setStartDate(new Date(input).getTime());
  };

  const createAuction = async () => {
    console.log(auctionFactoryContract);
    console.log(title, description, maxOffer, submissionDeadline, startDate);

    if (!signer) {
      alert("Please Connect your Wallet.");
    }

    try {
      const result = await auctionFactoryContract.createAuction(
        title,
        description,
        maxOffer,
        submissionDeadline,
        startDate
      );

      setTx(result.hash);
    } catch (error) {
      // Handle the error
      console.error("An error occurred:", error);
    }
  };

  // const createAuction = () => {
  //   const id = "12";
  //   if ("transaction successful") {
  //     router.push({
  //       pathname: `/project/${id}`,
  //       query: { user }, // Pass the property as a query parameter
  //     });

  return (
    <div className="flex flex-col justify-center">
      <Typography className="mb-10">
        Are you looking for data analysts to work with? List your project to
        start getting offers.
      </Typography>
      <Card className="flex flex-col justify-center m-5 p-5 items-center">
        {inputFields?.length > 0 && (
          <div className="flex  flex-col gap-6 m-5">
            {inputFields?.map((item) => (
              <Input
                crossOrigin="true"
                key={item.name}
                variant="standard"
                label={item.name}
                type={item.type}
                size={item.name === "description" ? "lg" : "md"}
                onChange={(event) => setValue(event.target.value, item.key)}
              />
            ))}
          </div>
        )}
        <Button
          onClick={createAuction}
          className="m-5 w-1/3"
          color="deep-purple"
          ripple={true}
        >
          Create Project
        </Button>
      </Card>
    </div>
  );
}
