"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { PopoverContent } from "@radix-ui/react-popover";
import { FC, useState } from "react";

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

  const toggleTypeSelection = (typeName: task_slug): void => {
    setSelectedTypes((currentSelected) => {
      const isSelected = currentSelected.includes(typeName);
      if (isSelected) {
        return currentSelected.filter((type) => type !== typeName);
      } else {
        return [...currentSelected, typeName];
      }
    });
  };




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
              className={`cursor-pointer rounded-full border-none hover:border hover:border-1 text-xs font-medium leading-4 h-5 p-0 px-[10px] ${selectedTypes.includes(type.slug as task_slug)
                ? "bg-foreground text-background hover:bg-foreground/50 hover:text-background"
                : "bg-secondary hover:bg-secondary/50 text-foreground"
                }`}
            >
              {type.name}
            </Button>

          ))}
          {/* // <Badge className="text-black bg-gray-100 hover:bg-gray-50">
          //   Software Dev
          // </Badge>
          // <Badge className="text-black bg-gray-100 hover:bg-gray-50">
          //   Hardware Dev
          // </Badge>
          // <Badge className="text-black bg-gray-100 hover:bg-gray-50">
          //   Legal
          // </Badge>
          // <Badge className="text-black bg-gray-100 hover:bg-gray-50">
          //   Legal
          // </Badge>
          // <Badge className="text-black bg-gray-100 hover:bg-gray-50">
          //   Legal
          // </Badge>
          // <Badge className="text-black bg-gray-100 hover:bg-gray-50">
          //   Legal
          // </Badge> */}
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
