import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Periods } from "../../../communities/create-community/_components/createCommunitySchema";


export function PeriodsCardSlim({ periods }: { periods: Periods }) {
  return (
    <Card className="bg-muted grid gap-4 grid-cols-1 border-none col-span-1 p-6 w-full ">
      <h1 className="text-3xl leading-9 font-medium">Periods</h1>

      <div className="grid grid-rows-3 gap-3">
        <Card className="bg-transparent shadow-none flex-col justify-center items-center py-3.5 p-4 h-full border border-primary text-primary">
          <p className="text-xl leading-9 font-semibold">
            {periods.prioritizationPeriod} days
          </p>
          <div className="flex items-center gap-1">
            <p className="text-xs font-light text-primary whitespace-nowrap">
              Prioritization Period
            </p>
            <Info size={14} />
          </div>
        </Card>
        <Card className="bg-transparent shadow-none flex-col justify-center items-center py-3.5 p-4 h-full border border-primary text-primary">
          <p className="text-xl leading-9 font-semibold">
            {periods.contributionPeriod} days
          </p>
          <div className="flex items-center gap-1">
            <p className="text-xs font-light text-primary whitespace-nowrap">
              Contribution Period
            </p>
            <Info size={14} />
          </div>
        </Card>
        <Card className="bg-transparent shadow-none flex-col justify-center items-center py-3.5 p-4 h-full border border-primary text-primary">
          <p className="text-xl leading-9 font-semibold">
            {periods.validationPeriod} days
          </p>
          <div className="flex items-center gap-1">
            <p className="text-xs font-light text-primary whitespace-nowrap">
              Validation Period
            </p>
            <Info size={14} />
          </div>
        </Card>
      </div>
    </Card>
  );
}

export default PeriodsCardSlim;
