import GoBack from "@/components/ui/GoBack";
import { Button } from "@/components/ui/button";
import CommunityInfo from "./_components/CommunityInfo";
import CommunityMembers from "./_components/CommunityMembers";

import { Card } from "@/components/ui/card";

import { Search } from "@/components/Search";
import Pagination from "@/components/ui/Pagination";
import {
  getOrganizationAdmins,
  getOrganizationById,
  getTeamMembersCountInOrganization,
  getTeamMembersInOrganization,
} from "@/data/user/organizations";
import { getCommunityTasks, getCommunityTasksWithCommunityNames } from "@/data/user/tasks";
import { TeamMembersTableProps } from "@/types";
import { Filter } from "lucide-react";
import moment from "moment";
import { z } from "zod";
import TaskTab from "../../dashboard/(my-dashboard)/_components/TaskTab";
import {
  Periods,
  RewardSettingsSchema
} from "../create-community/_components/createCommunitySchema";
import Admin from "./_components/Admin";
import CarrotPotCard from "./_components/CarrotPotCard";
import CommunityDetailsTopCards from "./_components/CommunityDetailsTopCards";
import PeriodsCard from "./_components/PeriodsCard";
import PriorityCards from "./_components/PriorityCards";
import TotalRewards from "./_components/TotalRewards";
import TotalTasks from "./_components/TotalTasks";
import VetoPower from "./_components/VetoPower";

const paramsSchema = z.object({
  id: z.coerce.string(),
});

export default async function CommunityDetailsPage({
  params,
}: {
  params: unknown;
}) {
  const parsedParams = paramsSchema.parse(params);
  const { id } = parsedParams;
  const [community, members, communityMembersCount, communityTasks, admins] =
    await Promise.all([
      getOrganizationById(id),
      getTeamMembersInOrganization(id),
      getTeamMembersCountInOrganization(id),
      getCommunityTasks(id),
      getOrganizationAdmins(id),
      getCommunityTasksWithCommunityNames(id),
    ]);

  const normalizedMembers: TeamMembersTableProps["members"] = members.map(
    (member, index) => {
      const userProfile = Array.isArray(member.user_profiles)
        ? member.user_profiles[0]
        : member.user_profiles;
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      return {
        index: index + 1,
        id: userProfile.id,
        avatar_url: userProfile.avatar_url,
        name: userProfile.full_name ?? `User ${userProfile.id}`,
        role: member.member_role,
        created_at: moment(member.created_at).format("DD MMM YYYY"),
      };
    }
  );
  const normalizedAdmins: TeamMembersTableProps["members"] = admins.map(
    (member, index) => {
      const userProfile = Array.isArray(member.user_profiles)
        ? member.user_profiles[0]
        : member.user_profiles;
      if (!userProfile) {
        throw new Error("User profile not found");
      }
      return {
        index: index + 1,
        id: userProfile.id,
        avatar_url: userProfile.avatar_url,
        name: userProfile.full_name ?? `User ${userProfile.id}`,
        role: member.member_role,
        created_at: moment(member.created_at).format("DD MMM YYYY"),
      };
    }
  );



  const rewards: RewardSettingsSchema = {
    proposalReward: community.proposal_absolute_reward ?? 0,
    prioritizationReward: community.prioritization_reward_percentage ?? 0,
    validationReward: community.validation_reward_percentage ?? 0,
    claimStakeAmount: community.claim_stake_amount_percentage ?? 100,
  };

  const periods: Periods = {
    prioritizationPeriod: community.prioritization_period ?? 0,
    contributionPeriod: community.contribution_period ?? 0,
    validationPeriod: community.validation_period ?? 0,
  };

  const communityUrls = {
    website: community.website_url ?? "",
    facebook: community.facebook_url ?? "",
    twitter: community.twitter_url ?? "",
    linkedin: community.linkedin_url ?? "",
    youtube: community.youtube_url ?? "",
    instagram: community.instagram_url ?? "",
  };

  return (
    <div className="relative mx-8 mb-10">
      <div className="grid items-center grid-cols-2 mt-8 mb-4">
        <div className="md:col-span-2 h-9">
          <GoBack />
        </div>
        <h1 className="col-span-2 row-start-2 mt-4 text-3xl font-medium md:col-span-1">
          Community Details
        </h1>

        <div className="ml-auto ">
          <Button className="w-32">Join</Button>
        </div>
      </div>
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <div className="space-y-4 md:col-span-2 lg:grid lg:grid-cols-2 lg:gap-3 xl:grid-cols-3 xl:col-span-3 2xl:col-span-4">
          <CommunityDetailsTopCards rewards={rewards} />
          <CarrotPotCard />
          <PeriodsCard periods={periods} />
          <PriorityCards
            prioritizationQourum={
              community.prioritization_quorum_percentage ?? 25
            }
            validationQuorum={community.validation_quorum_percentage ?? 25}
          />
          <div className="grid gap-3 lg:grid-cols-2 lg:col-span-2 xl:col-span-3">
            <TotalTasks />
            <TotalRewards />
          </div>
          <Card className="w-full p-4 pb-4 border-none bg-muted-foreground/10 lg:col-span-2 xl:col-span-3">
            <h1 className="text-[20px] font-semibold mb-4">Tasks</h1>
            <div className="flex items-center w-full mb-4">
              <div className="flex gap-2">
                <Search placeholder="Search Tasks..." />
                <Button variant="outline">
                  <Filter className="mr-2" />
                  Filter
                </Button>
              </div>
            </div>
            <div>
              <TaskTab tasks={communityTasks} />
              <div className="hidden pt-4 md:flex">
                <Pagination
                  count={20}
                  title="Tasks"
                  totalPages={10}
                  className="bg-transparent"
                />
              </div>
              <Button
                variant="ghost"
                className="justify-center w-full text-primary md:hidden"
                size="lg"
              >
                Show More
              </Button>
            </div>
          </Card>
        </div>

        <div className="space-y-4 md:col-span-1 md:row-start-1 2xl:col-span-1">
          <CommunityInfo
            communityName={community.title}
            communityDescription={community.description ?? ""}
            communityUrls={communityUrls}
            communityMembersCount={communityMembersCount}
            commuityFee={community.community_fee_percentage}
          />
          <Admin communityMembers={normalizedAdmins} />

          <CommunityMembers communityMembers={normalizedMembers} />
          <VetoPower />
        </div>
      </div>
    </div>
  );
}
