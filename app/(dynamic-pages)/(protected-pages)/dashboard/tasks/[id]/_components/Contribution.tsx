"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ValidateDrawer from "./ValidateDrawer";
import { User } from "lucide-react";
import { FC } from "react";

interface ContributionProps {
  description?: string;
  member?: { name: string; imageUrl: string };
  attchedFiles?: [];
  validators?: [];
}
const Contribution: FC<ContributionProps> = ({
  description = "Try to calculate the EXE fee...",
  validators = [],
}) => {
  return (
    <TableRow>
      <TableCell className="px-6">{description}</TableCell>

      <TableCell className="">
        <div className="flex items-center justify-center gap-1">
          <User />
          <p className="text-lg text-primary">{validators.length}</p>
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center space-x-2">
          <Button variant="outline" size="sm" className="text-foreground">
            View Details
          </Button>
          <ValidateDrawer />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Contribution;
