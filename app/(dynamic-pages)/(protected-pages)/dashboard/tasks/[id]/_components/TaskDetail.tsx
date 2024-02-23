import {
  CarrotStrikIconDark
} from "@/components/Icons/CustomIcons";
import { Card } from "@/components/ui/card";
import Detail from "./Detail";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Carrot,
  Plus
} from "lucide-react";
import { FC, Suspense } from "react";
import ContributionTable from "./ContributionTable";

import { updateTaskStatusAction } from "@/data/user/tasks";
import { Table } from "@/types";
import { revalidatePath } from "next/cache";
import { PrioritizerCards } from "./PrioritizerCards";
import { StatusBasedActions } from "./StatusBasedActions";


interface TaskDetailProps {
  id: string;
  user_id: string;
  task: Table<"tasks">;
  community: Table<"organizations">;
  isUserMemberOfCommunity: boolean;
  taskCreator: {
    avatar_url: string | null;
    created_at: string;
    first_name: string | null;
    full_name: string | null;
    id: string;
    last_name: string | null;
  } | null;
  isPrioritizedByLoggedInUser: boolean;
  taskPrioritizationDetails: {
    full_name: string | null;
    avatar_url: string | null;
    count: number;
    created_at: string;
    user_id: string;
  }[];
  isClaimedByUser: boolean;
  claimerDetails: {
    id: string;
    avatar_url: string | null;
    full_name: string | null;
  } | null;

