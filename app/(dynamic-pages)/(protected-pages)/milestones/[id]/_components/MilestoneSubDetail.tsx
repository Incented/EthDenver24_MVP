import { TooltipWrapper } from "@/components/TooltipWrapper";
import TaksAttributes from "@/components/presentational/Tasks/TaksAttributes";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { FC, Suspense } from "react";

import { getGrantProjectById } from "@/data/user/grant-projects";
import { Table } from "@/types";
import moment from "moment";
import { z } from "zod";
import { taskTypesSchema } from "../../../dashboard/tasks/create-task/components/CreateTaskFormSchema";
import { TaskFileArray } from "../../../grant-applications/[id]/_components/GrantApplicationDetail";
import { AttachmentClient } from "../../../grants/[id]/submit-application/components/AttachmentClient";

async function GrantProjectDetails({
  grantProjectId,
}: {
  grantProjectId: string;
}) {
  const grantProject = await getGrantProjectById(grantProjectId);
  const grantProjectName = grantProject.name;
  const grantProjectPrioritizationReward =
    grantProject.prioritization_reward_percentage;
  const grantProjectValidationReward = grantProject.validation_reward_percentage;
  return (
    <div className="flex items-center gap-2 mb-6 text-sm">
      <p>{grantProjectName}</p>
      <TooltipWrapper
        tooltipTrigger={<Info size={18} className="cursor-pointer" />}
        tooltipContent={
          <div>
            <p className="mb-2 text-sm">grantProject Details</p>
            <p className="mb-1 text-xs">
              Prioritization Reward Percentage{" "}
              {grantProjectPrioritizationReward
                ? `${grantProjectPrioritizationReward}%`
                : "Not specified"}
            </p>
            <p className="text-xs">
              Validation Reward Percentage{" "}
              {grantProjectValidationReward
                ? `${grantProjectValidationReward}%`
                : "Not specified"}
            </p>
          </div>
        }
      />
    </div>
  );
}
interface DetailProps {
  milestone: Table<"grant_project_milestones_2">;
}

export const filesSchema = z
  .array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  )
  .default([]);



const MilestoneSubDetail: FC<DetailProps> = async ({ milestone }) => {
  const grantProjectId = milestone.grant_project_id;
  const imageUrl = "/images/task1.jpeg";

  let taskStatusBg = "bg-black";

  if (milestone.grant_project_milestone_status === "in_progress") {
    taskStatusBg = "bg-green-500";
  } else if (milestone.grant_project_milestone_status === "prioritized") {
    taskStatusBg = "bg-primary";
  } else {
    taskStatusBg = "bg-black";
  }

  let files: TaskFileArray = [];
  let taskTypes: string[] = [];

  try {
    const arg =
      typeof milestone.files === "string" ? JSON.parse(milestone.files) : milestone.files;
    files = filesSchema.parse(arg);
    const extractedTypes =
      typeof milestone.grant_project_milestone_types === "string"
        ? JSON.parse(milestone.grant_project_milestone_types)
        : milestone.grant_project_milestone_types;
    taskTypes = taskTypesSchema.parse(extractedTypes);
  } catch (error) {
    console.log(error);
  }
  const firstFile = files[0];
  const featuredImageUrl = firstFile?.url ?? imageUrl;

  const deadLine = String(milestone.efforts);
  const rewards = String(milestone.rewards);

  try {
    const arg =
      typeof milestone.files === "string" ? JSON.parse(milestone.files) : milestone.files;
    files = filesSchema.parse(arg);
    const extractedTypes =
      typeof milestone.grant_project_milestone_types === "string"
        ? JSON.parse(milestone.grant_project_milestone_types)
        : milestone.grant_project_milestone_types;
    taskTypes = taskTypesSchema.parse(extractedTypes);
  } catch (error) {
    console.log(error);
  }

  const createdAt = moment(milestone.created_at);
  const timeSincePosted = createdAt.fromNow();
  return (
    <div className="p-8 bg-accent/50">
      <Suspense fallback={<div>Loading...</div>}>
        <GrantProjectDetails grantProjectId={grantProjectId} />
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
      <p className="text-sm text-muted-foreground">Posted {timeSincePosted}</p>
      <h1 className="mb-6 text-2xl font-semibold">{milestone.name}</h1>
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
      {milestone.description && (
        <div
          className="prose prose-lg prose-slate  dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full mb-6"
          dangerouslySetInnerHTML={{ __html: milestone.description as string }}
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

export default MilestoneSubDetail;
