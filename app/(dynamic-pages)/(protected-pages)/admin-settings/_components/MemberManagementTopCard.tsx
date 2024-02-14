import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Info, LucideIcon } from "lucide-react";
import { FC } from "react";

interface MemberManagementTopCardProps {
  value: string;
  text: string;
  Icon: LucideIcon;
}

const MemberManagementTopCard: FC<MemberManagementTopCardProps> = ({
  value,
  text,
  Icon,
}) => {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">{value}</h1>
          <Icon size={16} />
        </div>
      </CardHeader>
      <CardDescription className="flex items-center gap-4 mx-6 mb-4">
        <p className="text-xs">{text}</p>
        <Info size={12} />
      </CardDescription>
    </Card>
  );
};

export default MemberManagementTopCard;
