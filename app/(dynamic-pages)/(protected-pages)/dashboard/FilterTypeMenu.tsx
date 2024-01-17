"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { PopoverContent } from "@radix-ui/react-popover";
import { LayoutGrid } from "lucide-react";
import { FC } from "react";

interface FilterTypeMenuProps {}

const FilterTypeMenu: FC<FilterTypeMenuProps> = ({}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="px-3 w-[168px]">
          Filter
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={10}
        className="w-[338px] max-h-[400px] border bg-white dark:bg-accent z-50 mr-24 rounded-md pb-4"
      >
        <h1 className="p-3">Type</h1>
        <div className="flex flex-wrap gap-2 mx-3 mt-2">
          <Badge className="text-black bg-gray-100 hover:bg-gray-50">
            Software Dev
          </Badge>
          <Badge className="text-black bg-gray-100 hover:bg-gray-50">
            Hardware Dev
          </Badge>
          <Badge className="text-black bg-gray-100 hover:bg-gray-50">
            Legal
          </Badge>
          <Badge className="text-black bg-gray-100 hover:bg-gray-50">
            Legal
          </Badge>
          <Badge className="text-black bg-gray-100 hover:bg-gray-50">
            Legal
          </Badge>
          <Badge className="text-black bg-gray-100 hover:bg-gray-50">
            Legal
          </Badge>
        </div>
        <Separator className="my-4" />
        <div className="mx-3">
          <h1 className="mb-3 text-gray-500">Sort by</h1>

          <RadioGroup className="flex flex-col gap-3">
            <div className="flex items-center gap-1">
              <RadioGroupItem value="" id="r1" />
              <Label htmlFor="r1">Priority high to low</Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem value="" id="r1" />
              <Label htmlFor="r1">Priority high to low</Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem value="" id="r1" />
              <Label htmlFor="r1">Priority high to low</Label>
            </div>
            <div className="flex items-center gap-1">
              <RadioGroupItem value="" id="r1" />
              <Label htmlFor="r1">Priority high to low</Label>
            </div>
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilterTypeMenu;
