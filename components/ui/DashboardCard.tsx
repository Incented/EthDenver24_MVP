import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { FC } from "react";
import { Card } from "./card";

interface DashboardCardProps {
  Icon: LucideIcon;
  title: string;
  value: number;
  description: string;
  changeValueColor?: boolean;
}

const DashboardCard: FC<DashboardCardProps> = ({
  Icon,
  title,
  value,
  description,
  changeValueColor
}) => {
  return (
    <Card className="min-w-[230px] w-full p-6 shadow-sm">
      <div className="flex justify-between">
        <h2 className="">{title}</h2>
        <Icon size={20} />
      </div>
      <div className="mt-2">
        <h1 className={cn("text-2xl font-bold leading-8", changeValueColor && "text-primary")}>{value}</h1>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </Card>
  );
};

export default DashboardCard;
