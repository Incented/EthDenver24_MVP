import { FC } from "react";
import { rewardData } from "./data";
import DashboardCard from "@/components/ui/DashboardCard";

interface pageProps {}

const RewardsPage: FC<pageProps> = ({}) => {
  return (
    <main className="mx-8 mb-10 ">
      <h1 className="mt-8 text-2xl">Rewards</h1>

      <div className="grid gap-3 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {rewardData.map((reward, i) => (
          <DashboardCard
            title={reward.title}
            Icon={reward.Icon}
            description={reward.description}
            key={i}
            value={reward.value}
          />
        ))}
      </div>
    </main>
  );
};

export default RewardsPage;
