import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, LucideIcon } from "lucide-react";
import { FC } from "react";

interface GrantProjectDetailTopCardProps {
  value: number;
  test: string;
  Icon: LucideIcon;
  info: string;
}

const GrantProjectDetailTopCard: FC<GrantProjectDetailTopCardProps> = ({
  value,
  test,
  Icon,
  info,
}) => {
  return (
    <Card className="relative w-full gap-0 p-0 rounded-xl">
      <div className="flex items-center justify-between p-6 pb-2">
        <h1 className="text-3xl ">{value}%</h1>
        <Icon className="text-muted-foreground" size={20} />
      </div>

      <div className="flex items-center w-full gap-1 px-6 py-2 text-sm font-semibold h-11">
        <p className="text-xs font-normal text-muted-foreground whitespace-nowrap">
          {test}
        </p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Info size={16} className="text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="w-[200px]">
              <p className="text-xs">{info}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  );
};

export default GrantProjectDetailTopCard;
