import { AuctionItem } from "@/utils/types";
import { Avatar } from "@material-tailwind/react";

export default function ProfileDetail(item: AuctionItem) {
  return (
    <div>
      {" "}
      <Avatar src="/assets/queerrise.png" alt="avatar" />;{" "}
    </div>
  );
}
