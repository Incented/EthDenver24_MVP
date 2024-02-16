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
import Detail from "./Detail";

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
          <Detail
            taskTitle={task.name}
            taskDescription={task.description}
            taskType={taskType}
            rabbitHole={rabbitHole}
            imageUrl={featuredImageUrl}
            deadLine={"3 days 7 hours"}
            rewards={String(task.rewards) ?? undefined}
            efforts={String(task.efforts) ?? undefined}
          />
        </Card>
      </section>
    </div>
  );
};

export default DraftTaskDetail;
