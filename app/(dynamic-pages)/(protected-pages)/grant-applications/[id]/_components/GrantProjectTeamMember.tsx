import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";

interface GrantProjectTeamMemberProps {
  name: string;
  imageUrl: string;
}

const GrantProjectTeamMember: FC<GrantProjectTeamMemberProps> = ({ name, imageUrl }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback className="bg-background">
          {name?.slice(0, 2)}
        </AvatarFallback>
      </Avatar>
      <p className="text-sm">{name}</p>
    </div>
  );
};

export default GrantProjectTeamMember;
