import { Card } from "@/components/ui/card";
import {
  ShadcnTable,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Enum, Table } from "@/types";
import { FC, Suspense } from "react";
import MilestoneContributionRow from "./MilestoneContributionRow";

interface MilestoneContributionTableProps {
  grant_project_milestone_status?: Enum<"task_status">;
  contributions: Table<"grant_project_milestones_contributions">[];
  loggedInUser: string;
}

const MilestoneContributionTable: FC<MilestoneContributionTableProps> = async ({ grant_project_milestone_status, contributions, loggedInUser }) => {
  const showContributions = grant_project_milestone_status === "prioritized" || "claimed" && contributions.length !== 0;
  const noContributions = contributions.length === 0

  return (
    <Card className="border-none bg-transparent">
      <h1 className="mb-2 text-lg font-bold leading-8">Contributions</h1>
      <div className="w-full border dark:border-zinc-700 rounded-md overflow-hidden">
        <ShadcnTable >
          <TableHeader >
            <TableRow className="dark:border-zinc-700">
              <TableHead className="whitespace-nowrap">
                Solution Description
              </TableHead>
              <TableHead className="text-left ">
                Members
              </TableHead>
              <TableHead className="text-center whitespace-nowrap">
                Total Validators
              </TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          {contributions ?? showContributions ? (
            <TableBody>
              {contributions.map((contribution, index) => (
                <Suspense key={index} fallback={<div>Loading...</div>}>
                  <MilestoneContributionRow key={index} contribution={contribution} allContributions={contributions} loggedInUser={loggedInUser} />
                </Suspense>
              ))}
            </TableBody>
          ) : null}
        </ShadcnTable>
        {noContributions && (
          <div className="flex items-center p-4 justify-center w-full">
            <h1 className="text-sm text-muted-foreground whitespace-nowrap">
              No Contributions yet
            </h1>
          </div>
        )}
      </div>

    </Card>
  );
};

export default MilestoneContributionTable;
