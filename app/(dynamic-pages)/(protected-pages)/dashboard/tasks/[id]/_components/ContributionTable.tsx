"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File, User } from "lucide-react";
import { FC } from "react";

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
            <TableHead className="">Member</TableHead>
            <TableHead className="text-center whitespace-nowrap">
              Attachment File
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
            <TableRow>
              <TableCell className="px-6">
                Try to calculate the EXE fee...
              </TableCell>
              <TableCell className="">
                <div className="flex items-center gap-1">
                  <Avatar>
                    <AvatarImage src="/assets/avatar_1.jpg" />
                  </Avatar>
                  <p>Randy Dias</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <File />
                  <p className="text-lg text-primary">3</p>
                </div>
              </TableCell>
              <TableCell className="">
                <div className="flex items-center justify-center gap-1">
                  <User />
                  <p className="text-lg text-primary">3</p>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-foreground"
                  >
                    View Details
                  </Button>
                  <Button size="sm">Validate</Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default ContributionTable;
