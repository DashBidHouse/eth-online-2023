import { AuctionItem } from "@/utils/types";
import AuctionCard from "./AuctionCard";

export default function AuctionList({
  listEntries,
}: {
  listEntries: Array<AuctionItem>;
}) {
  // TODO: Replace mockdata with data from subgraph or tabelland

  return (
    <div className="flex-col mx-auto max-w-7xl py-6 px-4 sm:px-6 md:flex  md:justify-between lg:px-8">
      <div className="flex flex-row gap-6">
        {listEntries.map((item) => (
          <AuctionCard {...item} key={item.address}></AuctionCard>
        ))}
      </div>
    </div>
  );
}
