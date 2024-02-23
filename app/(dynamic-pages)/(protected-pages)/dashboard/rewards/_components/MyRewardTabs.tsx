"use client";

import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { FC } from "react";
import MyRewardsTable from "./MyRewardsTable";
import MyRewardsTableMobile from "./MyRewardsTableMobile";

interface MyRewardTabsProps { }

const rewards = [
  {
    communityImage: "/assets/avatar_1.jpg",
    communityName: "Buan Fund",
    date: "10/10/2023",
    awardSource: "Contribution",
    totalCarrots: "10",
    rewardType: "Construction",
    task: "Clean up trash at the entrance"
  },
  {
    communityImage: "/assets/avatar_2.jpg",
    communityName: "Community",
    date: "10/10/2023",
    awardSource: "Contribution",
    totalCarrots: "500",
    rewardType: "Construction",
    task: "Clean up trash at the entrance"
  },

]

const MyRewardTabs: FC<MyRewardTabsProps> = ({ }) => {
  return (
    <div className="relative pb-24 overflow-hidden">
      <Tabs defaultValue="past">
        <TabsList className="justify-start">
          <TabsTrigger value="past">Past Rewards</TabsTrigger>
          <TabsTrigger value="potential">Potential rewards</TabsTrigger>
        </TabsList>
        <TabsContent
          value="past"
          className="w-full mt-4 mb-6 overflow-auto rounded-lg sm:border"
        >

          <MyRewardsTable />
          <MyRewardsTableMobile rewards={rewards} />
        </TabsContent>
        <TabsContent value="potential">priortized</TabsContent>
      </Tabs>

      <Popover>
        <PopoverTrigger className="absolute top-0 right-0 px-4 py-2 text-sm font-medium border rounded-md">
          Filter
        </PopoverTrigger>
        <PopoverContent
          sideOffset={10}
          align="end"
          className="w-[300px] px-4 flex flex-col justify-start gap-6 "
        >
          <h1 className="px-3">Type</h1>
          <div className="flex flex-wrap gap-2 mx-2">
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
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MyRewardTabs;
