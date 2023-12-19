"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CarrotStrikIcon } from "@/components/Icons/CustomIcons";
import { Badge } from "@/components/ui/badge";
import TaksAttributes from "./TaksAttributes";
import { Card } from "@/components/ui/card";
import { Carrot, Info } from "lucide-react";
import { FC } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Anchor } from "@/components/Anchor";

interface TaskCardProps {
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

const TaskCard: FC<TaskCardProps> = ({
  taskTitle = "Buy a trash container",
  taskDescription = "To eradicate invasive species, reintroduce native species and",
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
    <Card>
      <div
        className={`w-full h-40  bg-cover bg-center relative rounded-md`}
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="w-full h-full p-4 text-white backdrop-brightness-75">
          <div
            className={cn(
              "absolute top-0 right-0 px-6 py-1 text-sm text-white rounded-tr-md rounded-bl-md",
              taskStatusBg
            )}
          >
            {taskStatus}
          </div>

          <div className="flex items-center gap-2 text-sm">
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
                    <p className="text-xs">Validation Reward Percentage 10%</p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center mt-6">
            <Badge className="text-xs text-black bg-white hover:bg-white">
              {taskType}
            </Badge>

            <div className="flex items-center gap-1 ml-auto">
              <Carrot size={20} />
              <p className="mr-4">0</p>
              <CarrotStrikIcon />
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4">
        <Anchor href="/dashboard/task-details" className="text-lg font-bold">
          {taskTitle}
        </Anchor>
        <p className="text-gray-400 w-72">
          {`${taskDescription.slice(0, 60)}`}...
        </p>
      </div>

      <div className="mx-4 my-6">
        <TaksAttributes
          rewards={rewards}
          efforts={efforts}
          deadline={deadLine}
        />
      </div>
    </Card>
  );
};

export default TaskCard;
