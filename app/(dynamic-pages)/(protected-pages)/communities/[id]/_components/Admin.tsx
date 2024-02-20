import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

import { TeamMembersTableProps } from "@/types";

type CommunityMembersProps = {
  communityMembers: TeamMembersTableProps["members"];
};

const Admin = ({ communityMembers }: CommunityMembersProps) => {
  return (
    <Card className="p-4 bg-muted">
      <h1 className="mb-2">Admin</h1>
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-[60px] h-[60px]">
          <AvatarImage
            src={communityMembers[0].avatar_url || ""}
            className="object-cover"
          />
          <AvatarFallback className="bg-background">
            {communityMembers?.[0]?.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="">{communityMembers[0].name?.split(" ")[0]}</h1>
          <p className="text-xs text-muted-foreground">example@gmail.com</p>
        </div>
      </div>
    </Card>
  );
};

export default Admin;
