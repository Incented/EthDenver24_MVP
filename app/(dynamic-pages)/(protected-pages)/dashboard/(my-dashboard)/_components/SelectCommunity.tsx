"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronDown } from "lucide-react";
import { FC } from "react";

interface SelectCommunityProps {}

const SelectCommunity: FC<SelectCommunityProps> = ({}) => {
  return (
    <div className="flex items-center gap-2 px-4 rounded-md bg-slate-100 dark:bg-accent min-w-fit max-h-fit h-fit">
      <Avatar>
        <AvatarImage
          className="w-8 h-8 rounded-full"
          src="/assets/avatar_1.jdpg"
        />
        <AvatarFallback>BF</AvatarFallback>
      </Avatar>
      <p className="">Buan Fund</p>

      <Popover>
        <PopoverTrigger>
          <ChevronDown size={18} className="ml-auto" />
        </PopoverTrigger>
        <PopoverContent
          sideOffset={30}
          align="start"
          className="w-[240px] px-4 flex flex-col justify-start gap-6 "
        >
          <RadioGroup defaultValue="all">
            <div className="flex items-center gap-2 mb-2">
              <RadioGroupItem value="all" id="r1" />
              <Label htmlFor="r1">All Community</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="buanFund" id="r2" />
              <Avatar>
                <AvatarImage
                  className="w-8 h-8 rounded-full"
                  src="/assets/avatar_1.jpg"
                />
              </Avatar>
              <Label htmlFor="r2">Buan Fund</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="" id="r3" />
              <Avatar>
                <AvatarImage
                  className="w-8 h-8 rounded-full"
                  src="/assets/avatar_1.jpg"
                />
              </Avatar>
              <Label htmlFor="r3">Nature Lovers</Label>
            </div>
          </RadioGroup>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SelectCommunity;
