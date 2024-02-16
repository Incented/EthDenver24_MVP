import Detail from "./Detail";
import {
  CarrotStrikIcon,
  CarrotStrikIconDark,
} from "@/components/Icons/CustomIcons";
import TaksAttributes from "@/components/presentational/Tasks/TaksAttributes";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";
import {
  Carrot,
  Copy,
  File,
  Info,
  MoreVertical,
  Plus,
  Settings,
} from "lucide-react";
import { FC } from "react";
import Pagination from "@/components/ui/Pagination";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ContributionTable from "./ContributionTable";
import Image from "next/image";
import AddContribution from "./AddContribution";

interface TaskDetailProps {
  id: string;
  taskTitle?: string;
  taskDescription?: string;
  taskStatus?: "New Task" | "In Progress" | "Prioritized";
  taskTypes?: string[];
  rabbitHole?: string;
  deadLine?: string;
  rewards?: string;
  efforts?: string;
  imageUrl?: string;
}
const TaskDetail: FC<TaskDetailProps> = async ({
  id,
  taskTitle = "Generate a Landing Page Design for Shoe brand called “Walkers”",
  taskDescription = "The brand “Walkers” is looking for a redesign of their landing page. The current page can be found here at walker.com. They are looking for a more whimsical design that highlights their super comfy shoes. Include a 3D rendering of their new shoe design (link to shoe) that floats on the hero section.",
  taskStatus = "New Task",
  taskTypes = ["Constructive"],
  rabbitHole = "Buan Fund",
  deadLine = "3 days 7hours",
  rewards = "250 carrots",
  efforts = "7 days",
  imageUrl = "/images/task1.jpeg",
}) => {
  let taskStatusBg = "bg-black";

  if (taskStatus === "In Progress") {
    taskStatusBg = "bg-green-500";
  } else if (taskStatus === "Prioritized") {
    taskStatusBg = "bg-primary";
  } else {
    taskStatusBg = "bg-black";
  }

  return (
    <div className="w-full gap-4 mt-4 md:grid md:grid-cols-3 xl:grid-cols-4">
      <section className="md:col-span-2 xl:col-span-3">
        <Card className="relative mb-4 overflow-hidden border">
          <div
            className={cn(
              "absolute top-0 left-0 px-6 py-1 text-sm text-white rounded-br-md ",
              taskStatusBg
            )}
          >
            {taskStatus}
          </div>

          <Detail
            taskTitle={taskTitle}
            taskDescription={taskDescription}
            taskTypes={taskTypes}
            rabbitHole={rabbitHole}
            imageUrl={imageUrl}
            deadLine={deadLine}
            rewards={rewards}
            efforts={efforts}
            attachments={[]}
          />
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
        <div className="flex items-center gap-2 mb-4">
          <Button className="bg-gray-600 ">Claim</Button>
          <AddContribution />
          <Button size="icon" variant="outline">
            <Settings />
          </Button>
        </div>
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
