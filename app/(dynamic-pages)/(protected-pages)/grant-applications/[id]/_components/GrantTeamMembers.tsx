import { Button } from "@/components/ui/button";
import { TeamMembersTableProps } from "@/types";
import GrantProjectTeamMember from "./GrantProjectTeamMember";

type CommunityMembersProps = {
  communityMembers: TeamMembersTableProps["members"];
};

export function GrantTeamMembers({ communityMembers }: CommunityMembersProps) {
  return (
    <div className="bg-muted-foreground/10 rounded-md max-h-[338px] overflow-y-scroll">
      <div className="p-8 gap-4 flex  flex-col  border-none min-w-[281px]">
        <div className="flex flex-col gap-6">
          <h1 className="leading-[14px] text-sm font-semibold">
            Team members
          </h1>
          <div className="flex flex-col mb-10 gap-y-4">
            {communityMembers?.map((member) => {
              return (
                <GrantProjectTeamMember
                  key={member.id}
                  name={member.name ?? "Community Member"}
                  imageUrl={member.avatar_url ?? ""}
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

export default GrantTeamMembers;
