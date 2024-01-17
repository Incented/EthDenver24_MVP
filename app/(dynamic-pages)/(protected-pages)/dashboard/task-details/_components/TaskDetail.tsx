"use client";
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
import { Carrot, Copy, File, Info, MoreVertical, Plus } from "lucide-react";
import { FC } from "react";
import Pagination from "@/components/ui/Pagination";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import PriDepriButton from "./PriDepriButton";
import ContributionTable from "./ContributionTable";
import Image from "next/image";

interface TaskDetailProps {
  taskTitle?: string;
  taskDescription?: string;
  taskStatus?: "New Task" | "In Progress" | "Prioritized";
  taskType?: string;
  rabbitHole?: string;
  deadLine?: string;
  rewards?: string;
  efforts?: string;
  imageUrl?: string;
}
const TaskDetail: FC<TaskDetailProps> = ({
  taskTitle = "Generate a Landing Page Design for Shoe brand called “Walkers”",
  taskDescription = "The brand “Walkers” is looking for a redesign of their landing page. The current page can be found here at walker.com. They are looking for a more whimsical design that highlights their super comfy shoes. Include a 3D rendering of their new shoe design (link to shoe) that floats on the hero section.",
  taskStatus = "New Task",
  taskType = "Constructive",
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
    <div className="flex gap-4 mt-4">
      <section className="flex-1">
        <Card className="relative mb-4 bg-[#f5f5f480] overflow-hidden border-none">
          <div
            className={cn(
              "absolute top-0 left-0 px-6 py-1 text-sm text-white rounded-br-md ",
              taskStatusBg
            )}
          >
            {taskStatus}
          </div>

          <div className="p-8 mt-6">
            <div className="flex items-center gap-2 mb-6 text-sm">
              <p>{rabbitHole}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="cursor-pointer">
                    <Info size={18} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="">
                      <p className="mb-2 text-sm">Community Details</p>
                      <p className="mb-1 text-xs">
                        Prioritization Reward Percentage 10%
                      </p>
                      <p className="text-xs">
                        Validation Reward Percentage 10%
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Badge className="mb-4 text-xs text-black bg-white border border-gray-200 shadow-sm hover:bg-white">
              {taskType}
            </Badge>
            <p className="text-xs text-gray-400">Posted 5 days ago</p>
            <h1 className="mb-6 text-2xl font-semibold">{taskTitle}</h1>
            <div className="relative w-full h-[165px] mb-6 rounded-md overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageUrl}
                fill
                className="object-cover object-center"
              />
            </div>
            <p className="text-gray-500 text-sm leading-6 font-normal mb-6">
              {taskDescription}
            </p>
            <div className="mb-6 w-64">
              <TaksAttributes
                rewards={rewards}
                efforts={efforts}
                deadline={deadLine}
              />
            </div>

            <div className="">
              <h4 className="mb-2 text-sm font-medium ">Attachment files</h4>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-2 py-2.5 border rounded-md w-fit">
                  <File size={16} />
                  <samp className="text-xs">description_123.pdf</samp>
                  <MoreVertical size={16} className="ml-2" />
                </div>
                <div className="flex items-center gap-1 px-2 py-2.5 border rounded-md w-fit">
                  <File size={16} />
                  <samp className="text-xs">description_123.pdf</samp>
                  <MoreVertical size={16} className="ml-2" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4 mb-4 bg-[#f5f5f480] overflow-hidden border-none">
          <h1 className="text-lg leading-8 mb-2 font-bold">Contributions</h1>
          <ContributionTable />
          <Pagination currentPage={0} title="contribution" totalPages={0} />
        </Card>

        <Card className="p-8 mb-4 bg-[#f5f5f480] overflow-hidden border-none">
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

      <section>
        <div className="mb-4">
          <PriDepriButton />
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
