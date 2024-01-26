"use client";

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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PaginationProps = {
  totalPages: number;
  title: string;
  count: number;
  className?: string;
};

export function Pagination({
  totalPages,
  className,
  title,
  count,
}: PaginationProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams?.get("page")) || 1;
  let limit = Number(searchParams?.get("limit")) || 10;
  const calculatedTotalPages = Math.ceil(count / limit);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams || undefined);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const createLimitURL = (limit: number) => {
    const params = new URLSearchParams(searchParams || undefined);
    params.set("limit", limit.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <div
      className={cn(
        "flex items-center bg-background justify-between w-full py-4 px-2 gap-6 overflow-x-scroll text-sm scrollbar-hide",
        className
      )}
    >
      <div className="flex gap-1">
        <p className="text-sm text-muted-foreground whitespace-nowrap">
          {currentPage === calculatedTotalPages
            ? count - (currentPage - 1) * limit
            : limit}{" "}
          of {count} {title}
        </p>
      </div>

      <div className="flex gap-8">
        <div className="flex items-center gap-2 ">
          <p className="text-foreground whitespace-nowrap">{title} per page</p>
          <Select
            onValueChange={(value) =>
              router.push(createLimitURL(Number(value)))
            }
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="10" defaultValue="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-6">
          <p className="text-foreground whitespace-nowrap">
            Page {currentPage} of {calculatedTotalPages}
          </p>
          <div className="flex gap-2">
            <PaginationArrow
              direction="start"
              href={createPageURL(1)}
              isDisabled={currentPage === 1}
            />
            <PaginationArrow
              direction="left"
              href={createPageURL(currentPage - 1)}
              isDisabled={
                currentPage === 1 || currentPage > calculatedTotalPages
              }
            />
            <PaginationArrow
              direction="right"
              href={createPageURL(currentPage + 1)}
              isDisabled={currentPage >= calculatedTotalPages}
            />
            <PaginationArrow
              direction="end"
              href={createPageURL(calculatedTotalPages)}
              isDisabled={currentPage === calculatedTotalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function PaginationArrow({
  href,
  direction,
  isDisabled,
}: {
  href: string;
  direction: "start" | "left" | "right" | "end";
  isDisabled?: boolean;
}) {
  const className = cn("px-2", {
    "flex items-center justify-center text-muted-foreground rounded-md border text-muted-foreground h-9":
      isDisabled,
    "hover:bg-muted": !isDisabled,
    "": direction === "left",
    "": direction === "right",
  });

  const icon =
    direction === "left" ? (
      <ChevronLeft size={16} />
    ) : direction === "right" ? (
      <ChevronRight size={16} />
    ) : direction === "start" ? (
      <ChevronsLeft size={16} />
    ) : (
      <ChevronsRight size={16} />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link href={href}>
      <Button
        size="sm"
        variant="outline"
        className={className}
        disabled={isDisabled}
      >
        {icon}
      </Button>
    </Link>
  );
}

export default Pagination;
