import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

import { TeamMembersTableProps } from "@/types";

type CommunityMembersProps = {
  communityMembers: TeamMembersTableProps["members"];
};

const Admin = ({ communityMembers }: CommunityMembersProps) => {
  return (
    <Card className="p-4 bg-muted-foreground/10">
      <h1 className="mb-2">Admin</h1>
      {communityMembers.map((member, index) => (
        <div key={index} className="flex items-center gap-3 mb-4">
          <Avatar className="w-10 h-10">
            <AvatarImage
              src={member?.avatar_url}
              className="object-cover"
            />
            <AvatarFallback className="bg-background">
              {member?.name?.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1>{member.name?.split(" ")[0]}</h1>
            {/* <p className="text-xs text-muted-foreground">example@gmail.com</p> */}
          </div>
        </div>
      ))}

    </Card>
  );
};

export default Admin;
