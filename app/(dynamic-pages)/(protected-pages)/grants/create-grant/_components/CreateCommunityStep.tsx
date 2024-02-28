import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FC } from "react";

interface CreateCommunityStepProps {
  step: {
    name: string; // Use the enum here
    icon: JSX.Element;
  };
  currentStepName: string; // Use the enum for current step name
}

const CreateCommunityStep: FC<CreateCommunityStepProps> = ({
  step,
  currentStepName,
}) => {
  const isCurrentStep = step.name === currentStepName;

  return (
    <div
      className={cn(
        "relative w-full text-base leading-9 whitespace-nowrap px-0 bg-transparent shadow-none",
        isCurrentStep
          ? "text-foreground font-medium"
          : "text-muted-foreground font-normal hover:text-foreground"
      )}
    >
      <div className="flex gap-2 items-center">
        {step.icon && (
          <div
            className={cn(
              "border rounded-full h-10 w-10 bg-background flex items-center justify-center",
              isCurrentStep
                ? "bg-primary stroke-background"
                : "bg-background stroke-foreground"
            )}
          >
            {step.icon}
          </div>
        )}
        <span className="hidden leading-9 md:flex">{step.name}</span>
      </div>
    </div>
  );
};

export default CreateCommunityStep;
