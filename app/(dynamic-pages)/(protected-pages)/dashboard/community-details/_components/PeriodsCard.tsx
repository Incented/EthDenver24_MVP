import { Card } from "@/components/ui/card";
import { Info, Timer } from "lucide-react";
import { FC } from "react";

interface PeriodsCardProps {}

const PeriodsCard: FC<PeriodsCardProps> = ({}) => {
  return (
    <Card className="p-6 ">
      <div className="mb-4">
        <div className="flex space-x-4">
          <h1 className="text-4xl ">Periods</h1>
          <Timer size={40} className="mb-2" />
        </div>
        <p className="text-[16px] ">
          Duration for users to prioritize, contribute and validate the task
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Card className="p-4 border border-primary text-primary">
          <p className="text-[20px]">10 days</p>
          <div className="flex items-center gap-1">
            <p className="text-xs whitespace-nowrap">Prioritization Period</p>
            <Info size={14} />
          </div>
        </Card>
        <Card className="p-4 border border-primary text-primary">
          <p className="text-[20px]">10 days</p>
          <div className="flex items-center gap-1">
            <p className="text-xs whitespace-nowrap">Prioritization Period</p>
            <Info size={14} />
          </div>
        </Card>
        <Card className="p-4 border border-primary text-primary">
          <p className="text-[20px]">10 days</p>
          <div className="flex items-center gap-1">
            <p className="text-xs whitespace-nowrap">Prioritization Period</p>
            <Info size={14} />
          </div>
        </Card>
      </div>
    </Card>
  );
};

export default PeriodsCard;
