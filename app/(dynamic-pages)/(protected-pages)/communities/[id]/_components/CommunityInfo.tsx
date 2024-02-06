import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Facebook, Link as LinkIcon, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type CommunityInfoProps = {
  communityName: string;
  communityDescription?: string;
  communityImage?: string;
  communityMembersCount?: number;
  communityUrls?: {
    website?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    instagram?: string;
  };
};

function CommunityInfo({
  communityName,
  communityDescription,
  communityImage,
  communityMembersCount,
  communityUrls,
}: CommunityInfoProps) {
  return (
    <Card className="col-span-1 w-full lg:min-w-[281px] border-none bg-muted p-8">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={communityImage} className="object-cover" />
          <AvatarFallback className=" bg-background">
            {communityName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="">
          <h1 className="text-lg font-semibold">{communityName}</h1>
          <p className="text-xs text-muted-foreground">
            {/* {communityMembers}  */}
            {communityMembersCount} members
          </p>
        </div>
      </div>
      <p className="mb-4 text-sm leading-6 text-muted-foreground">
        {communityDescription} <span className="text-primary">See more</span>
      </p>
      <div className="flex flex-col gap-y-4 max-w-md">
        <Link
          href={communityUrls?.website || ""}
          className="flex items-center gap-2"
        >
          <LinkIcon size={24} className="p-1 text-black bg-border rounded-md" />
          <p className="text-xs text-muted-foreground truncate w-40">
            {communityUrls?.website || "Not provided"}
          </p>
        </Link>
        <Link
          href={communityUrls?.facebook || ""}
          className="flex items-center gap-2"
        >
          <Facebook
            size={24}
            className="p-1 text-foreground bg-border rounded-md"
          />
          <p className="text-xs text-muted-foreground truncate w-40">
            {communityUrls?.facebook || "Not provided"}
          </p>
        </Link>
        <Link
          href={communityUrls?.twitter || ""}
          className="flex items-center gap-2"
        >
          <Twitter
            size={24}
            className="p-1 text-foreground bg-border rounded-md"
          />
          <p className="text-xs text-muted-foreground truncate w-40">
            {communityUrls?.twitter || "Not provided"}
          </p>
        </Link>
        <Link
          href={communityUrls?.linkedin || ""}
          className="flex items-center gap-2"
        >
          <Linkedin
            size={24}
            className="p-1 text-foreground bg-border rounded-md"
          />
          <p className="text-xs text-muted-foreground truncate w-40">
            {communityUrls?.linkedin || "Not provided"}
          </p>
        </Link>
      </div>
    </Card>
  );
}

export default CommunityInfo;

// communityName = "Buan",
// communityDescription = "Buan is a community of people who are passionate about learning new things.",
// communityImage = "/assets/avatar_2.jpg",
// communityMembers = 100,
// communityTasks = 100,
// communityUrl = "www.buanfund.com",
