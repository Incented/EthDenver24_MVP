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
import GoBack from "@/components/ui/GoBack";
import { getTaskById } from "@/data/user/tasks";
import { z } from "zod";

const rabbitHole = "Buan Fund";
const deadLine = "3 days 7hours";
const rewards = "250 carrots";
const efforts = "7 days";
const imageUrl = "/images/task1.jpeg";
const taskType = "Constructive";

const filesSchema = z
  .array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  )
  .default([]);

type TaskFileArray = z.infer<typeof filesSchema>;

interface TaskDetailProps {
  id: string;
}
// http://localhost:3000/dashboard/tasks/b9af7c90-f276-449d-a14b-511f12524e9d
const DraftTaskDetail: FC<TaskDetailProps> = async ({ id }: { id: string }) => {
  const task = await getTaskById(id);
  console.log(task.files);
  let files: TaskFileArray = [];
  try {
    const arg =
      typeof task.files === "string" ? JSON.parse(task.files) : task.files;
    files = filesSchema.parse(arg);
  } catch (error) {
    console.log(error);
  }
  const firstFile = files[0];
  const featuredImageAlt = firstFile?.name ?? task.name;
  const featuredImageUrl = firstFile?.url ?? imageUrl;
  return (
    <div className="w-full space-y-4 mt-4">
      <div className="space-y-[10px] md:gap-0 md:flex md:items-center md:justify-between">
        <h1 className="col-span-2 font-medium rounded-md row-start-2 mt-4 text-3xl md:col-span-1">
          Draft Preview
        </h1>
        <div className="ml-auto flex justify-between md:gap-2">
          <Button className="px-2 py-3 " variant={"outline"}>
            Edit Draft Proposal
          </Button>
          <Button className="w-32">Submit Proposal</Button>
        </div>
      </div>

      {/* <div>
        <p className="text-sm text-muted-foreground">{task.name}</p>
    </div> */}

      <section className="md:col-span-2 md:8 md:gap-6 xl:col-span-3">
        <Card className="relative mb-4 overflow-hidden border-none bg-muted">
          <div className="mt-4 bg-secondary text-center rounded-md">Draft</div>
          <div className="p-8 mt-6">
            <div className="flex items-center gap-2 mb-6 text-sm">
              <p className=" text-foreground">{rabbitHole}</p>
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
            <Badge className="mb-4 text-xs text-foreground bg-transparent border border-border shadow-sm hover:bg-background">
              {taskType}
            </Badge>
            <h1 className="mb-6 text-2xl font-semibold">{task.name}</h1>
            <div className="relative w-full h-[165px] mb-6 rounded-md overflow-hidden">
              <Image
                src={featuredImageUrl}
                alt={featuredImageAlt}
                fill
                className="object-cover object-center"
              />
            </div>
            <p className="mb-6 text-sm font-normal leading-6 text-gray-500">
              {task.description}
            </p>
            <div className="w-64 mb-6">
              <TaksAttributes
                rewards={String(task.rewards) ?? undefined}
                efforts={String(task.efforts) ?? undefined}
                deadline={"3 days 7 hours"}
              />
            </div>

            <div className="">
              <h4 className="mb-2 text-sm font-medium ">Attachment files</h4>
              <div className="space-y-2 md:flex items-center md:space-y-0 md:gap-2">
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
      </section>
    </div>
  );
};

export default DraftTaskDetail;
