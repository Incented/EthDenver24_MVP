"use client";

import TaskCard from "@/components/presentational/Tasks/TaskCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardVerticalLayoutContext } from "@/contexts/CardVerticalLayoutContext";
import { cn, parseJsonToStringArray } from "@/lib/utils";
import { Table } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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
  isGrant?: boolean;
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

const TaskTab = ({ userId, tasks, isGrant }: TaskTabProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const communityFilterParams = searchParams?.getAll('community') ?? []
  const communityFilterTypeParams = searchParams?.getAll('type') ?? []
  const { isVertical } = useContext(CardVerticalLayoutContext);
  return (
    <Tabs defaultValue="all tasks" >
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
            "grid gap-4 mt-4 sm:grid-cols-2 ",
            isVertical
              ? "sm:grid-cols-1 md:grid-cols-1"
              : "sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
          )}
        >
          {tasks
            .filter(task => task.is_task_published)
            .filter(filteredTask =>
              communityFilterParams.includes('all') ? true : communityFilterParams.length === 0 || communityFilterParams.includes(filteredTask.task_community_name?.toLowerCase().replace(/\s+/g, '-') || "")
            )
            .filter(filteredTask =>
              communityFilterTypeParams.length === 0 || communityFilterTypeParams.some(param =>
                (Array.isArray(filteredTask.task_types) ? filteredTask.task_types : [filteredTask.task_types]).includes(param)
              )
            )
            .map((filteredTask, i) => (
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
                isGrant={isGrant}
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
          {tasks.filter(task => task.user_id === userId).filter(filteredTask =>
            communityFilterParams.includes('all') ? true : communityFilterParams.length === 0 || communityFilterParams.includes(filteredTask.task_community_name?.toLowerCase().replace(/\s+/g, '-') || "")
          ).map((filteredTask, i) => (
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
              .filter((task) => task.task_status === status).filter(filteredTask =>
                communityFilterParams.includes('all') ? true : communityFilterParams.length === 0 || communityFilterParams.includes(filteredTask.task_community_name?.toLowerCase().replace(/\s+/g, '-') || "")
              )
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
