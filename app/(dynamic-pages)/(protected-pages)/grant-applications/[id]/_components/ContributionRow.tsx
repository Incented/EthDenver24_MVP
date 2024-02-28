import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TableCell, TableRow } from "@/components/ui/table";
import { getContributionAndUserProfile, getValidationsForContribution } from "@/data/user/tasks";
import { getUserProfile } from "@/data/user/user";
import { Table } from "@/types";
import { User } from "lucide-react";
import { FC } from "react";
import { ContributionDescription } from "./ContributionDescription";
import ContributionDetailsSheet from "./ContributionDetailsSheet";
import ValidateSheet from "./ValidateSheet";

interface ContributionRowProps {
  contribution: Table<"contributions">;
  allContributions: Table<"contributions">[];
  loggedInUser: string;
}
const ContributionRow: FC<ContributionRowProps> = async ({
  contribution,
  allContributions,
  loggedInUser,
}) => {

  const { user_id } = contribution;
  const [contributorProfile, validationsForContribution] = await Promise.all([
    getUserProfile(user_id),
    getValidationsForContribution(contribution.id),
  ]);

  const allContributionsWithIndexes = allContributions.map((c, i) => ({ ...c, index: i + 1 }));

  const otherContributionsData = await Promise.all(
    allContributionsWithIndexes.filter((c) => c.id !== contribution.id).map(async (c) => {
      const data = await getContributionAndUserProfile(c.id);
      return { ...data, index: c.index };
    })
  );
  return (
    <TableRow>
      <TableCell className="px-6"><ContributionDescription description={contribution.description} /></TableCell>
      <TableCell>
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage
              src={contributorProfile?.avatar_url || ""} />
            <AvatarFallback>{contributorProfile?.full_name?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <p className="text-sm">{contributorProfile?.full_name}</p>

        </div>
      </TableCell>
      <TableCell className="">
        <div className="flex items-center justify-center gap-1">
          <User />
          <p className="text-lg text-primary">{validationsForContribution?.length || 0}</p>
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center space-x-2">
          <ContributionDetailsSheet contribution={contribution} contributorProfile={contributorProfile}
            otherContributionsData={otherContributionsData} />
          <ValidateSheet contribution={contribution} contributorProfile={contributorProfile} task_id={contribution.id}
            loggedInUser={loggedInUser}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default ContributionRow;
