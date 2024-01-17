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
import Image from "next/image";

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
  isVertical?: boolean;
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
  isVertical,
}: TaskCardProps) => {
  let taskStatusBg = "bg-black";

  if (taskStatus === "In Progress") {
    taskStatusBg = "bg-[#1B7CDF]";
  } else if (taskStatus === "Prioritized") {
    taskStatusBg = "bg-primary";
  } else {
    taskStatusBg = "bg-black";
  }
  return (
    <>
      {isVertical ? (
        <Card className="flex relative justify-between rounded-lg overflow-hidden w-full">
          <div
            className={cn(
              "absolute top-0 right-0 px-4 py-2 text-xs font-medium text-white rounded-tr-md rounded-bl-md",
              taskStatusBg
            )}
          >
            {taskStatus}
          </div>
          <div className="relative w-[400px] h-full ">
            <Image
              src={imageUrl}
              alt={imageUrl}
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="relative w-full h-full text-black px-6 py-6">
            <div className="flex items-center gap-2 text-sm">
              <p className="text-xs font-medium leading-6">{rabbitHole}</p>
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
            <div className="mt-2">
              <div className="flex items-center w-full justify-between my-1">
                <Badge className="text-xs text-black bg-secondary hover:bg-white">
                  {taskType}
                </Badge>
              </div>
              <div className="mt-2">
                <Anchor
                  href="/dashboard/task-details"
                  className="text-base text-black leading-7 font-semibold"
                >
                  {taskTitle}
                </Anchor>
              </div>
              <div className=" mt-2">
                <p className="text-muted-foreground text-sm w-full">
                  {`${taskDescription}`}...
                </p>
              </div>
            </div>
          </div>

          <div className="flex w-full justify-end">
            <div className=" py-6 h-full flex gap-8 items-center my-auto ">
              <div className="w-px h-full bg-border" />
              <TaksAttributes
                rewards={rewards}
                efforts={efforts}
                deadline={deadLine}
              />
              <div className="w-px h-full bg-border" />
            </div>

            <div className="flex w-fit items-center gap-1 px-7">
              <Carrot size={20} />
              <p className="mr-4">0</p>
              <CarrotStrikIcon />
              <p>0</p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="rounded-lg overflow-hidden">
          <div
            className={`w-full h-[116px] bg-cover bg-center relative rounded-md`}
          >
            <div className="w-full h-full text-white backdrop-brightness-75">
              <div className="absolute -z-50 w-full top-0 left-0">
                <div className="relative w-full h-[116px] ">
                  <div className="absolute bottom-0 z-50 w-full h-[116px] bg-gradient-to-b from-black/75  via-white/25 to-white"></div>
                  <Image
                    src={imageUrl}
                    alt={imageUrl}
                    fill
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div
                className={cn(
                  "absolute top-0 right-0 px-4 py-2 text-xs font-medium text-white rounded-tr-md rounded-bl-md",
                  taskStatusBg
                )}
              >
                {taskStatus}
              </div>

              <div className="flex items-center gap-2 text-sm px-6 py-[10px]">
                <p className="text-xs font-medium leading-6">{rabbitHole}</p>
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
              <div className=" px-6">
                <div className="flex items-center w-full justify-between mt-4">
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
                <div className="mt-4">
                  <Anchor
                    href="/dashboard/task-details"
                    className="text-base text-black leading-7 font-semibold"
                  >
                    {taskTitle}
                  </Anchor>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 mt-3">
            <p className="text-muted-foreground text-sm w-full">
              {`${taskDescription.slice(0, 60)}`}...
            </p>
          </div>

          <div className="mx-6 my-6 mt-4">
            <TaksAttributes
              rewards={rewards}
              efforts={efforts}
              deadline={deadLine}
            />
          </div>
        </Card>
      )}
    </>
  );
};

export default TaskCard;
