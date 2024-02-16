import { FC } from "react";
import { Info } from "lucide-react";
import { TooltipWrapper } from "@/components/ui/tooltip";
import TaksAttributes from "@/components/presentational/Tasks/TaksAttributes";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Attachment } from "./Attachment";
interface DetailProps {
  taskTitle: string;
  taskDescription: string | null | undefined;
  taskTypes: string[];
  rabbitHole: string;
  imageUrl: string;
  deadLine: string;
  rewards: string;
  efforts: string;
  attachments: string[];
}
const Detail: FC<DetailProps> = ({
  rabbitHole,
  taskTypes,
  taskTitle,
  taskDescription,
  imageUrl,
  rewards,
  efforts,
  deadLine,
  attachments,
}) => {
  return (
    // TODO: Fix Hard-coded color
    <div className="p-8 bg-muted/50">
      <div className="flex items-center gap-2 mb-6 text-sm">
        <p>{rabbitHole}</p>
        <TooltipWrapper
          tooltipTrigger={<Info size={18} className="cursor-pointer" />}
          tooltipContent={
            <div>
              <p className="mb-2 text-sm">Community Details</p>
              <p className="mb-1 text-xs">
                Prioritization Reward Percentage 10%
              </p>
              <p className="text-xs">Validation Reward Percentage 10%</p>
            </div>
          }
        />
      </div>
      <div className="mb-4 flex flex-wrap gap-3">
        {taskTypes.map((taskType) => (
          <Badge variant={"outline"}>{taskType}</Badge>
        ))}
      </div>
      {/* TODO: verify if time posted should be present in design */}
      {/* <p className="block text-xs text-gray-400 mt-4">Posted 5 days ago</p> */}
      <h1 className="mb-6 text-2xl font-semibold">{taskTitle}</h1>
      {/* TODO: re-think a way for height of image style - h-[165px] in the div below */}
      <div className="relative w-full h-[165px] mb-6 rounded-md overflow-hidden">
        <Image
          src={imageUrl}
          alt={imageUrl}
          fill
          className="object-cover object-center"
        />
      </div>
      <p className="mb-6 text-sm font-normal leading-6 text-gray-500">
        {taskDescription}
      </p>
      {
        <div className="w-64 mb-6">
          <TaksAttributes
            rewards={rewards}
            efforts={efforts}
            deadline={deadLine}
          />
        </div>
      }

      {attachments.length > 0 ? (
        <div>
          <h4 className="mb-2 text-sm font-medium ">Attachment files</h4>
          <div className="flex flex-wrap items-center gap-2">
            {attachments.map((file) => (
              <Attachment fileName={file} />
            ))}
          </div>
        </div>
      ) : (
        0
      )}
    </div>
  );
};

export default Detail;
