import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
    <div className="border rounded-md overflow-hidden w-full">
      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead className="px-6 whitespace-nowrap">
              Solution Description
            </TableHead>
            <TableHead className="px-6 whitespace-nowrap">Member</TableHead>
            <TableHead className="px-6 whitespace-nowrap">
              Attachment File
            </TableHead>
            <TableHead className="px-6 whitespace-nowrap">
              Total Validators
            </TableHead>
            <TableHead className="px-6 text-center whitespace-nowrap">
              Action
            </TableHead>
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
              <TableCell className="px-6 whitespace-nowrap">
                Try to calculate the EXE fee...
              </TableCell>
              <TableCell className="whitespace-nowrap">
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
                    className="bg-white text-foreground"
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
    </div>
  );
};

export default ContributionTable;
