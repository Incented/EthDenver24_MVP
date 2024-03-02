import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Link from "next/link";

import {
  getTeamMembersCountInOrganization,
  getTeamMembersInOrganization
} from "@/data/user/organizations";

type GrantProgramCardProps = {
  communityName: string;
  communityDescription?: string;
  communityImage?: string;
  communityTasks?: number;
  communityAddress?: string;
  communityId: string;
  communityCreatedBy?: string;
};

export async function GrantProgramCard({
  communityName,
  communityDescription,
  communityImage,
  communityTasks,
  communityAddress,
  communityId: id,
  communityCreatedBy,
}: GrantProgramCardProps) {
  const [communityMembers, members] = await Promise.all([
    getTeamMembersCountInOrganization(id),
    getTeamMembersInOrganization(id),
  ]);
  return (
    <Link href={`/grants/${id}`}>
      <Card className="gap-4 p-6 rounded-lg cursor-pointer"
      >
        <div className="flex items-center gap-4 mb-4">
          <Avatar>
            <AvatarImage
              src={communityImage}
              className="object-cover w-10 h-10 rounded-full"
            />
            <AvatarFallback>
              {communityName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p
              className="text-base font-bold leading-7 text-foreground"
            >
              {communityName ?? "Community Name"}
            </p>
            <p className="text-xs text-muted-foreground">
              {communityAddress ?? "New York, USA"}
            </p>
          </div>
        </div>

        {communityDescription ? <div className="text-sm text-muted-foreground leading-6 leading- truncate line-clamp-1" dangerouslySetInnerHTML={{ __html: communityDescription as string }} /> : <p className="mb-4 text-sm text-muted-foreground">"Buan onsulting is a community of developers"</p>}

        <div className="flex items-center gap-3 mb-4">
          <div className="">
            <p className="text-base font-bold leading-7">
              {communityTasks ?? 100}
            </p>
            <p className="text-xs leading-[14px] text-muted-foreground">
              Active Tasks
            </p>
          </div>
          <div className="h-[35px] w-[1px] bg-muted" />

          <div className="">
            <p className="text-base font-bold leading-7">{communityMembers}</p>
            <p className="text-xs leading-[14px] text-muted-foreground">
              Total members
            </p>
          </div>
        </div>

        {/* {isMember ? (
        <JoinCommunityModal
          triggerText="Join"
          community={communityName}
          userId={communityCreatedBy}
        />
      ) : (
        <JoinCommunityModal triggerText="Join" community={communityName} />
      )} */}
      </Card>
    </Link >
  );
}

export default GrantProgramCard;
