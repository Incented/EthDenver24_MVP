import { Card } from "@/components/ui/card";
import { Info, Timer } from "lucide-react";
import { FC } from "react";
import { Periods } from "../../create-community/_components/createCommunitySchema";

export function PeriodsCard() {
  // { periods }: { periods: Periods }
  const periods = {
    prioritizationPeriod: 20,
    contributionPeriod: 30,
    validationPeriod: 50,
  };
  return (
    <Card className="bg-muted grid grid-cols-2 border-none col-span-2 p-6 w-full ">
      <div className="mb-4 flex flex-col gap-4 h-full justify-between ">
        <div className="flex space-x-4">
          <h1 className="text-3xl leading-9 font-medium">Periods</h1>
        </div>
        <div className="flex flex-col gap-4">
          {/* <Timer size={89} /> */}
          <svg
            width="89px"
            height="89px"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="lap-timer">
              <path
                id="Vector"
                d="M8.53331 0.566667H8.03331V1.06667V2.2605V2.72336L8.49479 2.75902C9.58039 2.8429 10.5888 3.20065 11.4516 3.76354L11.8515 4.02438L12.1305 3.63701C12.1359 3.62953 12.142 3.62225 12.149 3.61524C12.1491 3.61518 12.1491 3.61511 12.1492 3.61505L13.2154 2.54883C13.2154 2.54883 13.2154 2.54882 13.2154 2.54882C13.2805 2.48372 13.386 2.48373 13.4511 2.54883C13.5162 2.61392 13.5162 2.71941 13.4512 2.7845L13.4511 2.78451L12.4112 3.82438L12.0531 4.18248L12.4158 4.53598C13.5952 5.68568 14.3267 7.2903 14.3267 9.06664C14.3267 12.5608 11.4941 15.3933 7.99998 15.3933C4.50585 15.3933 1.67331 12.5608 1.67331 9.06664C1.67331 5.73908 4.24256 3.01113 7.50517 2.75901L7.96664 2.72335V2.2605V1.06667V0.566667H7.46664H6.39998C6.38156 0.566667 6.36664 0.551748 6.36664 0.533333C6.36664 0.514919 6.38156 0.5 6.39998 0.5H7.99998H9.59998C9.61838 0.5 9.63331 0.514925 9.63331 0.533333C9.63331 0.551741 9.61838 0.566667 9.59998 0.566667H8.53331ZM7.49998 9.06664V9.27375L7.64642 9.4202L10.5905 12.3643C9.87718 12.9257 8.97796 13.26 7.99998 13.26C5.68406 13.26 3.80664 11.3825 3.80664 9.06664C3.80664 6.91992 5.41976 5.14997 7.49998 4.90281V9.06664ZM7.99998 2.80665C4.54267 2.80665 1.73998 5.60934 1.73998 9.06664C1.73998 12.5239 4.54267 15.3267 7.99998 15.3267C11.4573 15.3267 14.26 12.5239 14.26 9.06664C14.26 5.60934 11.4573 2.80665 7.99998 2.80665Z"
                className="stroke-foreground fill-foreground"
              />
            </g>
          </svg>

          <p className="text-base leading-[26px] pb-[10px] text-foreground ">
            Duration for users to prioritize, contribute and validate the task
          </p>
        </div>
      </div>

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

export default PeriodsCard;
