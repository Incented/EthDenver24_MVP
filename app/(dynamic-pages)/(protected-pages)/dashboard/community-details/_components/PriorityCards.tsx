import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import { FC } from "react";

interface PriorityCardsProps {}

const PriorityCards: FC<PriorityCardsProps> = ({}) => {
  return (
    <div className="flex flex-col">
      <Card className="w-full p-6">
        <h1 className="text-[16px] mb-2">Prioritization Quorum</h1>
        <Separator className="mb-4" />
        <div className="flex items-center justify-center text-2xl">
          <ChevronRight />
          <h1>75%</h1>
        </div>
        <p className="mb-2 text-center">positive priority</p>
      </Card>
      <Card className="w-full p-4">
        <h1 className="text-[16px] mb-2">Prioritization Quorum</h1>
        <Separator className="mb-4" />
        <div className="flex items-center justify-center text-2xl">
          <ChevronRight />
          <h1>75%</h1>
        </div>
        <p className="mb-2 text-center">positive priority</p>
      </Card>
    </div>
  );
};

export default PriorityCards;
