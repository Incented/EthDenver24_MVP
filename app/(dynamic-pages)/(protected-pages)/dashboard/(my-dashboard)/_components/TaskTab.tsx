"use client";

import TaskCard from "@/components/presentational/Tasks/TaskCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, useContext } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CardVerticalLayoutContext } from "@/contexts/CardVerticalLayoutContext";

interface TaskTabProps {}

type ITask = {
  taskCategory: string;
  tasks: {
    imageUrl: string;
    taskTitle: string;
    taskType: string;
    taskStatus: string;
  }[];
};

const data: ITask[] = [
  {
    taskCategory: "all tasks",
    tasks: [
      {
        imageUrl: "/images/task2.jpeg",
        taskTitle: "Install trash container",
        taskType: "Others",
        taskStatus: "In Progress",
      },
      {
        imageUrl: "/images/task2.jpeg",
        taskTitle: "Install trash container",
        taskType: "Others",
        taskStatus: "Prioritized",
      },
      {
        imageUrl: "/images/task2.jpeg",
        taskTitle: "Install trash container",
        taskType: "Others",
        taskStatus: "In Progress",
      },
      {
        imageUrl: "/images/task2.jpeg",
        taskTitle: "Install trash container",
        taskType: "Others",
        taskStatus: "Prioritized",
      },
      {
        imageUrl: "/images/task2.jpeg",
        taskTitle: "Install trash container",
        taskType: "Others",
        taskStatus: "In Progress",
      },
    ],
  },
  {
    taskCategory: "priortized",
    tasks: [],
  },

  {
    taskCategory: "claimed",
    tasks: [],
  },
  {
    taskCategory: "in progress",
    tasks: [],
  },
  {
    taskCategory: "in review",
    tasks: [],
  },
  {
    taskCategory: "complete",
    tasks: [],
  },
  {
    taskCategory: "failed",
    tasks: [],
  },
  {
    taskCategory: "expired",
    tasks: [],
  },
  {
    taskCategory: "my proposals",
    tasks: [],
  },
];

const TaskTab: FC<TaskTabProps> = ({}) => {
  const { isVertical } = useContext(CardVerticalLayoutContext);
  return (
    <Tabs defaultValue="all tasks" className="">
      <ScrollArea className="whitespace-nowrap">
        <TabsList className="w-full lg:w-fit">
          {data.map((task) => (
            <TabsTrigger
              key={task.taskCategory}
              value={task.taskCategory}
              className="capitalize"
            >
              {task.taskCategory}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {data.map((task) => (
        <TabsContent value={task.taskCategory} key={task.taskCategory}>
          {
            <div
              className={cn(
                "grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-4",
                isVertical
                  ? "sm:grid-cols-1 md:grid-cols-1"
                  : "sm:grid-cols-2 md:grid-cols-4"
              )}
            >
              {task.tasks.map((data, i) => (
                <TaskCard
                  key={i}
                  imageUrl="/images/task2.jpeg"
                  taskTitle="Install trash container"
                  taskType="Others"
                  taskStatus="In Progress"
                  isVertical={isVertical}
                />
              ))}
            </div>
          }
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TaskTab;
