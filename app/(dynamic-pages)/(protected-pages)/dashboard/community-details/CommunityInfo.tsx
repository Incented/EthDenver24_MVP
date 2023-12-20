import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Facebook, Link as LinkIcon, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface CommunityInfoProps {
  communityName?: string;
  communityDescription?: string;
  communityImage?: string;
  communityMembers?: number;
  communityTasks?: number;
  communityUrl?: string;
}

const CommunityInfo: FC<CommunityInfoProps> = ({
  communityName = "Buan",
  communityDescription = "Buan is a community of people who are passionate about learning new things.",
  communityImage = "/assets/avatar_2.jpg",
  communityMembers = 100,
  communityTasks = 100,
  communityUrl = "www.buanfund.com",
}) => {
  return (
    <Card className="w-[281px] p-4">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={communityImage} className="object-cover" />
        </Avatar>
        <div className="">
          <h1 className="text-lg font-semibold">{communityName}</h1>
          <p className="text-xs text-gray-400">{communityMembers} members</p>
        </div>
      </div>
      <p className="mb-4 text-sm text-gray-400">
        {communityDescription} <span className="text-primary">See more</span>
      </p>
      <div className="flex flex-col gap-y-4">
        <Link href={communityUrl} className="flex items-center gap-2">
          <LinkIcon
            size={24}
            className="p-1 text-black bg-gray-300 rounded-md"
          />
          <p className="text-xs">{communityUrl}</p>
        </Link>
        <Link href={communityUrl} className="flex items-center gap-2">
          <Facebook
            size={24}
            className="p-1 text-black bg-gray-300 rounded-md"
          />
          <p className="text-xs">{communityUrl}</p>
        </Link>
        <Link href={communityUrl} className="flex items-center gap-2">
          <Twitter
            size={24}
            className="p-1 text-black bg-gray-300 rounded-md"
          />
          <p className="text-xs">{communityUrl}</p>
        </Link>
        <Link href={communityUrl} className="flex items-center gap-2">
          <Linkedin
            size={24}
            className="p-1 text-black bg-gray-300 rounded-md"
          />
          <p className="text-xs">{communityUrl}</p>
        </Link>
      </div>
    </Card>
  );
};

export default CommunityInfo;
