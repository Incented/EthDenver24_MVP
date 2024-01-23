import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { FC } from "react";

interface PriorityCardsProps {}

const PriorityCards: FC<PriorityCardsProps> = ({}) => {
  return (
    <div className="col-span-1 grid grid-row-2 gap-3 w-full">
      <Card className=" grid grid-rows-[auto,1fr] w-full h-full p-4 ">
        <div className="border-b w-full">
          <h1 className="text-[16px] mb-2">Prioritization Quorum</h1>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-2xl">
            <ChevronRight />
            <h1>75%</h1>
          </div>
          <p className="text-center font-light text-muted-foreground">
            positive priority
          </p>
        </div>
      </Card>
      <Card className=" grid grid-rows-[auto,1fr] w-full h-full p-4 ">
        <div className="border-b w-full">
          <h1 className="text-[16px] mb-2">Prioritization Quorum</h1>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-2xl">
            <ChevronRight />
            <h1>75%</h1>
          </div>
          <p className="text-center font-light text-muted-foreground">
            positive priority
          </p>
        </div>
      </Card>
    </div>
  );
};

export default PriorityCards;
