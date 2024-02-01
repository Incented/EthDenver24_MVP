import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Facebook, Link as LinkIcon, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

type CommunityInfoProps = {
  communityName: string;
  communityDescription?: string;
  communityImage?: string;
  communityMembers?: number;
  communityUrls?: {
    website?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
};

function CommunityInfo({
  communityName,
  communityDescription,
  communityImage,
  communityMembers,
  communityUrls,
}: CommunityInfoProps) {
  return (
    <Card className="min-w-[281px] border-none bg-muted p-8">
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
            {communityMembers} members
          </p>
        </div>
      </div>
      <p className="mb-4 text-sm leading-6 text-muted-foreground">
        {communityDescription} <span className="text-primary">See more</span>
      </p>
      <div className="flex flex-col gap-y-4">
        <Link href="" className="flex items-center gap-2">
          <LinkIcon size={24} className="p-1 text-black bg-border rounded-md" />
          <p className="text-xs text-muted-foreground">
            {communityUrls?.website}
          </p>
        </Link>
        <Link href="" className="flex items-center gap-2">
          <Facebook
            size={24}
            className="p-1 text-foreground bg-border rounded-md"
          />
          <p className="text-xs text-muted-foreground">
            {communityUrls?.facebook}
          </p>
        </Link>
        <Link href="" className="flex items-center gap-2">
          <Twitter
            size={24}
            className="p-1 text-foreground bg-border rounded-md"
          />
          <p className="text-xs text-muted-foreground">
            {communityUrls?.linkedin}
          </p>
        </Link>
        <Link href="" className="flex items-center gap-2">
          <Linkedin
            size={24}
            className="p-1 text-foreground bg-border rounded-md"
          />
          <p className="text-xs text-muted-foreground">
            {communityUrls?.youtube}
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
