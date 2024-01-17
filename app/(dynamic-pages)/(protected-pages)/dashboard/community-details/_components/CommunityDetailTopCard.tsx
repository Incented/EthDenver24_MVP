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
    <Card className="relative w-full p-6">
      <Icon className="absolute right-3 top-3" size={20} />
      <h1 className="p-3 text-3xl">{value}%</h1>

      <div className="flex items-center gap-2 mb-6 text-sm font-semibold">
        <p className="text-xs whitespace-nowrap">{test}</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Info size={18} />
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
