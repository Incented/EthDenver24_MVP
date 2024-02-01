import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info, LucideIcon, Trophy } from "lucide-react";
import { FC } from "react";

interface CommunityDetailTopCardProps {
  value: number;
  test: string;
  Icon: LucideIcon;
  info: string;
}

const CommunityDetailTopCard: FC<CommunityDetailTopCardProps> = ({
  value,
  test,
  Icon,
  info,
}) => {
  return (
    <Card className="w-full relative rounded-xl gap-0 p-0">
      <div className="p-6 pb-2 flex justify-between items-center">
        <h1 className=" text-3xl">{value}%</h1>
        <Icon className="text-muted-foreground" size={20} />
      </div>

      <div className="flex h-11 px-6 py-2 items-center gap-1 w-full text-sm font-semibold">
        <p className="text-xs text-muted-foreground font-normal whitespace-nowrap">
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

export default CommunityDetailTopCard;
