import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArrowBigUp, Calendar, Carrot, Trophy } from "lucide-react";
import GrantProjectDetailTopCard from "./GrantProjectDetailTopCard";

function GrantProjectDetailsTopCards({
}: {
  }) {
  return (
    <ScrollArea className="lg:col-span-2 xl:col-span-3">
      <div className="flex items-center w-full gap-4">
        <GrantProjectDetailTopCard
          value={0}
          Icon={Trophy}
          test="Proposal Reward"
          info="Proposal rewards"
        />
        <GrantProjectDetailTopCard
          value={0}
          Icon={ArrowBigUp}
          test="Prioritization Reward"
          info="Prioritization rewards"
        />
        <GrantProjectDetailTopCard
          value={0}
          Icon={Calendar}
          test="Validation Reward"
          info="Validation rewards"
        />
        <GrantProjectDetailTopCard
          value={0}
          Icon={Carrot}
          test="Claim Stake Amount"
          info="Proposal rewards"
        />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}

export default GrantProjectDetailsTopCards;
