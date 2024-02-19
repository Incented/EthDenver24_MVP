import { FC } from "react";
import { Info } from "lucide-react";
import TaksAttributes from "@/components/presentational/Tasks/TaksAttributes";
import { Badge } from "@/components/ui/badge";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { customMDXComponents } from "@/components/mdxComponents";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";
import { AttachmentClient } from "../../create-task/components/AttachmentClient";
interface DetailProps {
  taskTitle: string;
  communityPrioritizationReward: number | null;
  communityValidationReward: number | null;
  communityName: string;
  taskDescription: string | null | undefined;
  taskTypes: string[];
  imageUrl: string;
  deadLine: string;
  rewards: string;
  efforts: string;
  attachments: Array<{
    name: string;
    url: string;
  }>;
}
const Detail: FC<DetailProps> = async ({
  taskTypes,
  communityName,
  communityPrioritizationReward,
  communityValidationReward,
  taskTitle,
  taskDescription,
  imageUrl,
  rewards,
  efforts,
  deadLine,
  attachments,
}) => {
  console.log(taskDescription);
  return (
    <div className="p-8 bg-accent/50">
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
      <h1 className="mb-6 text-2xl font-semibold">{taskTitle}</h1>
      <div className="relative w-full h-[165px] mb-6 rounded-md overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>
      {taskDescription && (
        <div
          className="prose prose-lg prose-slate  dark:prose-invert prose-headings:font-display font-default focus:outline-none max-w-full mb-6"
          dangerouslySetInnerHTML={{ __html: taskDescription as string }}
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
          efforts={efforts}
          deadline={deadLine}
        />
      </div>
      <AttachmentClient attachments={attachments} />
    </div>
  );
};

export default Detail;
