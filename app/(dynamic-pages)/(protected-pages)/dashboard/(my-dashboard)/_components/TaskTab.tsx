"use client";

import TaskCard from "@/components/presentational/Tasks/TaskCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, useContext } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { CardVerticalLayoutContext } from "@/contexts/CardVerticalLayoutContext";
import { Table } from "@/types";
import {
  TaskFileArray,
  filesSchema,
} from "../../tasks/[id]/_components/DraftTaskDetail";
import { Json } from "@/lib/database.types";

type TaskTabProps = {
  tasks: Table<"tasks">[];
};

type ITask = {
  taskCategory: string;
  tasks: {
    imageUrl: string;
    taskTitle: string;
    taskType: string;
    taskStatus: string;
  }[];
};

const allStatuses = [
  "draft",
  "published",
  "prioritized",
  "claimed",
  "in_progress",
  "in_review",
  "completed",
  "failed",
  "expired",
];

function parseJsonToStringArray(json: Json): string[] {
  if (typeof json === "string") {
    try {
      const parsed = JSON.parse(json);
      if (
        Array.isArray(parsed) &&
        parsed.every((item) => typeof item === "string")
      ) {
        return parsed;
      }
    } catch (error) {
      console.error("Failed to parse JSON:", error);
    }
  }
  return []; // Return an empty array if parsing fails or if the JSON is not an array of strings
}

const getTaskFeaturedImage = (task: Table<"tasks">) => {
  const imageUrl = "/images/task1.jpeg";
  let files: TaskFileArray = []; // Assuming TaskFileArray is correctly typed
  try {
    const arg =
      typeof task.files === "string" ? JSON.parse(task.files) : task.files;
    files = filesSchema.parse(arg); // This should ensure files is TaskFileArray
  } catch (error) {
    console.log(error);
  }

  let featuredImageUrl = imageUrl;
  // After parsing and validation, we know what `files` is, so we use it directly
  if (files.length > 0 && files[0].url) {
    featuredImageUrl = files[0].url; // Correctly typed access to `url`
  }

  return featuredImageUrl;
};

const TaskTab = ({ tasks }: TaskTabProps) => {
  const { isVertical } = useContext(CardVerticalLayoutContext);
  return (
    <Tabs defaultValue="all tasks" className="">
      <ScrollArea className="whitespace-nowrap">
        <TabsList className="w-full lg:w-fit">
          <TabsTrigger value="all tasks" className="capitalize">
            All Tasks
          </TabsTrigger>
          {allStatuses.map((status) => (
            <TabsTrigger key={status} value={status} className="capitalize">
              {status
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
                .replace("_", " ")}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* {tasks.map((task) => (
        <TabsContent
          value={task.task_status || ""}
          key={task.task_status || ""}
        >
          {
            <div
              className={cn(
                "grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3",
                isVertical
                  ? "sm:grid-cols-1 md:grid-cols-1"
                  : "sm:grid-cols-2 md:grid-cols-3"
              )}
            >
              {tasks.map((task, i) => (
                <TaskCard
                  key={i}
                  imageUrl={getTaskFeaturedImage(task)}
                  taskTitle={task.name}
                  taskType={parseJsonToStringArray(task.task_types)} // Parsing task_types to string[]
                  taskStatus={task.task_status || "in_progress"}
                  isVertical={isVertical}
                />
              ))}
            </div>
          }
        </TabsContent>
      ))} */}

      <TabsContent value="all tasks">
        <div
          className={cn(
            "grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3",
            isVertical
              ? "sm:grid-cols-1 md:grid-cols-1"
              : "sm:grid-cols-2 md:grid-cols-3"
          )}
        >
          {tasks.map((filteredTask, i) => (
            <TaskCard
              key={i}
              taskId={filteredTask.id}
              imageUrl={getTaskFeaturedImage(filteredTask)}
              taskTitle={filteredTask.name}
              taskCommunity="Community Name"
              taskType={parseJsonToStringArray(filteredTask.task_types)}
              taskStatus={filteredTask.task_status || "in_progress"}
              isVertical={isVertical}
            />
          ))}
        </div>
      </TabsContent>

      {allStatuses.map((status) => (
        <TabsContent key={status} value={status}>
          <div
            className={cn(
              "grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3",
              isVertical
                ? "sm:grid-cols-1 md:grid-cols-1"
                : "sm:grid-cols-2 md:grid-cols-3"
            )}
          >
            {tasks
              .filter((task) => task.task_status === status)
              .map((filteredTask, i) => (
                <TaskCard
                  taskId={filteredTask.id}
                  key={i}
                  imageUrl={getTaskFeaturedImage(filteredTask)}
                  taskTitle={filteredTask.name}
                  taskCommunity="Community Name"
                  taskType={parseJsonToStringArray(filteredTask.task_types)}
                  taskStatus={filteredTask.task_status || "in_progress"}
                  isVertical={isVertical}
                  isPublished={filteredTask.is_task_published || false}
                />
              ))}
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TaskTab;
