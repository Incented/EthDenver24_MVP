"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PopoverContent,
  PopoverTrigger,
  Popover,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FC } from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ChevronsUpDown } from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import { cn } from "@/lib/utils";

interface MyRewardTabsProps {}

const MyRewardTabs: FC<MyRewardTabsProps> = ({}) => {
  return (
    <div className="relative overflow-hidden pb-24">
      <Tabs defaultValue="past">
        <TabsList className="justify-start">
          <TabsTrigger value="past">Past Rewards</TabsTrigger>
          <TabsTrigger value="potential">Potential rewards</TabsTrigger>
        </TabsList>
        <TabsContent
          value="past"
          className="w-full border rounded-lg mt-4 mb-6  overflow-auto"
        >
          <Table className="w-full border-0 ">
            <TableHeader className="border-none">
              <TableRow>
                <TableHead className="">Task</TableHead>
                <TableHead>Community</TableHead>
                <TableHead className="text-center">Type</TableHead>
                <TableHead className="text-center whitespace-nowrap">
                  Award Source
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center gap-1">
                    <p>Date</p>
                    <ChevronsUpDown size={15} />
                  </div>
                </TableHead>
                <TableHead className=" whitespace-nowrap text-end">
                  <div className="flex items-center justify-end gap-1">
                    <p>Total Carrots</p>
                    <ChevronsUpDown size={15} />
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 16 }).map((_, i) => (
                <TableRow
                  key={i}
                  className={cn("py-0", i % 2 === 0 ? "bg-secondary" : "")}
                >
                  <TableCell className="py-1.5 font-medium whitespace-nowrap">
                    Buy a trash container
                  </TableCell>
                  <TableCell className="py-1.5">
                    <div className=" py-1.5 flex items-center gap-1">
                      <Avatar>
                        <AvatarImage
                          className="w-10 h-10 rounded-full"
                          src="/assets/avatar_1.jpg"
                        />
                      </Avatar>
                      <p className="whitespace-nowrap">Buan Fund</p>
                    </div>
                  </TableCell>
                  <TableCell className="py-1.5 text-center">
                    <Badge variant="outline">Constructive</Badge>
                  </TableCell>
                  <TableCell className="py-1.5 text-center">
                    Contribution
                  </TableCell>
                  <TableCell className="py-1.5">22/11/2023</TableCell>
                  <TableCell className="py-1.5 text-end">
                    <p className="pr-10">500</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="potential">priortized</TabsContent>
      </Tabs>

      <Popover>
        <PopoverTrigger className="absolute top-0 right-0 px-4 text-sm font-medium py-2 border rounded-md">
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
