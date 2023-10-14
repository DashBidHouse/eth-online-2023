import { Button, Input } from "@material-tailwind/react";

export default function CreateAuction({
  inputFields,
}: {
  inputFields: Array<ComponentItem>;
}) {
  return (
    <div className="flex-col">
      {inputFields?.length > 0 && (
        <div className="flex w-72 flex-col gap-6">
          {inputFields?.map((item) => (
            <Input
              crossOrigin
              key={item.name}
              variant="standard"
              label={item.name}
              type={item.type}
              size={item.size}
            />
          ))}
        </div>
      )}
      <Button color="blue mt-5" ripple={true}>
        Place Auction
      </Button>
    </div>
  );
}
