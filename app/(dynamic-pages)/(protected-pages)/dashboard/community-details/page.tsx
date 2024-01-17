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
import TaskTab from "../(my-dashboard)/_components/TaskTab";
import Pagination from "@/components/ui/Pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface pageProps {}

const CommunityDetailsPage: FC<pageProps> = ({}) => {
  return (
    <main className="mx-8 mb-10 ">
      <div className="grid items-center grid-cols-2 mt-8 mb-6">
        <div className="md:col-span-2">
          <GoBack />
        </div>
        <h1 className="col-span-2 row-start-2 mt-4 text-3xl md:col-span-1">
          Community Details
        </h1>
        <div className="ml-auto ">
          <Button className="w-32">Join</Button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3 2xl:grid-cols-4">
        <div className="grid gap-8 lg:col-span-2 2xl:col-span-3">
          <CommunityDetailsTopCards />
          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
            <CarrotPotCard />
            <PeriodsCard />
            <div className="md:col-span-2 2xl:col-span-1">
              <PriorityCards />
            </div>
          </div>
          <Card className="w-full p-6">
            <div className="flex items-center w-full mb-4">
              <h1 className="text-[20px] font-semibold">Task</h1>
              <div className="flex gap-4 ml-auto">
                <Search placeholder="Search Tasks..." />
                <Button variant="outline">Filter</Button>
              </div>
            </div>
            <div className="">
              <TaskTab />
              <Pagination currentPage={1} title="tasks" totalPages={10} />
            </div>
          </Card>
        </div>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 lg:row-start-1 lg:col-span-1 2xl:col-span-1">
          <CommunityInfo />
          <div className="">
            <CommunityMembers />
          </div>
        </section>
      </div>
    </main>
  );
};

export default CommunityDetailsPage;
