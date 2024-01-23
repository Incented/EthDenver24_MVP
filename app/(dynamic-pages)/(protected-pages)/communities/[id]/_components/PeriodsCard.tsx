import { Card } from "@/components/ui/card";
import { Info, Timer } from "lucide-react";
import { FC } from "react";

interface PeriodsCardProps {}

const PeriodsCard: FC<PeriodsCardProps> = ({}) => {
  return (
    <Card className="bg-muted grid grid-cols-2 border-none col-span-2 p-6 w-full ">
      <div className="mb-4 flex flex-col gap-4 h-full justify-between ">
        <div className="flex space-x-4">
          <h1 className="text-3xl leading-9 font-medium">Periods</h1>
        </div>
        <div className="flex flex-col gap-4">
          <Timer size={89} />
          <p className="text-base leading-[26px] pb-[10px] text-foreground ">
            Duration for users to prioritize, contribute and validate the task
          </p>
        </div>
      </div>

      <div className="grid grid-rows-3 gap-3">
        <Card className="bg-transparent shadow-none flex-col justify-center items-center py-3.5 p-4 h-full border border-primary text-primary">
          <p className="text-xl leading-9 font-semibold">10 days</p>
          <div className="flex items-center gap-1">
            <p className="text-xs font-light text-primary whitespace-nowrap">
              Prioritization Period
            </p>
            <Info size={14} />
          </div>
        </Card>
        <Card className="bg-transparent shadow-none flex-col justify-center items-center py-3.5 p-4 h-full border border-primary text-primary">
          <p className="text-xl leading-9 font-semibold">10 days</p>
          <div className="flex items-center gap-1">
            <p className="text-xs font-light text-primary whitespace-nowrap">
              Prioritization Period
            </p>
            <Info size={14} />
          </div>
        </Card>
        <Card className="bg-transparent shadow-none flex-col justify-center items-center py-3.5 p-4 h-full border border-primary text-primary">
          <p className="text-xl leading-9 font-semibold">10 days</p>
          <div className="flex items-center gap-1">
            <p className="text-xs font-light text-primary whitespace-nowrap">
              Prioritization Period
            </p>
            <Info size={14} />
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default PeriodsCard;