  contributions: Table<"contributions">[];
}
const TaskDetail: FC<TaskDetailProps> = async ({ task, user_id, isUserMemberOfCommunity, community, contributions,
  taskCreator, isPrioritizedByLoggedInUser, claimerDetails, isClaimedByUser, taskPrioritizationDetails
}) => {
  let taskStatusBg = "bg-muted text-foreground";

  const prioritizationPeriod = community.prioritization_period || 0;
  const prioritizationQourum = community.prioritization_quorum_percentage || 0;

  // Can be used to check if the task is within the prioritization period
  const isWithinPrioritizedPeriod = Date.now() < new Date(task.new_task_created_at).getTime() + prioritizationPeriod * 24 * 60 * 60 * 1000;

  let lowerPriority = 0;
  let higherPriority = 0;

  taskPrioritizationDetails.forEach(detail => {
    if (detail.count < 0) {
      lowerPriority += Math.abs(detail.count);
    } else {
      higherPriority += detail.count;
    }
  });

  const currentPrioritizationQuorum = (higherPriority / (lowerPriority + higherPriority)) * 100;

  if (task.task_status === "new_task" && currentPrioritizationQuorum >= prioritizationQourum) {
    await updateTaskStatusAction({ status: "prioritized", task_id: task.id });
  }

  if (task.task_status === "prioritized" && isClaimedByUser) {
    await updateTaskStatusAction({ status: "claimed", task_id: task.id });
  }

  const isClaimed = task.task_status === "claimed";

  if (isClaimed && contributions.length !== 0) {
    await updateTaskStatusAction({ status: "in_review", task_id: task.id });
  }

  if (!isClaimed && task.task_status === "prioritized" && contributions.length !== 0) {
    await updateTaskStatusAction({ status: "in_progress", task_id: task.id });
  }

  const isTaskCreator = user_id === task.user_id;

  if (task.task_status === "in_progress") {
    taskStatusBg = "bg-blue-500 text-foreground";

  } else if (task.task_status === "new_task") {
    taskStatusBg = "bg-zinc-300 dark:bg-zinc-700 text-foreground";
  } else if (task.task_status === "prioritized") {
    taskStatusBg = "bg-primary text-background"
  } else if (task.task_status === "claimed") {
    taskStatusBg = "bg-[#A132CD] text-primary-foreground"
  } else if (task.task_status === "freezed") {
    taskStatusBg = "bg-zinc-400 dark:bg-zinc-600 text-primary-foreground"
  } else if (task.task_status === "in_review") {
    taskStatusBg = "bg-[#DA1DBC] text-primary-foreground"
  } else {
    taskStatusBg = "bg-muted text-foreground";
  }

  revalidatePath(`/dashboard/tasks/${task.id}`);

  return (

    <div className="w-full gap-4 mt-4 md:grid md:grid-cols-3 xl:grid-cols-4">
      <div className="md:col-span-2 xl:col-span-3">
        <Card className="relative mb-4 bg-accent/50 overflow-hidden border-none">
          <div
            className={cn(
              " px-6 py-1 text-sm w-fit text-white rounded-br-md ",
              taskStatusBg
            )}
          >
            {task.task_status?.split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
              .replace("_", " ")}
          </div>
          <Detail task={task} />
        </Card>

        <div className="mb-4 p-8 bg-muted rounded-lg">
          <Suspense fallback={<div>Loading contributions...</div>}>
            <ContributionTable
              task_status={task.task_status || "new_task"}
              contributions={contributions}
              loggedInUser={user_id}
            />
          </Suspense>
        </div>

        <Card className="p-8 mb-4 overflow-hidden border-none bg-muted rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-bold ">Discussion</h1>
            <Button variant="ghost" className="text-primary">
              <Plus size={16} />
              Add New Topic
            </Button>
          </div>
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src="/assets/avatar_1.jpg" />
            </Avatar>

            <Textarea placeholder="Type a new topic here." />
          </div>
        </Card>
      </div>

      <div className="w-full">
        <Suspense fallback={<div>Loading actions...</div>}>
          <StatusBasedActions
            claim_stake_amount={community.claim_stake_amount_percentage}
            isTaskCreator={isTaskCreator}
            isPrioritizedByLoggedInUser={isPrioritizedByLoggedInUser}
            isUserMemberOfCommunity={isUserMemberOfCommunity}
            isWithinPrioritizedPeriod={isWithinPrioritizedPeriod}
            task_id={task.id}
            isClaimer={claimerDetails?.id === user_id}
            task_status={task.task_status}
          />
        </Suspense>

        <Card className="p-4 mb-4 flex flex-col gap-4">
          <h1 className="text-sm leading-[14px] font-medium">Proposer</h1>
          <div className="flex items-center gap-[10px]">
            <Avatar>
              <AvatarImage src={taskCreator?.avatar_url || ""} />
              <AvatarFallback>{taskCreator?.full_name?.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <p className="text-sm text-foreground">{taskCreator?.full_name}</p>
          </div>
        </Card>
        {isClaimed && (
          <Card className="p-4 mb-4 flex flex-col gap-4">
            <h1 className="text-sm leading-[14px] font-medium">Claimed by</h1>
            <div className="flex items-center gap-[10px]">
              <Avatar>
                <AvatarImage src={claimerDetails?.avatar_url || ""} />
                <AvatarFallback>{claimerDetails?.full_name?.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <p className="text-sm text-foreground">{claimerDetails?.full_name}</p>
            </div>
          </Card>
        )}
        <Card className="p-4 mb-4">
          <h1 className="mb-2 text-sm leading-[14px] font-medium">Priority</h1>
          <div className="flex items-center gap-4 mb-2 border-b pb-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">Lower</p>
              <CarrotStrikIconDark />
              <p className="text-sm font-semibold text-foreground">{lowerPriority}</p>
            </div>
            <div className="w-[2px] h-5 bg-gray-300" />
            <div className="flex items-center space-x-2">
              <p className="text-sm font-semibold text-foreground">{higherPriority}</p>
              <Carrot className="text-primary" />
              <p className="text-sm text-muted-foreground">Higher</p>
            </div>
          </div>
          <Suspense>
            <PrioritizerCards prioritizations={taskPrioritizationDetails} />
          </Suspense>
        </Card>
        {task.task_status === "in_review" && (
          <Card className="p-4 mb-4">
            <h1 className="mb-2 text-sm leading-[14px] font-medium">Validation</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <p>Rejected</p>
                <CarrotStrikIconDark />
                <p>0</p>
              </div>
              <div className="w-[2px] h-5 bg-gray-300" />
              <div className="flex items-center space-x-2">
                <p>0</p>
                <Carrot className="text-primary" />
                <p>Approved</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div >
  );
};

export default TaskDetail;
