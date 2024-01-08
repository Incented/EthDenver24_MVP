import { FC } from "react";
import { rewardData } from "./data";
import DashboardCard from "@/components/ui/DashboardCard";
import MyRewardTabs from "./_components/MyRewardTabs";
import Pagination from "@/components/ui/Pagination";

interface pageProps {}

const RewardsPage: FC<pageProps> = ({}) => {
  return (
    <main className="mx-8 mb-4 ">
      <h1 className="mt-8 text-2xl">Rewards</h1>

      <div className="grid gap-3 mt-2 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
      <h1 className="mb-4 text-xl">My Rewards</h1>

      <MyRewardTabs />

      <Pagination currentPage={1} title="tasks" totalPages={10} />
    </main>
  );
};

export default RewardsPage;
