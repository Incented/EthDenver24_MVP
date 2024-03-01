import { Anchor } from "@/components/Anchor";
import { CarrotStrikIcon } from "@/components/Icons/CustomIcons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, getGrantProjectBgClass } from "@/lib/utils";
import { Enum, Table } from "@/types";
import { Carrot, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import GrantApplicationAttributes from "../../../grant-applications/[id]/_components/GrantApplicationAttributes";

interface GrantApplicationCardProps {
  grantId: string;
  grantProgramId: string;
  grantTitle: string;
  grantDescription: string;
  grantProjectStatus: Enum<"grant_project_status">;
  grantProgram: Table<"grant_programs">;
  grantProjectType: string[];
  rabbitHole?: string;
  amount?: string;
  deadLine?: string;
  efforts?: string;
  imageUrl?: string;
  isVertical?: boolean;
  isPublished?: boolean;
}

const GrantApplicationCard: FC<GrantApplicationCardProps> = ({
  grantId,
  grantProgramId,
  grantTitle = "Buy a trash container",
  grantDescription = "To eradicate invasive species, reintroduce native species and",
  grantProjectStatus,
  grantProjectType,
  grantProgram,
  amount,
  deadLine = "3 days 7hours",
  efforts = "7 days",
  imageUrl = "/images/task1.jpeg",
  isVertical,
  isPublished,
}: GrantApplicationCardProps) => {

  let grantStatusBg = "bg-black";

  grantStatusBg = getGrantProjectBgClass(grantProjectStatus);
  return (
    <>
      {isVertical ? (
        <Card className="relative flex justify-between w-full rounded-lg">
          <div
            className={cn(
              "absolute top-0 right-0 px-4 py-2 text-xs font-medium text-white rounded-tr-md rounded-bl-md",
              grantStatusBg
            )}
          >
            {grantProjectStatus
              .replace("project", "approved")
              .replace("new_application", "in_review")
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
              className="object-cover object-center rounded-tl-md rounded-bl-md"
            />
          </div>
          <div className="relative w-full h-full px-6 py-6 text-foreground">
            <div className="flex items-center gap-2 text-sm">
              <p className="text-xs font-medium leading-6">{grantProgram.title}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild className="z-20 cursor-pointer">
                    <Info size={18} />
                  </TooltipTrigger>
                  <TooltipContent className="z-50">
                    <div className="">
                      <p className="mb-2 text-sm">Grant Details</p>
                      <p className="mb-1 text-xs">
                        Prioritization Reward Percentage {grantProgram.prioritization_reward_percentage}
                      </p>
                      <p className="text-xs">
                        Validation Reward Percentage {grantProgram.validation_reward_percentage}
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="mt-2">
              <div className="mt-2">
                <Anchor
                  href={`/grant-applications/${grantId}`}
                  className="text-base font-semibold leading-7 text-foreground dark:text-white"
                >
                  {grantTitle}
                </Anchor>
                <Badge variant="secondary" className='ml-2'>
                  {grantProjectType?.[0] || "Defi"}
                </Badge>
              </div>
              <div className="mt-2 ">
                <p className="w-full text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: grantDescription as string }}
                />

              </div>
            </div>
          </div>

          {/* <div className="flex justify-end w-full">
            <div className="flex items-center h-full gap-8 py-6 my-auto ">
              <div className="w-px h-full bg-border" />
              <GrantApplicationAttributes
                efforts={efforts}
                deadline={deadLine} amount={""} />
              <div className="w-px h-full bg-border" />
            </div>

            <div className="flex items-center gap-1 w-fit px-7">
              <Carrot size={20} />
              <p className="mr-4">0</p>
              <CarrotStrikIcon />
              <p>0</p>
            </div>
          </div> */}
          <Button className="absolute top-1/2 right-4">View Application</Button>
        </Card>
      ) : (
        <Link href={`/grant-applications/${grantId}`}>
          <Card className="relative w-full min-w-full overflow-visible rounded-lg">
            {grantProjectStatus === "draft" && (
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
                    grantStatusBg
                  )}
                >
                  {grantProjectStatus
                    .replace("project", "approved")
                    .replace("new_application", "in_review")
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
                          {grantProgram.title}
                        </p>
                        <Info size={18} className="text-background" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="z-50 ml-4 -mb-3">
                      <div className="flex flex-col">
                        <div className="">
                          <p className="mb-2 text-sm">Grant Details</p>
                          <p className="mb-1 text-xs">
                            Prioritization Reward Percentage {grantProgram.prioritization_reward_percentage}%
                          </p>
                          <p className="text-xs">
                            Validation Reward Percentage {grantProgram.validation_reward_percentage}%
                          </p>
                        </div>
                        <Link href={`/grants/${grantProgramId}`} className="pt-4 text-xs underline text-muted-foreground hover:text-foreground">
                          View Grant
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
                        {grantProjectType.splice(0, 1).map((type, index) => (
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
                      href={`/dashboard/tasks/${grantId}`}
                      className="text-base font-semibold leading-7 truncate text-foreground whitespace-nowrap"
                    >
                      {grantTitle}
                    </Anchor>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 mt-3">
              <div
                className="max-w-full mb-2 text-sm prose prose-lg text-muted-foreground prose-slate dark:prose-invert prose-headings:font-display font-default focus:outline-none"
                dangerouslySetInnerHTML={{ __html: grantDescription as string }}
              />
            </div>

            <div className="mx-6 my-6 mt-4">
              <GrantApplicationAttributes
                efforts={efforts}
                deadline={deadLine}
                amount={""} />
            </div>
          </Card>
        </Link>
      )}
    </>
  );
};

export default GrantApplicationCard;
