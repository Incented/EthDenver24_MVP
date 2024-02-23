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
import Contribution from "./Contribution";

interface ContributionTableProps {
  task_status?: Enum<"task_status">;
  contributions: Table<"contributions">[];
  loggedInUser: string;
}

const ContributionTable: FC<ContributionTableProps> = async ({ task_status, contributions, loggedInUser }) => {
  const showContributions = task_status === "prioritized" || "claimed" && contributions.length !== 0;
  const noContributions = contributions.length === 0

  return (
    <Card className="border-none bg-transparent">
      <h1 className="mb-2 text-lg font-bold leading-8">Contributions</h1>
      <div className="w-full border rounded-md overflow-hidden">
        <ShadcnTable className="">
          <TableHeader>
            <TableRow>
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
                  <Contribution key={index} contribution={contribution} allContributions={contributions} loggedInUser={loggedInUser} />
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

export default ContributionTable;
