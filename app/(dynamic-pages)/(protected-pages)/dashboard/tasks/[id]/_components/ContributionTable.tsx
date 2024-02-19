import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC } from "react";
import Contribution from "./Contribution";

interface ContributionTableProps {}

const contributions = [1];

const ContributionTable: FC<ContributionTableProps> = ({}) => {
  return (
    <Card className="border-none">
      <h1 className="mb-2 text-lg font-bold leading-8">Contributions</h1>
      <Table className="border rounded-md">
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
        <TableBody>
          {contributions.length === 0 ? (
            <TableRow className="flex justify-center">
              <TableCell className="px-6">
                <h1 className="w-full text-center whitespace-nowrap">
                  No Contributions yet
                </h1>
              </TableCell>
            </TableRow>
          ) : (
            <>
              <Contribution />
              <Contribution />
            </>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ContributionTable;
