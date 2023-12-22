import { FC } from "react";
import CommunityMember from "./CommunityMember";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface CommunityMembersProps {}

const CommunityMembers: FC<CommunityMembersProps> = ({}) => {
  return (
    <Card className="p-4 w-[281px]">
      <h1 className="mb-6 text-sm font-semibold">Community members</h1>
      <div className="flex flex-col mb-10 gap-y-4">
        <CommunityMember name="Randy Dias" imageUrl="/assets/avatar_3.jpg" />
        <CommunityMember name="Randy Dias" imageUrl="/assets/avatar_3.jpg" />
        <CommunityMember name="Randy Dias" imageUrl="/assets/avatar_3.jpg" />
        <CommunityMember name="Randy Dias" imageUrl="/assets/avatar_3.jpg" />
        <CommunityMember name="Randy Dias" imageUrl="/assets/avatar_3.jpg" />
      </div>

      <div className="">
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
          <CommunityMember
            name="Anderson Deo"
            imageUrl="/assets/avatar_2.jpg"
          />
          <CommunityMember name="Randy Dias" imageUrl="/assets/avatar_3.jpg" />
        </div>
      </div>
    </Card>
  );
};

export default CommunityMembers;