import GoBack from "@/components/ui/GoBack";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import CommunityInfo from "./_components/CommunityInfo";
import CommunityMembers from "./_components/CommunityMembers";

import { Card } from "@/components/ui/card";

import { Search } from "@/components/Search";
import CarrotPotCard from "./_components/CarrotPotCard";
import CommunityDetailsTopCards from "./_components/CommunityDetailsTopCards";
import PeriodsCard from "./_components/PeriodsCard";
import PriorityCards from "./_components/PriorityCards";
import TaskTab from "../../dashboard/(my-dashboard)/_components/TaskTab";
import Pagination from "@/components/ui/Pagination";
import { z } from "zod";
import moment from "moment";
import {
  getOrganizationById,
  getTeamMembersCountInOrganization,
  getTeamMembersInOrganization,
} from "@/data/user/organizations";
import {
  Periods,
  RewardSettingsSchema,
  protocolConfigurationSchema,
  rewardSettingsSchema,
} from "../create-community/_components/createCommunitySchema";
import { TeamMembersTableProps } from "@/types";
import { CardLayoutSwitcher } from "@/components/ui/card-layout-switcher";
import { getCommunityTasks } from "@/data/user/tasks";

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
  const [community, members, communityMembersCount, communityTasks] =
    await Promise.all([
      getOrganizationById(id),
      getTeamMembersInOrganization(id),
      getTeamMembersCountInOrganization(id),
      getCommunityTasks(id),
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
    <div className="relative mx-8 overflow-hidden">
      <div className="grid items-center grid-cols-2 mt-8 mb-4">
        <div className="md:col-span-2 h-9">
          <GoBack />
        </div>
        <h1 className="col-span-2 font-medium row-start-2 mt-4 text-3xl md:col-span-1">
          Community Details
        </h1>
        <div className="ml-auto ">
          <Button className="w-32">Join</Button>
        </div>
      </div>
      {/* Content */}
      <div className="grid grid-cols-[auto,1fr] gap-4 h-[calc(100vh-400px)]   md:h-[calc(100vh-600px)] xl:h-[calc(100vh-220px)] overflow-hidden w-full ">
        {/* Members */}
        <div className="flex flex-col gap-4 rounded-lg w-[280px]">
          <CommunityInfo
            communityName={community.title}
            communityDescription={community.description ?? ""}
            communityUrls={communityUrls}
            communityMembersCount={communityMembersCount}
          />
          <div className="h-20 md:h-20 xl:h-72 rounded-xl overflow-auto">
            <CommunityMembers communityMembers={normalizedMembers} />
          </div>
        </div>
        {/* Details */}
        <div className="h-full overflow-y-auto w-full">
          <div className="flex flex-col gap-4 w-full">
            <CommunityDetailsTopCards rewards={rewards} />
            <div className="grid grid-cols-4 gap-4 w-full">
              <CarrotPotCard />
              <PeriodsCard periods={periods} />
              <PriorityCards
                prioritizationQourum={
                  community.prioritization_quorum_percentage ?? 25
                }
                validationQuorum={community.validation_quorum_percentage ?? 25}
              />
            </div>
            <Card className="w-full p-8 pb-4 bg-muted border-none ">
              <div className="flex items-center w-full mb-4">
                <h1 className="text-[20px] font-semibold">Tasks</h1>
                <div className="flex gap-2 ml-auto">
                  <Search placeholder="Search Tasks..." />
                  <Button variant="outline">Filter</Button>
                  <CardLayoutSwitcher />
                </div>
              </div>
              <div>
                <TaskTab tasks={communityTasks} />
                <div className="pt-4">
                  <Pagination
                    count={20}
                    title="Tasks"
                    totalPages={10}
                    className="bg-transparent"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
