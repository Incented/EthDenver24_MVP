"use client";
import { Progress } from "@/components/ui/Progress";
import { FC } from "react";

interface CreateGrantHeaderProps {
  heading: string;
  subHeading: string;
  stepText: string;
  stepPercent: string;
  stepValue: number;
}

const CreateGrantHeader: FC<CreateGrantHeaderProps> = ({
  heading,
  subHeading,
  stepText,
  stepPercent,
  stepValue,
}) => {
  return (
    <div className="flex flex-col items-center justify-between w-full mb-4 border-b lg:flex-row">
      <div className="flex flex-col w-full pb-4 lg:col-span-2">
        <p className="text-base font-semibold leading-9 text-foreground">
          {heading}
        </p>
        <p className="text-sm leading-6">{subHeading}</p>
      </div>
      <div className="flex flex-col pt-[10px] md:justify-between w-full pb-4 lg:pb-0 lg:w-[160px]">
        <div className="flex justify-between text-sm text-muted-foreground">
          <p>{stepText}</p> <p>{stepPercent}</p>
        </div>
        <div className="py-1.5">
          <Progress value={stepValue} className="w-full h-2" />
        </div>
      </div>
    </div>
  );
};

export default CreateGrantHeader;
