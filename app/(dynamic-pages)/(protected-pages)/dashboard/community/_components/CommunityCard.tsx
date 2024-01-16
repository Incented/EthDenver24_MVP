import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

import JoinCommunityModal from "./JoinCommunityModal";

interface CommunityCardProps {
  communityName?: string;
  communityDescription?: string;
  communityImage?: string;
  communityMembers?: number;
  communityTasks?: number;
  communityAddress?: string;
}

const CommunityCard: FC<CommunityCardProps> = ({
  communityName = "Buan",
  communityDescription = "Buan is a community of people who are passionate about learning new things.",
  communityImage = "/assets/avatar_2.jpg",
  communityMembers = 100,
  communityTasks = 100,
  communityAddress = "New York, USA",
}) => {
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
          <Link href="/dashboard/community-details">{communityName}</Link>
          <p className="text-xs text-gray-400">{communityAddress}</p>
        </div>
        <div className="flex items-center justify-center w-8 h-8 ml-auto border border-gray-400 rounded-full text-primary">
          <Bookmark size={20} />
        </div>
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

      <JoinCommunityModal triggerText="Join" community={communityName} />
    </Card>
  );
};

export default CommunityCard;
