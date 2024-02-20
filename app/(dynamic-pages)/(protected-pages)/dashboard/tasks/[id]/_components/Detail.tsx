import { TooltipWrapper } from "@/components/TooltipWrapper";
import TaksAttributes from "@/components/presentational/Tasks/TaksAttributes";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { FC, Suspense } from "react";

import { getOrganizationById } from "@/data/user/organizations";
import { Table } from "@/types";
import { z } from "zod";
import { AttachmentClient } from "../../create-task/components/AttachmentClient";
import { taskTypesSchema } from "../../create-task/components/CreateTaskFormSchema";
import { TaskFileArray } from "./DraftTaskDetail";

async function CommunityDetails({
  organizationId,
}: {
  organizationId: string;
}) {
  const community = await getOrganizationById(organizationId);
  const communityName = community.title;
  const communityPrioritizationReward =
    community.prioritization_reward_percentage;
  const communityValidationReward = community.validation_reward_percentage;
  return (
    <div className="flex items-center gap-2 mb-6 text-sm">
      <p>{communityName}</p>
      <TooltipWrapper
        tooltipTrigger={<Info size={18} className="cursor-pointer" />}
        tooltipContent={
          <div>
            <p className="mb-2 text-sm">Community Details</p>
            <p className="mb-1 text-xs">
              Prioritization Reward Percentage{" "}
              {communityPrioritizationReward
                ? `${communityPrioritizationReward}%`
                : "Not specified"}
            </p>
            <p className="text-xs">
              Validation Reward Percentage{" "}
              {communityValidationReward
                ? `${communityValidationReward}%`
                : "Not specified"}
            </p>
          </div>
        }
      />
    </div>
  );
}
interface DetailProps {
  task: Table<"tasks">;
}

export const filesSchema = z
  .array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  )
  .default([]);
const Detail: FC<DetailProps> = async ({ task }) => {
  const organizationId = task.organization_id;
  const imageUrl = "/images/task1.jpeg";

  let taskStatusBg = "bg-black";

  if (task.task_status === "in_progress") {
    taskStatusBg = "bg-green-500";
  } else if (task.task_status === "prioritized") {
    taskStatusBg = "bg-primary";
  } else {
    taskStatusBg = "bg-black";
  }

  let files: TaskFileArray = [];
  let taskTypes: string[] = [];

  try {
    const arg =
      typeof task.files === "string" ? JSON.parse(task.files) : task.files;
    files = filesSchema.parse(arg);
    const extractedTypes =
      typeof task.task_types === "string"
        ? JSON.parse(task.task_types)
        : task.task_types;
    taskTypes = taskTypesSchema.parse(extractedTypes);
  } catch (error) {
    console.log(error);
  }
  const firstFile = files[0];
  const featuredImageUrl = firstFile?.url ?? imageUrl;

  const deadLine = String(task.efforts);
  const rewards = String(task.rewards);

  try {
    const arg =
      typeof task.files === "string" ? JSON.parse(task.files) : task.files;
    files = filesSchema.parse(arg);
    const extractedTypes =
      typeof task.task_types === "string"
        ? JSON.parse(task.task_types)
        : task.task_types;
    taskTypes = taskTypesSchema.parse(extractedTypes);
  } catch (error) {
    console.log(error);
  }
  return (
    <div className="p-8 bg-accent/50">
      <Suspense fallback={<div>Loading...</div>}>
        <CommunityDetails organizationId={organizationId} />
      </Suspense>
      <div className="mb-4 flex flex-wrap gap-3">
        {taskTypes.map((taskType) => (
          <Badge variant={"outline"} key={taskType}>
            {taskType
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </Badge>
        ))}
      </div>
      <h1 className="mb-6 text-2xl font-semibold">{task.name}</h1>
      <div className="relative w-full h-[165px] mb-6 rounded-md overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${featuredImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      {task.description && (
        <div
          className="prose prose-lg prose-slate  dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full mb-6"
          dangerouslySetInnerHTML={{ __html: task.description as string }}
        />
        // <div
        //   className={cn(
        //     "prose prose-slate max-w-none dark:prose-invert dark:text-foreground",
        //     // headings
        //     "prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-normal lg:prose-headings:scroll-mt-[8.5rem]",
        //     // lead
        //     "prose-lead:text-foreground",
        //     // links
        //     "prose-a:font-semibold dark:prose-a:text-sky-400",
        //     // link underline
        //     "prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]",
        //     // pre
        //     "prose-pre:rounded-xl prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10",
        //     // hr
        //     "dark:prose-hr:border-slate-800"
        //   )}
        // >
        //   <MDXRemote
        //     source={taskDescription}
        //     components={customMDXComponents}
        //   />
        // </div>
      )}

      {/* {taskDescription} */}
      <div className="w-64 mb-6">
        <TaksAttributes
          rewards={rewards}
          efforts={deadLine}
          deadline={deadLine}
        />
      </div>
      <AttachmentClient attachments={files} />
    </div>
  );
};

export default Detail;
