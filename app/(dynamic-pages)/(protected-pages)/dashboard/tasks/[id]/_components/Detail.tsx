import { FC } from "react";
import { File, MoreVertical, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  TooltipWrapper,
} from "@/components/ui/tooltip";
import TaksAttributes from "@/components/presentational/Tasks/TaksAttributes";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
interface DetailProps {
  taskTitle?: string;
  taskDescription?: string | null | undefined;
  taskType?: string;
  rabbitHole?: string;
  imageUrl: string;
  deadLine?: string;
  rewards?: string;
  efforts?: string;
}
const Detail: FC<DetailProps> = (props) => {
  return (
    <div className="p-8 mt-6">
      <div className="flex items-center gap-2 mprops.b-6 text-sm">
        <p>{props.rabbitHole}</p>
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
      <Badge variant={"outline"}>{props.taskType}</Badge>
      <p className="text-xs text-gray-400">Posted 5 days ago</p>
      <h1 className="mb-6 text-2xl font-semibold">{props.taskTitle}</h1>
      <div className="relative w-full h-[165px] mb-6 rounded-md overflow-hidden">
        <Image
          src={props.imageUrl}
          alt={props.imageUrl}
          fill
          className="object-cover object-center"
        />
      </div>
      <p className="mb-6 text-sm font-normal leading-6 text-gray-500">
        {props.taskDescription}
      </p>
      <div className="w-64 mb-6">
        <TaksAttributes
          rewards={props.rewards}
          efforts={props.efforts}
          deadline={props.deadLine}
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
  );
};

export default Detail;
