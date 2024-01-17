import { LucideIcon } from "lucide-react";
import { Card } from "./card";
import { FC } from "react";

interface DashboardCardProps {
  Icon: LucideIcon;
  title: string;
  value: number;
  description: string;
}

const DashboardCard: FC<DashboardCardProps> = ({
  Icon,
  title,
  value,
  description,
}) => {
  return (
    <Card className="min-w-[230px] w-full p-6 shadow-sm">
      <div className="flex justify-between">
        <h2 className="">{title}</h2>
        <Icon size={20} />
      </div>
      <div className="mt-2">
        <h1 className="text-2xl font-bold leading-8">{value}</h1>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </Card>
  );
};

export default DashboardCard;
