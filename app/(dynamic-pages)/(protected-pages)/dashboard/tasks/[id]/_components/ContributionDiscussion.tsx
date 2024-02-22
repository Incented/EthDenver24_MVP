import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { FC } from "react";

interface ContributionDiscussionProps {
  contributorImage: string;
  contributorName: string;
  contributorId: string;
  contributionCarrots: number;
  details: string;
  contributionCreatedAt: string;
}

const ContributionDiscussion: FC<ContributionDiscussionProps> = ({
  contributionCarrots,
  contributorId,
  contributorImage,
  contributorName,
  details,
  contributionCreatedAt,
}) => {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={contributorImage} className="object-cover" />
            <AvatarFallback className="bg-background">SV</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2 text-sm">
            <p className="text-sm truncate w-16">{contributorName}</p>
            {/* <Separator orientation="vertical" className="h-3 bg-gray-600" />
            <div className="flex items-center gap-2">
              <p>{contributionCarrots}</p>
              <Carrot size={16} className="text-primary" />
              <p>For</p>
            </div> */}
          </div>
        </div>
        <div className="rounded-full bg-secondary p-1 px-2">
          <h4 className="text-sm">Contr. #{contributionCreatedAt}</h4>
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">{details}</p>
    </Card>
  );
};

export default ContributionDiscussion;
