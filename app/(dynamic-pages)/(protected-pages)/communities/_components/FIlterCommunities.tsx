"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectLabel } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { PopoverContent } from "@radix-ui/react-popover";
import { SelectGroup } from "@radix-ui/react-select";
import { Filter, LayoutGrid } from "lucide-react";
import { FC } from "react";

type FilterTypeMenuProps = {};

export function FilterOrganizations({}: FilterTypeMenuProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        className="w-[338px] max-h-[400px] border bg-background dark:bg-muted z-50 mr-24 rounded-md p-1"
      >
        <SelectGroup>
          <SelectLabel className="font-normal text-muted-foreground pl-2 pt-2">
            Filter by
          </SelectLabel>
        </SelectGroup>
        <div className="flex w-full gap-2 px-2">
          <RadioGroup
            defaultValue="option-one"
            className="flex w-full flex-col gap-0"
          >
            <div className="flex items-center gap-2 py-1.5 w-full">
              <RadioGroupItem value="option-one" id="option-one" />
              <Label htmlFor="r1" className="font-normal">
                All Communities
              </Label>
            </div>
            <div className="flex items-center gap-2 py-1.5 w-full">
              <RadioGroupItem value="option-two" id="option-two" />
              <Label htmlFor="r1" className="font-normal">
                My Communities
              </Label>
            </div>
            <div className="flex items-center gap-2 py-1.5 w-full">
              <RadioGroupItem value="option-three" id="option-three" />
              <Label htmlFor="r1" className="font-normal">
                Bookmark
              </Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
