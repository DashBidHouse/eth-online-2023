import { Button, Card, Input, Typography } from "@material-tailwind/react";

export default function CreateAuction({
  inputFields,
}: {
  inputFields: Array<ComponentItem>;
}) {
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
              />
            ))}
          </div>
        )}
        <Button className="m-5 w-1/3" color="deep-purple" ripple={true}>
          Place Auction
        </Button>
      </Card>
    </div>
  );
}
