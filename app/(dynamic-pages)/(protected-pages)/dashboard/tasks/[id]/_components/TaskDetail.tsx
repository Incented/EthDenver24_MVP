import {
  CarrotStrikIconDark
} from "@/components/Icons/CustomIcons";
import { Card } from "@/components/ui/card";
import Detail from "./Detail";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Carrot,
  Plus
} from "lucide-react";
import { FC } from "react";
import AddContribution from "./AddContribution";
import ContributionTable from "./ContributionTable";

import { Table } from "@/types";
import ClaimModal from "./ClaimModal";

interface TaskDetailProps {
  id: string;
  task: Table<"tasks">;
}
const TaskDetail: FC<TaskDetailProps> = async ({ task }) => {
  let taskStatusBg = "bg-black";

  if (task.task_status === "in_progress") {
    taskStatusBg = "bg-green-500";
  } else if (task.task_status === "prioritized") {
    taskStatusBg = "bg-primary";
  } else {
    taskStatusBg = "bg-black";
  }

  return (
    <div className="w-full gap-2 mt-4 md:grid md:grid-cols-3 xl:grid-cols-4">
      <div className="flex w-full gap-2 mb-4 md:col-start-3 xl:col-start-4 ">
        <ClaimModal />
        <AddContribution />
      </div>
      <section className="md:col-span-2 xl:col-span-3 md:-mt-[61px]">
        <Card className="relative mb-4 overflow-hidden border">
          <div
            className={cn(
              "absolute top-0 left-0 px-6 py-1 text-sm text-white rounded-br-md ",
              taskStatusBg
            )}
          >
            {task.task_status}
          </div>

          <Detail task={task} />
        </Card>

        <div className="mb-4">
          <ContributionTable />
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
        <Card className="p-4 mb-4 ">
          <h1 className="mb-2 text-lg font-bold">Proposer</h1>
          <div className="flex items-center gap-[10px]">
            <Avatar>
              <AvatarImage src="/assets/avatar_1.jpg" />
            </Avatar>
            <p>Randy Dias</p>
          </div>
        </Card>
        <Card className="p-4 mb-4">
          <h1 className="mb-2 text-lg font-bold">Priority</h1>
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
          <h1 className="mb-2 text-lg font-bold">Validation</h1>
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
