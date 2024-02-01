"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FC } from "react";

interface CreateCommunityStepProps {
  step: {
    id: number;
    name: string;
    icon: JSX.Element;
  };
  setCurrentStep: (value: React.SetStateAction<number>) => void;
  currentStep: number;
}

const CreateCommunityStep: FC<CreateCommunityStepProps> = ({
  step,
  setCurrentStep,
  currentStep,
}) => {
  return (
    <div
      key={step.id}
      onClick={() => setCurrentStep(step.id)}
      className={cn(
        "relative w-full text-base leading-9 whitespace-nowrap px-0 bg-transparent shadow-none ",
        currentStep === step.id
          ? "text-foreground font-medium "
          : "text-muted-foreground font-normal hover:text-foreground"
      )}
    >
      <div className="flex gap-2 items-center">
        {step.icon ? (
          <div
            className={cn(
              "border rounded-full h-10 w-10 bg-background flex items-center justify-center",
              currentStep === step.id
                ? "bg-primary stroke-background"
                : "bg-background stroke-foreground"
            )}
          >
            {currentStep > step.id ? <Check size={16} /> : step.icon}
          </div>
        ) : null}
        <span className="hidden leading-9 md:flex">{step.name}</span>
      </div>
    </div>
  );
};

export default CreateCommunityStep;
