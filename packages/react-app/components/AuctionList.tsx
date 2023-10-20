import { Typography } from "@material-tailwind/react";
import AuctionCard from "./AuctionCard";

export default function AuctionList({
  listEntries,
}: {
  listEntries: Array<AuctionItem>;
}) {
  // TODO: Replace mockdata with data from subgraph or tabelland

  return (
    <div className="flex-col mx-auto max-w-7xl py-6 px-4 sm:px-6 md:flex  md:justify-between lg:px-8">
      <Typography>
        Are you a data freelancer? Send your offer (bid) to work on an active
        project here:
      </Typography>
      <div className="flex flex-row gap-6">
        {listEntries.map((item) => (
          <AuctionCard {...item} key={item.address}></AuctionCard>
        ))}
      </div>
    </div>
  );
}
