import { TableCell, TableRow } from "@/components/ui/table";
import { getValidationsForContribution } from "@/data/user/tasks";
import { Table } from "@/types";
import { User } from "lucide-react";
import { FC } from "react";
import ContributionDetailsSheet from "./ContributionDetailsSheet";
import ValidateDrawer from "./ValidateDrawer";

interface ContributionProps {
  contribution: Table<"contributions">;
}
const Contribution: FC<ContributionProps> = async ({
  contribution
}) => {
  const validationsForContribution = await getValidationsForContribution(contribution.id);
  return (
    <TableRow>
      <TableCell className="px-6">{contribution.description}</TableCell>
      <TableCell className="">
        <div className="flex items-center justify-center gap-1">
          <User />
          <p className="text-lg text-primary">{validationsForContribution?.length || 0}</p>
        </div>
      </TableCell>
      <TableCell className="text-center">
        <div className="flex justify-center space-x-2">
          <ContributionDetailsSheet />
          <ValidateDrawer />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default Contribution;
