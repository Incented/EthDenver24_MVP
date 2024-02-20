"use client";

import TaskCard from "@/components/presentational/Tasks/TaskCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardVerticalLayoutContext } from "@/contexts/CardVerticalLayoutContext";
import { Json } from "@/lib/database.types";
import { cn } from "@/lib/utils";
import { Table } from "@/types";
import { useContext } from "react";
import {
  TaskFileArray,
  filesSchema,
} from "../../tasks/[id]/_components/DraftTaskDetail";

type ExtendedTask = Table<"tasks"> & {
  task_community_name?: string;
};

type TaskTabProps = {
  tasks: ExtendedTask[];
  userId?: string;
};

const generalStatuses = [
  "prioritized",
  "claimed",
  "in_progress",
  "in_review",
  "completed",
  "failed",
  "expired",
  "protocol_update"
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

const TaskTab = ({ userId, tasks }: TaskTabProps) => {
  const { isVertical } = useContext(CardVerticalLayoutContext);
  return (
    <Tabs defaultValue="all tasks" className="">
      <ScrollArea className="whitespace-nowrap">
        <TabsList className="w-full lg:w-fit">
          <TabsTrigger value="all tasks" className="capitalize">
            All Tasks
          </TabsTrigger>
          <TabsTrigger value="my proposals" className="capitalize">
            My Proposals
          </TabsTrigger>
          {generalStatuses.map((status) => (
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

      <TabsContent value="all tasks">
        <div
          className={cn(
            "grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3",
            isVertical
              ? "sm:grid-cols-1 md:grid-cols-1"
              : "sm:grid-cols-2 md:grid-cols-3"
          )}
        >
          {tasks.filter(task => task.is_task_published).map((filteredTask, i) => (
            <TaskCard
              key={i}
              taskId={filteredTask.id}
              communityId={filteredTask.organization_id}
              imageUrl={getTaskFeaturedImage(filteredTask)}
              taskTitle={filteredTask.name}
              rewards={
                filteredTask.rewards
                  ? `${filteredTask.rewards} carrots`
                  : "0 carrots"
              }
              efforts={
                filteredTask.efforts ? `${filteredTask.efforts} days` : "0 days"
              }
              taskCommunity={filteredTask.task_community_name || "Community Name"}
              taskType={parseJsonToStringArray(filteredTask.task_types)}
              taskStatus={filteredTask.task_status || "new_task"}
              isVertical={isVertical}
              isPublished={filteredTask.is_task_published || false}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="my proposals">
        <div
          className={cn(
            "grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3",
            isVertical
              ? "sm:grid-cols-1 md:grid-cols-1"
              : "sm:grid-cols-2 md:grid-cols-3"
          )}
        >
          {tasks.filter(task => task.user_id === userId).map((filteredTask, i) => (
            <TaskCard
              key={i}
              taskId={filteredTask.id}
              communityId={filteredTask.organization_id}
              imageUrl={getTaskFeaturedImage(filteredTask)}
              taskTitle={filteredTask.name}
              taskCommunity={filteredTask.task_community_name || "Community Name"}
              taskType={parseJsonToStringArray(filteredTask.task_types)}
              rewards={
                filteredTask.rewards
                  ? `${filteredTask.rewards} carrots`
                  : "0 carrots"
              }
              efforts={
                filteredTask.efforts
                  ? `${filteredTask.efforts} days`
                  : "0 days"
              }
              taskStatus={filteredTask.task_status || "new_task"}
              isVertical={isVertical}
              isPublished={filteredTask.is_task_published || false}
            />
          ))}
        </div>
      </TabsContent>

      {generalStatuses.map((status) => (
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
                  key={i}
                  taskId={filteredTask.id}
                  communityId={filteredTask.organization_id}
                  imageUrl={getTaskFeaturedImage(filteredTask)}
                  taskTitle={filteredTask.name}
                  taskCommunity={filteredTask.task_community_name || "Community Name"}
                  taskType={parseJsonToStringArray(filteredTask.task_types)}
                  rewards={
                    filteredTask.rewards
                      ? `${filteredTask.rewards} carrots`
                      : "0 carrots"
                  }
                  efforts={
                    filteredTask.efforts
                      ? `${filteredTask.efforts} days`
                      : "0 days"
                  }
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
