import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FC } from "react";
import CommunityDetailTopCard from "./CommunityDetailTopCard";
import { ArrowBigUp, Calendar, Carrot, Trophy } from "lucide-react";
import { RewardSettingsSchema } from "../../create-community/_components/createCommunitySchema";

interface CommunityDetailsTopCardsProps {}

export function CommunityDetailsTopCards({
  rewards,
}: {
  rewards: RewardSettingsSchema;
}) {
  return (
    <div className="grid items-center w-full gap-4 lg:grid-cols-2 2xl:grid-cols-4">
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
  );
}

export default CommunityDetailsTopCards;
