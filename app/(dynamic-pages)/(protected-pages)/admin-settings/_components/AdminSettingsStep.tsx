"use client";

import { cn } from "@/lib/utils";
import { FC } from "react";

interface AdminSettingsStepProps {
  step: {
    id: number;
    name: string;
  };
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  currentStep: number;
}

const AdminSettingsStep: FC<AdminSettingsStepProps> = ({
  step,
  setCurrentStep,
  currentStep,
}) => {
  return (
    <div
      key={step.id}
      onClick={() => setCurrentStep(step.id)}
      className={cn(
        "relative w-full text-base leading-9 whitespace-nowrap px-0 bg-transparent shadow-none cursor-pointer",
        currentStep === step.id
          ? "text-foreground font-medium "
          : "text-muted-foreground font-normal hover:text-foreground"
      )}
    >
      <div className="flex items-center gap-2">
        <span className="leading-9 md:flex">{step.name}</span>
      </div>
    </div>
  );
};

export default AdminSettingsStep;
