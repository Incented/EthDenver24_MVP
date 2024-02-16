import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

interface TooltipWrapperProps {
  tooltipTrigger: React.ReactNode;
  tooltipContent: React.ReactNode;
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  tooltipTrigger,
  tooltipContent,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild
          // className="cursor-pointer"
        >
          {tooltipTrigger}
        </TooltipTrigger>
        <TooltipContent>{tooltipContent}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
