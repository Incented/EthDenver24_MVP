import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CommunityDetailTopCard from "./CommunityDetailTopCard";
import { ArrowBigUp, Calendar, Carrot, Trophy } from "lucide-react";
import { RewardSettingsSchema } from "../../create-community/_components/createCommunitySchema";

export function CommunityDetailsTopCards({
  rewards,
}: {
  rewards: RewardSettingsSchema | undefined;
}) {
  return (
    <ScrollArea className="lg:col-span-2 xl:col-span-3">
      <div className="flex items-center w-full gap-4">
        <CommunityDetailTopCard
          value={rewards?.proposalReward ?? 0}
          Icon={Trophy}
          test="Proposal Reward"
          info="Proposal rewards"
        />
        <CommunityDetailTopCard
          value={rewards?.prioritizationReward ?? 0}
          Icon={ArrowBigUp}
          test="Prioritization Reward"
          info="Prioritization rewards"
        />
        <CommunityDetailTopCard
          value={rewards?.validationReward ?? 0}
          Icon={Calendar}
          test="Validation Reward"
          info="Validation rewards"
        />
        <CommunityDetailTopCard
          value={rewards?.claimStakeAmount ?? 0}
          Icon={Carrot}
          test="Claim Stake Amount"
          info="Proposal rewards"
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default CommunityDetailsTopCards;
