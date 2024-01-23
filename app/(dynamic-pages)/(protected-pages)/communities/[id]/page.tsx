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
import { getCommunityDetailsAdmin } from "@/data/admin/organizations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Facebook, LinkIcon, Linkedin, Twitter } from "lucide-react";

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
  const community = await getCommunityDetailsAdmin({ id });
  console.log(community);

  return (
    <main className="mx-8 mb-10 ">
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
      <div className="grid grid-cols-[auto,1fr] gap-4 w-full">
        <div className="flex flex-col gap-4 w-[280px] h-screen overflow-y-auto">
          <CommunityInfo />
          <div className="w-full">
            <CommunityMembers />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3 overflow-auto">
          <div className="grid gap-4 lg:col-span-2 2xl:col-span-3">
            <CommunityDetailsTopCards />
            <div className="grid grid-cols-4 gap-4 w-full">
              <CarrotPotCard />
              <PeriodsCard />
              <PriorityCards />
            </div>
            <Card className="w-full p-8 bg-muted border-none ">
              <div className="flex items-center w-full mb-4">
                <h1 className="text-[20px] font-semibold">Task</h1>
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
