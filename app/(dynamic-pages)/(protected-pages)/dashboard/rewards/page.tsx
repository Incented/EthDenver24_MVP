import MyRewardTabs from "./_components/MyRewardTabs";
import RewardCards from "./_components/RewardCards";

const RewardsPage = () => {
  return (
    <main className="mx-4 mb-4 sm:mx-8">
      <h1 className="mt-8 mb-4 text-3xl font-medium">Rewards</h1>
      <RewardCards />
      <h1 className="mb-4 text-xl">My Rewards</h1>
      <MyRewardTabs />
    </main>
  );
};

export default RewardsPage;
