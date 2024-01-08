import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { FC } from "react";

interface CommunityMemberProps {
  name: string;
  imageUrl: string;
}

const CommunityMember: FC<CommunityMemberProps> = ({ name, imageUrl }) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar>
        <AvatarImage src={imageUrl} className="object-cover" />
      </Avatar>
      <p className="text-sm">{name}</p>
    </div>
  );
};

export default CommunityMember;
