import DashboardCard from "@/components/ui/DashboardCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { FC } from "react";
import { rewardData } from "../data";

interface RewardCardsProps { }

const RewardCards: FC<RewardCardsProps> = ({ }) => {
  return (
    <ScrollArea className="mb-4">
      <div className="flex gap-3">
        {rewardData.map((reward, i) => (
          <DashboardCard
            title={reward.title}
            Icon={reward.Icon}
            description={reward.description}
            key={i}
            value={reward.value}
            changeValueColor
          />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default RewardCards;
