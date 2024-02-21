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
import { FC } from "react";
import ContributionTable from "./ContributionTable";

import { getUserProfile } from "@/data/user/user";
import { Table } from "@/types";
import AddContribution from "./AddContribution";
import ClaimModal from "./ClaimModal";
import { PrioritizeDialog } from "./PrioritizeDialog";


interface TaskDetailProps {
  id: string;
  task: Table<"tasks">;
}
const TaskDetail: FC<TaskDetailProps> = async ({ task }) => {
  const taskCreator = task.user_id ? await getUserProfile(task.user_id) : null;
  let taskStatusBg = "bg-muted text-foreground";

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
            <PrioritizeDialog />
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
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <p>Lower</p>
              <CarrotStrikIconDark />
              <p>0</p>
            </div>
            <div className="w-[2px] h-5 bg-gray-300" />
            <div className="flex items-center space-x-2">
              <p>0</p>
              <Carrot className="text-primary" />
              <p>higer</p>
            </div>
          </div>
        </Card>
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
      </section>
    </div>
  );
};

export default TaskDetail;
