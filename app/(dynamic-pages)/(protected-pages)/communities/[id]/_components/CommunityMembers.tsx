import { Button } from "@/components/ui/button";
import CommunityMember from "./CommunityMember";
import { Card } from "@/components/ui/card";

import { TeamMembersTableProps } from "@/types";

type CommunityMembersProps = {
  communityMembers: TeamMembersTableProps["members"];
};

export function CommunityMembers({ communityMembers }: CommunityMembersProps) {
  return (
    <div className="bg-muted-foreground/10 rounded-md max-h-[338px] overflow-y-scroll">
      <div className="p-8 gap-4 flex  flex-col  border-none min-w-[281px]">
        <div className="flex flex-col gap-6">
          <h1 className="leading-[14px] text-sm font-semibold">
            Community members
          </h1>
          <div className="flex flex-col mb-10 gap-y-4">
            {communityMembers?.map((member) => {
              return (
                <CommunityMember
                  key={member.id}
                  name={member.name ?? "Community Member"}
                  imageUrl=""
                />
              );
            })}
          </div>
          {communityMembers.length > 3 && (
            <Button variant="ghost" className="justify-center text-primary">
              Show More
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunityMembers;
