import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { FC } from "react";
import { ProtocolConfigurationSchema } from "../../create-community/_components/createCommunitySchema";

export const PriorityCard = () => {
  return (
    <Card className=" grid grid-rows-[auto,1fr] w-full h-full p-4 ">
      <div className="w-full border-b">
        <h1 className="text-[16px] mb-2">Prioritization Quorum</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex items-center justify-center text-2xl">
          <ChevronRight />
          <h1>75%</h1>
        </div>
        <p className="font-light text-center text-muted-foreground">
          positive priority
        </p>
      </div>
    </Card>
  );
};

export function PriorityCards({
  prioritizationQourum,
  validationQuorum,
}: {
  prioritizationQourum: number;
  validationQuorum: number;
}) {
  return (
    <div className="grid w-full lg:col-span-2 xl:col-span-1">
      <Card className=" grid grid-rows-[auto,1fr] w-full h-full p-4 ">
        <div className="w-full border-b">
          <h1 className="text-[16px] mb-2">Prioritization Quorum</h1>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex items-center justify-center text-2xl">
            <ChevronRight />
            <h1>{prioritizationQourum} %</h1>
          </div>
          <p className="font-light text-center text-muted-foreground">
            positive priority
          </p>
        </div>
      </Card>
      <Card className=" grid grid-rows-[auto,1fr] w-full h-full p-4 ">
        <div className="w-full border-b">
          <h1 className="text-[16px] mb-2">Validation Quorum</h1>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex items-center justify-center text-2xl">
            <ChevronRight />
            <h1>{validationQuorum} %</h1>
          </div>
          <p className="font-light text-center text-muted-foreground">
            positive priority
          </p>
        </div>
      </Card>
    </div>
  );
}

export function PriorityCardsForDisplay({
  prioritizationQourum,
  validationQuorum,
}: {
  prioritizationQourum: number;
  validationQuorum: number;
}) {
  return (
    <div className="flex flex-col w-full col-span-2 gap-4 md:flex-row xl:flex-col">
      <Card className=" grid grid-rows-[auto,1fr] w-full h-full p-4 ">
        <div className="w-full border-b">
          <h1 className="text-[16px] mb-2">Prioritization Quorum</h1>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex items-center justify-center text-2xl">
            <ChevronRight />
            <h1>{prioritizationQourum} %</h1>
          </div>
          <p className="font-light text-center text-muted-foreground">
            positive priority
          </p>
        </div>
      </Card>
      <Card className=" grid grid-rows-[auto,1fr] w-full h-full p-4 ">
        <div className="w-full border-b">
          <h1 className="text-[16px] mb-2">Validation Quorum</h1>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-full">
          <div className="flex items-center justify-center text-2xl">
            <ChevronRight />
            <h1>{validationQuorum} %</h1>
          </div>
          <p className="font-light text-center text-muted-foreground">
            positive priority
          </p>
        </div>
      </Card>
    </div>
  );
}

export default PriorityCards;
