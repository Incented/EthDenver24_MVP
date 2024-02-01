import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FC } from "react";
import CommunityDetailTopCard from "./CommunityDetailTopCard";
import { ArrowBigUp, Calendar, Carrot, Trophy } from "lucide-react";
import { RewardSettingsSchema } from "../../create-community/_components/createCommunitySchema";

interface CommunityDetailsTopCardsProps {}

export function CommunityDetailsTopCards() {
  const rewards = {
    proposalReward: 20,
    prioritizationReward: 30,
    validationReward: 50,
    claimStakeAmount: 100,
  };

  return (
    <div className="flex w-full gap-3">
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
