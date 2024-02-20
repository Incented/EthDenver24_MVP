import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, Link as LinkIcon, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

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
    <Card className="col-span-1 w-full lg:min-w-[281px] border-none bg-muted p-6">
      <div className="flex items-center gap-3 mb-4">
        <Avatar className="w-[80px] h-[80px]">
          <AvatarImage src={communityImage} className="object-cover" />
          <AvatarFallback className="bg-background">
            {communityName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-lg font-semibold">{communityName}</h1>
          <p className="text-xs text-muted-foreground">
            {communityMembersCount} members
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 p-1 mb-2 text-xs rounded-md bg-background">
        <h4>Protocol Fee : </h4> <span>1%</span>
      </div>
      <div className="flex items-center justify-center gap-3 p-1 mb-3 text-xs rounded-md bg-background">
        <h4>Community Fee : </h4> <span>1%</span>
      </div>
      <p className="mb-4 text-sm leading-6 text-muted-foreground">
        {communityDescription}
        {communityDescription && communityDescription?.length > 100 && (
          <span className="text-primary">See more</span>
        )}
      </p>
      <div className="flex flex-col max-w-md gap-y-4">
        <Link
          href={communityUrls?.website || ""}
          className="flex items-center gap-2"
        >
          <LinkIcon size={24} className="p-1 rounded-md bg-border" />
          <p className="w-40 text-xs truncate text-muted-foreground">
            {communityUrls?.website || "Not provided"}
          </p>
        </Link>
        <Link
          href={communityUrls?.facebook || ""}
          className="flex items-center gap-2"
        >
          <Facebook
            size={24}
            className="p-1 rounded-md text-foreground bg-border"
          />
          <p className="w-40 text-xs truncate text-muted-foreground">
            {communityUrls?.facebook || "Not provided"}
          </p>
        </Link>
        <Link
          href={communityUrls?.twitter || ""}
          className="flex items-center gap-2"
        >
          <Twitter
            size={24}
            className="p-1 rounded-md text-foreground bg-border"
          />
          <p className="w-40 text-xs truncate text-muted-foreground">
            {communityUrls?.twitter || "Not provided"}
          </p>
        </Link>
        <Link
          href={communityUrls?.linkedin || ""}
          className="flex items-center gap-2"
        >
          <Linkedin
            size={24}
            className="p-1 rounded-md text-foreground bg-border"
          />
          <p className="w-40 text-xs truncate text-muted-foreground">
            {communityUrls?.linkedin || "Not provided"}
          </p>
        </Link>
      </div>
      <Button
        variant="ghost"
        className="p-0 text-primary hover:text-primary/80"
      >
        {" "}
        View Roles / Permissions
      </Button>
    </Card>
  );
}

export default CommunityInfo;
