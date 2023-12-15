import { AlarmClock, Calendar, Carrot, LucideIcon } from "lucide-react";
import { FC } from "react";

interface TaksAttributesProps {
  rewards?: string;
  efforts?: string;
  deadline?: string;
}

const TaksAttributes: FC<TaksAttributesProps> = ({
  rewards = "",
  efforts = "",
  deadline = "",
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Attribute Icon={Carrot} value={rewards} title="Rewards" />
      <Attribute Icon={Calendar} value={efforts} title="Efforts" />
      <Attribute Icon={AlarmClock} value={deadline} title="Deadline" />
    </div>
  );
};

export const Attribute = ({
  Icon,
  title,
  value,
}: {
  Icon: LucideIcon;
  title: string;
  value: string;
}) => {
  return (
    <div className="grid grid-cols-2 w-[200px]">
      <div className="">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-6 h-6 text-white rounded-md bg-primary">
            <Icon size={18} />
          </div>
          <p className="text-sm ">{title}</p>
        </div>
      </div>
      <div className="pl-6 text-start whitespace-nowrap">
        <p className="text-sm ">{`:${value}`}</p>
      </div>
    </div>
  );
};

export default TaksAttributes;
