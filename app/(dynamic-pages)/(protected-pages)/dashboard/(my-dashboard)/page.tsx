import TaskCard from "@/components/presentational/Tasks/TaskCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { ChevronDown, LayoutList } from "lucide-react";
import React from "react";
import FilterTypeMenu from "../FilterTypeMenu";
import DashboardCard from "@/components/ui/DashboardCard";
import Pagination from "@/components/ui/Pagination";
import { taskData } from "./data";

const DashboardPage = () => {
  return (
    <main className="mx-8 mb-10 ">
      <h1 className="mt-8 text-3xl">My Home</h1>

      <div className="grid gap-3 mt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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

      <div className="flex items-center justify-between gap-3 mt-6">
        <h1 className="text-xl">Tasks</h1>

        <div className="flex items-center gap-3">
          <Input placeholder="search tasks" />

          <Button variant="outline">Filter</Button>
          <FilterTypeMenu />

          <Button variant="outline">
            <LayoutList size={20} />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-6 md:flex-row-reverse md:flex">
        <div className="flex items-center gap-2 px-4 py-1 rounded-md bg-slate-100 dark:bg-accent min-w-fit max-h-fit h-fit">
          <Avatar>
            <AvatarImage
              className="w-8 h-8 rounded-full"
              src="/assets/avatar_1.jdpg"
            />
            <AvatarFallback>BF</AvatarFallback>
          </Avatar>
          <p className="">Buan Fund</p>

          <Popover>
            <PopoverTrigger>
              <ChevronDown size={18} className="ml-auto" />
            </PopoverTrigger>
            <PopoverContent
              sideOffset={30}
              align="start"
              className="w-[240px] px-4 flex flex-col justify-start gap-6 "
            >
              <RadioGroup defaultValue="all">
                <div className="flex items-center gap-2 mb-2">
                  <RadioGroupItem value="all" id="r1" />
                  <Label htmlFor="r1">All Community</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="buanFund" id="r2" />
                  <Avatar>
                    <AvatarImage
                      className="w-8 h-8 rounded-full"
                      src="/assets/avatar_1.jpg"
                    />
                  </Avatar>
                  <Label htmlFor="r2">Buan Fund</Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="" id="r3" />
                  <Avatar>
                    <AvatarImage
                      className="w-8 h-8 rounded-full"
                      src="/assets/avatar_1.jpg"
                    />
                  </Avatar>
                  <Label htmlFor="r3">Nature Lovers</Label>
                </div>
              </RadioGroup>
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full overflow-x-scroll lg:col-start-1">
          <Tabs>
            <TabsList className="w-full md:max-w-lg">
              <TabsTrigger value="all">All Task</TabsTrigger>
              <TabsTrigger value="priortized">Priortized</TabsTrigger>
              <TabsTrigger value="inProgress">In Propress</TabsTrigger>
              <TabsTrigger value="inReview">In Review</TabsTrigger>
              <TabsTrigger value="complete">Complete</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
            <TabsContent value="all">All Task</TabsContent>
            <TabsContent value="priortized">priortized</TabsContent>
            <TabsContent value="inProgress">In progress</TabsContent>
            <TabsContent value="inReview">In Review</TabsContent>
            <TabsContent value="complete">Completed</TabsContent>
            <TabsContent value="failed">failed</TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3">
        <TaskCard />
        <TaskCard
          imageUrl="/images/task2.jpeg"
          taskTitle="Install trash container"
          taskType="Others"
          taskStatus="In Progress"
        />
        <TaskCard taskStatus="Prioritized" />
        <TaskCard taskStatus="Prioritized" />
        {/* <TaskCard taskStatus="Prioritized" />
        <TaskCard
          imageUrl="/images/task2.jpeg"
          taskTitle="Install trash container"
          taskType="Others"
          taskStatus="In Progress"
        /> */}
      </div>
      <div className="mt-10">
        <Pagination currentPage={1} title="tasks" totalPages={10} />
      </div>
    </main>
  );
};

export default DashboardPage;
