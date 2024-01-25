import MyRewardTabs from "./_components/MyRewardTabs";
import Pagination from "@/components/ui/Pagination";
import RewardCards from "./_components/RewardCards";
import { Button } from "@/components/ui/button";

const RewardsPage = () => {
  return (
    <main className="mx-8 mb-4 ">
      <h1 className="mt-8 mb-4 text-3xl font-medium">Rewards</h1>

      <RewardCards />
      <h1 className="mb-4 text-xl">My Rewards</h1>

      <MyRewardTabs />

      <div className="flex justify-center sm:hidden">
        <Button variant="link">Show more</Button>
      </div>

      {/* <div className="hidden sm:flex">
        <Pagination currentPage={1} title="tasks" totalPages={10} />
      </div> */}
    </main>
  );
};

export default RewardsPage;
