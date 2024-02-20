import { FC } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import CommunityMember from "./CommunityMember";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
interface VetoPowerProps {}

const VetoPower: FC<VetoPowerProps> = ({}) => {
  return (
    <Card className="flex flex-col gap-4 p-8">
      <div className="flex items-center gap-2 mb-6 text-sm font-semibold">
        <p>Veto Power</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild className="cursor-pointer">
              <Info size={18} />
            </TooltipTrigger>
            <TooltipContent className="w-[200px]">
              <p className="text-xs">
                Wallet addresses specified to have veto power can shut down
                proposals they suspect have ill intent
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="flex flex-col gap-y-4">
        <CommunityMember name="Jeph Chisom" imageUrl="/assets/avatar_1.jpg" />
        <CommunityMember name="Randy Dias" imageUrl="/assets/avatar_3.jpg" />
        <CommunityMember name="Randy Dias" imageUrl="/assets/avatar_3.jpg" />
        <Button variant="ghost" className="justify-center text-primary">
          Show More
        </Button>
      </div>
    </Card>
  );
};

export default VetoPower;
