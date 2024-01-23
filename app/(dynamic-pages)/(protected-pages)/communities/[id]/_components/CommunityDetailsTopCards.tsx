import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FC } from "react";
import CommunityDetailTopCard from "./CommunityDetailTopCard";
import { ArrowBigUp, Calendar, Carrot, Trophy } from "lucide-react";

interface CommunityDetailsTopCardsProps {}

const CommunityDetailsTopCards: FC<CommunityDetailsTopCardsProps> = ({}) => {
  return (
    <ScrollArea className="w-full">
      <div className="flex w-full gap-3">
        <CommunityDetailTopCard
          value={10}
          Icon={Trophy}
          test="Proposal reward"
          info="Proposal rewards"
        />
        <CommunityDetailTopCard
          value={5}
          Icon={ArrowBigUp}
          test="Prioritization Reward"
          info="Proposal rewards"
        />
        <CommunityDetailTopCard
          value={5}
          Icon={Calendar}
          test="Validation Reward"
          info="Proposal rewards"
        />
        <CommunityDetailTopCard
          value={5}
          Icon={Carrot}
          test="Claim Stake Amount"
          info="Proposal rewards"
        />
        <CommunityDetailTopCard
          value={10}
          Icon={Trophy}
          test="Proposal reward"
          info="Proposal rewards"
        />
        <CommunityDetailTopCard
          value={10}
          Icon={Trophy}
          test="Proposal reward"
          info="Proposal rewards"
        />
        <CommunityDetailTopCard
          value={10}
          Icon={Trophy}
          test="Proposal reward"
          info="Proposal rewards"
        />
        <CommunityDetailTopCard
          value={10}
          Icon={Trophy}
          test="Proposal reward"
          info="Proposal rewards"
        />
        <CommunityDetailTopCard
          value={10}
          Icon={Trophy}
          test="Proposal reward"
          info="Proposal rewards"
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default CommunityDetailsTopCards;
