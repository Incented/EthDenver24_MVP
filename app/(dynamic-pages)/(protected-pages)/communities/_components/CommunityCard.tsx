import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import JoinCommunityModal from "./JoinCommunityModal";
import {
  getTeamMembersCountInOrganization,
  getTeamMembersInOrganization,
} from "@/data/user/organizations";
import { Button } from "@/components/ui/button";
import BookmarkComponent from "./BookMarkComponent";

interface CommunityCardProps {
  communityName: string;
  communityDescription?: string;
  communityImage?: string;
  communityTasks?: number;
  communityAddress?: string;
  communityId: string;
  communityCreatedBy?: string;
  userId: string;
  isBookmarked?: boolean;
}

const CommunityCard: FC<CommunityCardProps> = async ({
  communityName,
  communityCreatedBy,
  userId,
  communityDescription = "Buan is a community of people who are passionate about learning new things.",
  communityImage,
  communityTasks = 100,
  communityAddress = "New York, USA",
  communityId: id,
  isBookmarked,
}) => {
  const communityMembers = await getTeamMembersCountInOrganization(id);
  const members = await getTeamMembersInOrganization(id);
  const isMember = members.some((member) => member.member_id === userId);
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
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
          <Link href={`/communities/${id}`}>{communityName}</Link>
          <p className="text-xs text-gray-400">{communityAddress}</p>
        </div>
        {/* <Button
          variant="outline"
          className="flex items-center px-2 justify-center ml-auto border rounded-full"
        >
          <Bookmark size={20} className="text-primary" />
        </Button> */}
        <BookmarkComponent
          id={userId}
          organizationId={id}
          isBookmarked={isBookmarked}
        />
      </div>
      <p className="mb-4 text-xs text-gray-400">{communityDescription}</p>

      <div className="flex items-center gap-3 mb-4">
        <div className="">
          <p>{communityTasks}</p>
          <p className="text-xs text-gray-400">Active Tasks</p>
        </div>
        <div className="h-[35px] w-[1px] bg-gray-500" />

        <div className="">
          <p>{communityMembers}</p>
          <p className="text-xs text-gray-400">Total Members</p>
        </div>
      </div>

      {isMember ? (
        <JoinCommunityModal
          triggerText="Join"
          community={communityName}
          userId={communityCreatedBy}
        />
      ) : (
        <JoinCommunityModal triggerText="Join" community={communityName} />
      )}
    </Card>
  );
};

export default CommunityCard;
