import { AlarmClock, Calendar, DollarSign, LucideIcon } from "lucide-react";
import { FC } from "react";

interface GrantApplicationAttributesProps {
  amount: string;
  efforts?: string;
  deadline?: string;
}

const GrantApplicationAttributes: FC<GrantApplicationAttributesProps> = ({
  amount,
  efforts = "",
  deadline = "",
}) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Attribute Icon={DollarSign} value={amount} title="Amount" />
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
    <div className="grid grid-cols-2 gap-2 items-center w-full">
      <div className=" flex items-center gap-2 w-full">
        <div className="flex items-center justify-center w-6 h-6 text-white rounded-md bg-primary">
          <Icon size={16} />
        </div>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      <div className="text-muted-foreground text-start w-full whitespace-nowrap">
        <p className="text-sm ">{`: ${value}`}</p>
      </div>
    </div>
  );
};

export default GrantApplicationAttributes;
