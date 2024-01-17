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
    <div className="flex w-[176px] items-center px-2 py-1 rounded-md overflow-hidden bg-secondary dark:bg-accent min-w-fit max-h-fit h-10">
      <Popover>
        <PopoverTrigger className="flex items-center justify-between w-full">
          <div className="flex justify-start items-center ">
            <Avatar className="w-8 h-8 flex justify-start items-center">
              <AvatarImage
                className="w-6 h-6 rounded-full"
                src="/assets/avatar_1.jdpg"
              />
              <AvatarFallback className="bg-zinc-200 flex items-center justify-center w-6 h-6 text-sm">
                BF
              </AvatarFallback>
            </Avatar>
            <p className="text-sm text-muted-foreground">Buan Fund</p>
          </div>
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
