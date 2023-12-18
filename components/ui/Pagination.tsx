"use client";

import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "./button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  title: string;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  title,
}) => {
  return (
    <div className="flex items-center justify-between w-full gap-6 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-1">
        <p className="whitespace-nowrap">
          {currentPage} of {totalPages} {title}(s)
        </p>
      </div>

      <div className="flex gap-8">
        <div className="flex items-center gap-2 ">
          <p className="whitespace-nowrap">{title} per page</p>
          <Select>
            <SelectTrigger className="w-[100px]">
              <SelectValue defaultValue={5} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-6">
          <p className="whitespace-nowrap">
            page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <ChevronsLeft size={20} />
            </Button>
            <Button size="sm" variant="outline">
              <ChevronLeft size={20} />
            </Button>
            <Button size="sm" variant="outline">
              <ChevronRight size={20} />
            </Button>
            <Button size="sm" variant="outline">
              <ChevronsRight size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
