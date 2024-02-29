import { Anchor } from "@/components/Anchor";
import { CarrotStrikIcon } from "@/components/Icons/CustomIcons";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, getGrantProjectBgClass } from "@/lib/utils";
import { Carrot, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import GrantApplicationAttributes from "./GrantApplicationAttributes";

interface GrantProjectMilestoneCardProps {
  milestoneId: number;
  grantProjectId: string;
  grantProgramId: string;
  milestoneTitle?: string;
  milestoneProjectName: string;
  milestoneDescription: string;
  taskStatus: "new_task";
  taskType: string[];
  rabbitHole?: string;
  deadLine?: string;
  rewards: string;
  efforts?: string;
  imageUrl?: string;
  isVertical?: boolean;
  isPublished?: boolean;
  isGrant?: boolean;
}

const GrantProjectMilestoneCard: FC<GrantProjectMilestoneCardProps> = ({
  milestoneId,
  grantProjectId,
  grantProgramId,
  milestoneTitle = "Buy a trash container",
  milestoneDescription,
  taskStatus,
  taskType,
  milestoneProjectName,
  deadLine = "3 days 7hours",
  rewards,
  efforts = "7 days",
  imageUrl = "/images/task1.jpeg",
  isVertical,
  isPublished, isGrant
}: GrantProjectMilestoneCardProps) => {
  let taskStatusBg = "bg-muted text-foreground";

  taskStatusBg = getGrantProjectBgClass(taskStatus);
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
              .replace("published", "new_task")
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
              <p className="text-xs font-medium leading-6">{milestoneProjectName}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="z-20 cursor-pointer">
                    <Info size={18} />
                  </TooltipTrigger>
                  <TooltipContent className="z-50">
                    <div className="">
                      <p className="mb-2 text-sm">Project Details</p>
                      {/* <p className="mb-1 text-xs">
                        Prioritization Reward Percentage 10%
                      </p>
                      <p className="text-xs">
                        Validation Reward Percentage 10%
                      </p> */}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="mt-2">
              <ScrollArea className="max-w-xs h-fit">
                {" "}
                <div className="flex items-center gap-2 my-1 whitespace-nowrap">
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
                  href={`/dashboard/tasks/${milestoneId}`}
                  className="text-base font-semibold leading-7 text-foreground dark:text-white"
                >
                  {milestoneTitle}
                </Anchor>
              </div>
              <div className="mt-2 ">
                <p className="w-full text-sm text-muted-foreground">
                  {`${milestoneDescription}`}...
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end w-full">
            <div className="flex items-center h-full gap-8 py-6 my-auto ">
              <div className="w-px h-full bg-border" />
              <GrantApplicationAttributes
                amount={rewards}
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
        <Link href={`/dashboard/tasks/${milestoneId}`}>
          <Card className="relative w-full min-w-full overflow-visible rounded-lg">
            {!isPublished && (
              <div className="absolute top-0 z-10 flex justify-center w-full px-4 py-2 text-xs font-medium rounded-t-lg text-foreground bg-secondary">
                Draft
              </div>
            )}
            <div
              className={`w-full h-[116px] bg-cover bg-center relative rounded-t-lg`}
            >
              <div className="w-full h-full text-white rounded-t-lg backdrop-brightness-75">
                <div className="absolute top-0 left-0 w-full -z-50">
                  <div className="relative w-full h-[116px] ">
                    <div className="absolute bottom-0 z-50  w-full h-[116px] bg-gradient-to-b from-foreground/75  via-background/25 to-background rounded-t-lg"></div>
                    <Image
                      src={imageUrl}
                      alt={imageUrl}
                      fill
                      className="object-cover object-center rounded-t-lg"
                    />
                  </div>
                </div>
                <div
                  className={cn(
                    "absolute top-0 right-0 px-4 py-2 text-xs font-medium rounded-tr-md rounded-bl-md",
                    taskStatusBg
                  )}
                >
                  {taskStatus
                    .replace("published", "new_task")
                    .split("-")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                    .replace("_", " ")}
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild className="z-20 cursor-pointer">
                      <div className="flex w-fit items-center gap-2 text-sm px-6 py-[10px]">
                        <p className="text-xs font-medium leading-6 text-background">
                          {milestoneProjectName}
                        </p>
                        <Info size={18} className="text-background" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="z-50 ml-4 -mb-3">
                      <div className="flex flex-col">
                        <p className="mb-2 text-sm">Project Details</p>
                        {/* <p className="mb-1 text-xs">
                        Prioritization Reward Percentage 10%
                      </p>
                      <p className="text-xs">
                        Validation Reward Percentage 10%
                      </p> */}
                        <Link href={`/grants/${grantProgramId}/projects/${grantProjectId}`} className="pt-4 text-xs underline text-muted-foreground hover:text-foreground">
                          View project
                        </Link>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <div className="px-6 ">
                  <div className="flex items-center justify-between w-full mt-4">
                    <ScrollArea className="w-full whitespace-no-wrap h-fit">
                      <div className="flex gap-2 h-fit whitespace-nowrap">
                        {/* need to fix to show all from design */}
                        {taskType.splice(0, 1).map((type, index) => (
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
                    <div className="flex items-center gap-1">
                      <Carrot size={20} />
                      <p className="mr-4">0</p>
                      <CarrotStrikIcon />
                      <p>0</p>
                    </div>
                  </div>
                  <div className="mt-4 ">
                    <Anchor
                      href={`/dashboard/tasks/${milestoneId}`}
                      className="text-base font-semibold leading-7 truncate text-foreground whitespace-nowrap"
                    >
                      {milestoneTitle}
                    </Anchor>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 mt-3">
              <div
                className="prose text-sm prose-lg prose-slate dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full mb-6"
                dangerouslySetInnerHTML={{ __html: milestoneDescription as string }}
              />
            </div>

            <div className="mx-6 my-6 mt-4">
              <GrantApplicationAttributes
                amount={rewards}
                efforts={efforts}
                deadline={deadLine}
              />
            </div>
          </Card>
        </Link>
      )}
    </>
  );
};

export default GrantProjectMilestoneCard;