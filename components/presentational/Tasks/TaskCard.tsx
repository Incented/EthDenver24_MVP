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
import { Anchor } from "@/components/Anchor";
import Image from "next/image";
import { Enum } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TaskCardProps {
  taskId: string;
  taskTitle?: string;
  taskCommunity?: string;
  // taskDescription?: string;
  taskStatus: Enum<"task_status">;
  taskType: string[];
  rabbitHole?: string;
  deadLine?: string;
  rewards?: string;
  efforts?: string;
  imageUrl?: string;
  isVertical?: boolean;
  isPublished?: boolean;
}

const TaskCard: FC<TaskCardProps> = ({
  taskId,
  taskTitle = "Buy a trash container",
  // taskDescription = "To eradicate invasive species, reintroduce native species and",
  taskStatus,
  taskType,
  taskCommunity,
  deadLine = "3 days 7hours",
  rewards = "250 carrots",
  efforts = "7 days",
  imageUrl = "/images/task1.jpeg",
  isVertical,
  isPublished,
}: TaskCardProps) => {
  let taskStatusBg = "bg-black";

  if (taskStatus === "in_progress") {
    taskStatusBg = "bg-blue-500";
  } else if (taskStatus === "prioritized") {
    taskStatusBg = "bg-primary";
  } else {
    taskStatusBg = "bg-black";
  }
  return (
    <>
      {isVertical ? (
        <Card className="relative flex justify-between w-full rounded-lg">
          <div
            className={cn(
              "absolute top-0 right-0 px-4 py-2 text-xs font-medium text-white rounded-tr-md rounded-bl-md",
              taskStatusBg
            )}
          >
            {taskStatus
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")
              .replace("_", " ")}
          </div>
          <div className="relative w-[400px] h-full ">
            <Image
              src={imageUrl}
              alt={imageUrl}
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="relative w-full h-full px-6 py-6 text-foreground">
            <div className="flex items-center gap-2 text-sm">
              <p className="text-xs font-medium leading-6">{taskCommunity}</p>
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
              <ScrollArea className="h-fit max-w-xs">
                {" "}
                <div className="flex items-center gap-2 whitespace-nowrap my-1">
                  {taskType.map((type, index) => (
                    <Badge
                      key={index}
                      className="text-xs text-foreground bg-secondary hover:bg-secondary"
                    >
                      {type
                        .split("-")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")
                        .replace("_", " ")}
                    </Badge>
                  ))}
                </div>{" "}
              </ScrollArea>

              <div className="mt-2">
                <Anchor
                  href={`/dashboard/tasks/${taskId}`}
                  className="text-base font-semibold leading-7 text-foreground dark:text-white"
                >
                  {taskTitle}
                </Anchor>
              </div>
              {/* <div className="mt-2 ">
                <p className="w-full text-sm text-muted-foreground">
                  {`${taskDescription}`}...
                </p>
              </div> */}
            </div>
          </div>

          <div className="flex justify-end w-full">
            <div className="flex items-center h-full gap-8 py-6 my-auto ">
              <div className="w-px h-full bg-border" />
              <TaksAttributes
                rewards={rewards}
                efforts={efforts}
                deadline={deadLine}
              />
              <div className="w-px h-full bg-border" />
            </div>

            <div className="flex items-center gap-1 w-fit px-7">
              <Carrot size={20} />
              <p className="mr-4">0</p>
              <CarrotStrikIcon />
              <p>0</p>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="relative rounded-lg">
          {!isPublished && (
            <div className="w-full absolute top-0 z-10 flex justify-center  px-4 py-2 text-xs font-medium text-foreground bg-secondary">
              Draft
            </div>
          )}
          <div
            className={`w-full h-[116px] bg-cover bg-center relative rounded-md`}
          >
            <div className="w-full h-full text-white backdrop-brightness-75">
              <div className="absolute top-0 left-0 w-full -z-50">
                <div className="relative w-full h-[116px] ">
                  <div className="absolute bottom-0 z-50 w-full h-[116px] bg-gradient-to-b from-foreground/75  via-background/25 to-background"></div>
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
                {taskStatus
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")
                  .replace("_", " ")}
              </div>

              <div className="flex items-center gap-2 text-sm px-6 py-[10px]">
                <p className="text-xs font-medium leading-6 text-background">
                  {taskCommunity}
                </p>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild className="cursor-pointer">
                      <Info size={18} className="text-background" />
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
              <div className="px-6 ">
                <div className="flex items-center justify-between w-full mt-4">
                  <ScrollArea className="h-fit whitespace-no-wrap w-full">
                    <div className="h-fit flex gap-2 whitespace-nowrap">
                      {taskType.map((type, index) => (
                        <Badge
                          key={index}
                          className="text-xs text-foreground bg-background hover:bg-background"
                        >
                          {type
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")
                            .replace("_", " ")}
                        </Badge>
                      ))}
                    </div>
                  </ScrollArea>
                  {/* <div className="h-fit flex gap-2 w-full whitespace-nowrap">
                    {taskType.map((type, index) => (
                      <Badge
                        key={index}
                        className="text-xs text-foreground bg-background hover:bg-background"
                      >
                        {type
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </Badge>
                    ))}
                  </div> */}
                  <div className="flex items-center gap-1 ml-auto">
                    <Carrot size={20} />
                    <p className="mr-4">0</p>
                    <CarrotStrikIcon />
                    <p>0</p>
                  </div>
                </div>
                <div className="mt-4">
                  <Anchor
                    href={`/dashboard/tasks/${taskId}`}
                    className="text-base font-semibold leading-7 text-foreground"
                  >
                    {taskTitle}
                  </Anchor>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="px-6 mt-3">
            <p className="w-full text-sm text-muted-foreground">
              {`${taskDescription.slice(0, 60)}`}...
            </p>
          </div> */}

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
