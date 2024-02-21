import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Enum } from "@/types";
import { FC } from "react";
import Contribution from "./Contribution";

interface ContributionTableProps {
  task_status?: Enum<"task_status">;
}

const contributions = [{
  description: "Try to calculate the EXE fee...",
  member: { name: "Randy Dias", imageUrl: "/assets/avatar_1.jpg" },
  attchedFiles: [],
  validators: [],
},
{
  description: "Try to calculate the EXE fee...",
  member: { name: "Randy Dias", imageUrl: "/assets/avatar_1.jpg" },
  attchedFiles: [],
  validators: [],
}];

const ContributionTable: FC<ContributionTableProps> = ({ task_status }) => {
  return (
    <Card className="border-none bg-transparent">
      <h1 className="mb-2 text-lg font-bold leading-8">Contributions</h1>
      <div className="w-full border rounded-md overflow-hidden">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">
                Solution Description
              </TableHead>
              <TableHead className="text-center whitespace-nowrap">
                Total Validators
              </TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          {task_status === "prioritized" && contributions.length !== 0 && (
            <TableBody>
              {contributions.map((contribution, index) => (
                <Contribution key={index} />
                // Assuming Contribution is a component that takes a contribution prop
              ))}
            </TableBody>
          )}
        </Table>
        {task_status === "prioritized" && contributions.length === 0 && (
          <div className="flex items-center p-4 justify-center w-full">
            <h1 className="text-sm text-muted-foreground whitespace-nowrap">
              No Contributions yet
            </h1>
          </div>
        )}
        {task_status === "new_task" && (
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
