import { cn } from "@/lib/utils";
import { AlarmClock, Calendar, Carrot, LucideIcon } from "lucide-react";
import { FC } from "react";

interface TaksAttributesProps {
  rewards: string;
  efforts?: string;
  deadline?: string;
  isGrant?: boolean;
}

const TaksAttributes: FC<TaksAttributesProps> = ({
  rewards,
  efforts = "",
  deadline = "",
  isGrant
}) => {
  return (
    <div className="flex flex-col w-full gap-4">
      <Attribute Icon={Carrot} value={rewards} title="Rewards" isGrant={isGrant} />
      <Attribute Icon={Calendar} value={efforts} title="Efforts" isGrant={isGrant} />
      <Attribute Icon={AlarmClock} value={deadline} title="Deadline" isGrant={isGrant} />
    </div>
  );
};

export const Attribute = ({
  Icon,
  title,
  value,
  isGrant
}: {
  Icon: LucideIcon;
  title: string;
  value: string;
  isGrant?: boolean;
}) => {
  return (
    <div className="grid items-center w-full grid-cols-2 gap-2">
      <div className="flex items-center w-full gap-2 ">
        <div className={cn("flex items-center justify-center w-6 h-6 text-white rounded-md", isGrant ? "bg-[#12AAFF]" : "bg-primary")}>
          <Icon size={16} />
        </div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <div className="w-full text-muted-foreground text-start whitespace-nowrap">
        <p className="text-sm ">{`: ${value}`}</p>
      </div>
    </div>
  );
};

export default TaksAttributes;
