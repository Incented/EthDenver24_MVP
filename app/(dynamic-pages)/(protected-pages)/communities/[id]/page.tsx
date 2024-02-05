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
import { getOrganizationById } from "@/data/user/organizations";
import {
  protocolConfigurationSchema,
  rewardSettingsSchema,
} from "../create-community/_components/createCommunitySchema";

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
  const community = await getOrganizationById(id);

  const localRewards = localStorage.getItem("rewardSettings");
  const temporaryRewards = rewardSettingsSchema.parse(
    JSON.parse(localRewards || "{}")
  );

  const localConfiguration = localStorage.getItem("protocolConfiguration");
  const temporaryConfiguration = JSON.parse(localConfiguration || "{}");
  const temporaryPeriods = {
    prioritizationPeriod: temporaryConfiguration.prioritizationPeriod || 0,
    contributionPeriod: temporaryConfiguration.contributionPeriod || 0,
    validationPeriod: temporaryConfiguration.validationPeriod || 0,
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
          <CommunityInfo communityName={community.title} />
          <div className="h-20 md:h-20 xl:h-72 rounded-xl overflow-auto">
            <CommunityMembers />
          </div>
        </div>
        {/* Details */}
        <div className="h-full overflow-y-auto w-full">
          <div className="flex flex-col gap-4 w-full">
            <CommunityDetailsTopCards rewards={temporaryRewards} />
            <div className="grid grid-cols-4 gap-4 w-full">
              <CarrotPotCard />
              <PeriodsCard periods={temporaryPeriods} />
              <PriorityCards />
            </div>
            <Card className="w-full p-8 pb-4 bg-muted border-none ">
              <div className="flex items-center w-full mb-4">
                <h1 className="text-[20px] font-semibold">Tasks</h1>
                <div className="flex gap-4 ml-auto">
                  <Search placeholder="Search Tasks..." />
                  <Button variant="outline">Filter</Button>
                </div>
              </div>
              <div>
                <TaskTab />
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
