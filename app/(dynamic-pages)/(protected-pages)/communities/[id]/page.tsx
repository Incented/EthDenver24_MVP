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

  return (
    <main className="relative mx-8 mb-10 h-screen ">
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
      <div className="relative grid grid-cols-[auto,1fr] gap-4 w-full">
        <div className="flex flex-col gap-4 rounded-lg w-[280px] h-full">
          <CommunityInfo communityName={community.title} />
          <div className=" w-full h-screen overflow-y-auto">
            <CommunityMembers />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3 pb-24 h-fit">
          <div className="grid gap-4 lg:col-span-2 2xl:col-span-3">
            <CommunityDetailsTopCards />
            <div className="grid grid-cols-4 gap-4 w-full">
              <CarrotPotCard />
              <PeriodsCard />
              <PriorityCards />
            </div>
            <Card className="w-full p-8 bg-muted border-none ">
              <div className="flex items-center w-full mb-4">
                <h1 className="text-[20px] font-semibold">Tasks</h1>
                <div className="flex gap-4 ml-auto">
                  <Search placeholder="Search Tasks..." />
                  <Button variant="outline">Filter</Button>
                </div>
              </div>
              <div>
                <TaskTab />
                <Pagination currentPage={1} title="tasks" totalPages={10} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
