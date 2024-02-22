import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Anchor } from "@/components/Anchor";
import DashboardCard from "@/components/ui/DashboardCard";
import { CardLayoutSwitcher } from "@/components/ui/card-layout-switcher";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { getAllOrganizationNames } from "@/data/user/organizations";
import { getAllNamesOfTaskTypes, getAllTasksWithCommunityNames } from "@/data/user/tasks";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { Suspense } from "react";
import FilterTypeMenu from "../FilterTypeMenu";
import SelectCommunity from "./_components/SelectCommunity";
import TaskLoadingSkeleton from "./_components/TaskLoadingSkeleton";
import TaskTab from "./_components/TaskTab";
import { taskData } from "./data";

async function TaskList() {
  const { id } = await serverGetLoggedInUser();
  const tasks = await getAllTasksWithCommunityNames();
  return <TaskTab tasks={tasks} userId={id} />
}

const DashboardPage = async () => {
  const [communities, taskTypes] = await Promise.all([
    getAllOrganizationNames(),
    getAllNamesOfTaskTypes(),
  ]);

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
          <FilterTypeMenu taskTypes={taskTypes} />
          <CardLayoutSwitcher />
        </div>
      </div>

      <div className="relative mt-20 xl:mt-4">
        <div className="flex gap-3 z-10 absolute right-[0.3rem] -top-16 xl:top-0">
          <Suspense fallback={<div>Loading...</div>}>
            <SelectCommunity communities={communities} />
          </Suspense>
          <Anchor href="dashboard/tasks/create-task">
            <Button>Submit Proposal</Button>
          </Anchor>
        </div>
        <Suspense fallback={<TaskLoadingSkeleton />}>
          <TaskList />
        </Suspense>
      </div>

      {/* <div className="mt-10">
        <Pagination currentPage={1} title="tasks" totalPages={10} />
      </div> */}
    </main>
  );
};

export default DashboardPage;
