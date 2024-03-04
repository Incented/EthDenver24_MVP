"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { PopoverContent } from "@radix-ui/react-popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import urlJoin from "url-join";

interface FilterTypeMenuProps {
  taskTypes: {
    name: string,
    id: number,
    slug: string,
  }[];
}

export type task_slug =
  | "software-dev"
  | "hardware-dev"
  | "legal"
  | "marketing"
  | "labor"
  | "finance"
  | "design"
  | "manufacturing"
  | "research"
  | "communications"
  | "interview"
  | "translation"
  | "writing"
  | "data-analytics"
  | "operations"
  | "administrative"
  | "planning"
  | "construction"
  | "other";

const FilterTypeMenu: FC<FilterTypeMenuProps> = ({ taskTypes }) => {

  const [selectedTypes, setSelectedTypes] = useState<task_slug[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  let typeParams = searchParams?.getAll('type') ?? [];

  const toggleTypeSelection = (typeName: task_slug): void => {

    setSelectedTypes((currentSelected) => {
      const isSelected = currentSelected.includes(typeName);
      const newSelected = isSelected ? currentSelected.filter((type) => type !== typeName) : [...currentSelected, typeName];
      return newSelected;
    });

    const newSearchParams = new URLSearchParams(searchParams?.toString());
    const currentTypes = newSearchParams.getAll('type');

    if (currentTypes.includes(typeName)) {
      const filteredTypes = currentTypes.filter((type) => type !== typeName);
      newSearchParams.delete('type'); // Clear all 'type' entries
      filteredTypes.forEach((type) => newSearchParams.append('type', type)); // Re-add filtered types
    } else {
      newSearchParams.append('type', typeName);
    }

    const newUrl = urlJoin(pathname ?? '/', `?${newSearchParams.toString()}`);
    router.push(newUrl);
  }



  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-3 w-[168px]">
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        className="w-[338px] h-fit border bg-white dark:bg-accent z-50 mr-24 rounded-md pb-4"
      >
        <h1 className="p-3 text-muted-foreground text-sm">Type</h1>
        <div className="flex flex-wrap gap-2 mx-3 mt-2">
          {taskTypes.map((type) => (
            <Button
              key={type.name}
              onClick={(e) => {
                e.preventDefault();
                toggleTypeSelection(type.slug as task_slug);
              }}
              className={`cursor-pointer rounded-full border-none hover:border hover:border-1 text-xs font-medium leading-4 h-5 p-0 px-[10px] ${typeParams.includes(type.slug as task_slug)
                ? "bg-foreground text-background hover:bg-foreground/50 hover:text-background"
                : "bg-secondary hover:bg-secondary/50 text-foreground"
                }`}
            >
              {type.name}
            </Button>

          ))}
        </div>
        <Separator className="my-4" />
        <div className="mx-3">
          <h1 className="mb-3 text-muted-foreground text-sm">Sort by</h1>

          <RadioGroup className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <RadioGroupItem value="" id="r1" />
              <Label className="text-xs font-light" htmlFor="r1">Priority high to low</Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem value="" id="r1" />
              <Label className="text-xs font-light" htmlFor="r1">Priority low to high</Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem value="" id="r1" />
              <Label className="text-xs font-light" htmlFor="r1">Newest first</Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem value="" id="r1" />
              <Label className="text-xs font-light" htmlFor="r1">Reward</Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem value="" id="r1" />
              <Label className="text-xs font-light" htmlFor="r1">Expiration</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterTypeMenu;
