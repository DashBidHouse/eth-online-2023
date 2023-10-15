import { Button, Input } from "@material-tailwind/react";

export default function CreateAuction({
  inputFields,
}: {
  inputFields: Array<ComponentItem>;
}) {
  return (
    <div className="flex-col">
      {inputFields?.length > 0 && (
        <div className="flex w-72 flex-col gap-6 m-5">
          {inputFields?.map((item) => (
            <Input
              crossOrigin="true"
              key={item.name}
              variant="standard"
              label={item.name}
              type={item.type}
              size={item.name === "description" ? "lg" : "md"}
            />
          ))}
        </div>
      )}
      <Button className="m-5" color="blue" ripple={true}>
        Place Auction
      </Button>
    </div>
  );
}
