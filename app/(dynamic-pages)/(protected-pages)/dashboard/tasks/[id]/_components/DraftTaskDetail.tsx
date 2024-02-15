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
    <div className="w-full gap-4 mt-4">
      <div className="flex items-center justify-between">
        <h1 className="col-span-2 font-medium row-start-2 mt-4 text-3xl md:col-span-1">
          Draft Preview
        </h1>
        <div className="ml-auto">
          <Button className="w-32">Join</Button>
        </div>
      </div>
      <div className="mt-4 bg-gray-200 text-center">Draft</div>

      {/* Placeholder content taken from figma design */}
      <div>
        <p className="text-sm text-muted-foreground">{task.name}</p>
      </div>

      <section className="md:col-span-2 xl:col-span-3">
        <Card className="relative mb-4 overflow-hidden border">
          <div
            className={cn(
              "absolute top-0 left-0 px-6 py-1 text-sm text-white rounded-br-md ",
              "bg-black"
            )}
          >
            Draft
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

export default DraftTaskDetail;
