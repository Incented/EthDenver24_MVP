import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { LayoutList } from "lucide-react";
import React from "react";
import FilterTypeMenu from "../FilterTypeMenu";
import DashboardCard from "@/components/ui/DashboardCard";
import Pagination from "@/components/ui/Pagination";
import { taskData } from "./data";
import TaskTab from "./_components/TaskTab";
import SelectCommunity from "./_components/SelectCommunity";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { CardLayoutSwitcher } from "@/components/ui/card-layout-switcher";
import { Anchor } from "@/components/Anchor";

const DashboardPage = () => {
  return (
    <main className="px-8 pb-40 ">
      <h1 className="mt-8 text-3xl font-medium">My Home</h1>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-full gap-3 py-8 pt-4">
          {taskData.map((task, i) => (
            <DashboardCard
              key={i}
              title={task.taskStatus}
              value={task.value}
              description={task.description}
              Icon={task.Icon}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl">Tasks</h1>
        <div className="flex items-center gap-2">
          <Input placeholder="Search tasks" />
          <FilterTypeMenu />
          <CardLayoutSwitcher />
        </div>
      </div>

      <div className="relative mt-20 xl:mt-4">
        <div className="flex gap-3 z-10 absolute right-[0.3rem] -top-16 xl:top-0">
          <SelectCommunity />
          <Anchor href="dashboard/tasks/create-task">
            <Button>Submit Proposal</Button>
          </Anchor>
        </div>

        <TaskTab />
      </div>

      {/* <div className="mt-10">
        <Pagination currentPage={1} title="tasks" totalPages={10} />
      </div> */}
    </main>
  );
};

export default DashboardPage;
