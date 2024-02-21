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

import { checkIfUserPrioritizedTask, getPrioritizationDetails } from "@/data/user/tasks";
import { getUserProfile } from "@/data/user/user";
import { Table } from "@/types";
import AddContribution from "./AddContribution";
import ClaimModal from "./ClaimModal";
import { PrioritizeDialog } from "./PrioritizeDialog";
import { PrioritizerCards } from "./PrioritizerCards";


interface TaskDetailProps {
  id: string;
  user_id: string;
  task: Table<"tasks">;
  isUserMemberOfCommunity: boolean;
  prioritizationPeriod: number;
}
const TaskDetail: FC<TaskDetailProps> = async ({ task, user_id, prioritizationPeriod, isUserMemberOfCommunity }) => {
  const [taskCreator, isPrioritizedByUser, taskPrioritizationDetails] = await Promise.all([
    task.user_id ? getUserProfile(task.user_id) : Promise.resolve(null),
    checkIfUserPrioritizedTask(task.id),
    getPrioritizationDetails(task.id),
  ]);
  let taskStatusBg = "bg-muted text-foreground";
  // Can be used to check if the task is within the prioritization period
  const isWithinPrioritizedPeriod = Date.now() < new Date(task.new_task_created_at).getTime() + prioritizationPeriod * 24 * 60 * 60 * 1000;

  // check if taskCreator is the same as the logged in user
  const isTaskCreator = user_id === task.user_id;

  if (task.task_status === "in_progress") {
    taskStatusBg = "bg-blue-500 text-foreground";
  } else if (task.task_status === "prioritized") {
    taskStatusBg = "bg-primary text-background";
  } else if (task.task_status === "new_task") {
    taskStatusBg = "bg-zinc-300 dark:bg-zinc-700 text-foreground";
  } else {
    taskStatusBg = "bg-muted text-foreground";
  }


  return (

    <div className="w-full gap-4 mt-4 md:grid md:grid-cols-3 xl:grid-cols-4">
      <section className="md:col-span-2 xl:col-span-3">
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

        <div className="mb-4">
          <ContributionTable
            task_status={task.task_status || "new_task"}
          />
        </div>

        <Card className="p-8 mb-4 overflow-hidden border-none">
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
      </section>

      <section className="w-full">
        {task.task_status === "prioritized" && (<div className="flex w-full gap-2 mb-4 md:col-start-3 xl:col-start-4 ">
          <ClaimModal />
          <AddContribution />
        </div>)}
        {task.task_status === "new_task" && (
          <div className="flex w-full gap-2 mb-4 md:col-start-3 xl:col-start-4 ">
            {/* <Button className="w-full">
              Prioritize
            </Button> */}
            <PrioritizeDialog isTaskCreator={isTaskCreator} task_id={task.id} isPrioritizedByUser={isPrioritizedByUser} isWithinPrioritizedPeriod={isWithinPrioritizedPeriod} isUserMemberOfCommunity={isUserMemberOfCommunity} />
          </div>
        )}

        <Card className="p-4 mb-4 flex flex-col gap-4">
          <h1 className="text-sm leading-[14px] font-medium">Proposer</h1>
          <div className="flex items-center gap-[10px]">
            <Avatar>
              <AvatarImage src={taskCreator?.avatar_url || ""} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <p className="text-sm text-foreground">{taskCreator?.full_name}</p>
          </div>
        </Card>
        <Card className="p-4 mb-4">
          <h1 className="mb-2 text-sm leading-[14px] font-medium">Priority</h1>
          <div className="flex items-center gap-4 mb-2 border-b pb-2">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-muted-foreground">Lower</p>
              <CarrotStrikIconDark />
              <p>0</p>
            </div>
            <div className="w-[2px] h-5 bg-gray-300" />
            <div className="flex items-center space-x-2">
              <p>100</p>
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
      </section>
    </div>
  );
};

export default TaskDetail;
