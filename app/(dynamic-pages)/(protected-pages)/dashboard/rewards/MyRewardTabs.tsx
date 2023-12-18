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

interface MyRewardTabsProps {}

const MyRewardTabs: FC<MyRewardTabsProps> = ({}) => {
  return (
    <div className="relative">
      <Tabs defaultValue="past">
        <TabsList className="justify-start">
          <TabsTrigger value="past">Past Rewards</TabsTrigger>
          <TabsTrigger value="potential">Potential rewards</TabsTrigger>
        </TabsList>
        <TabsContent value="past" className="w-full">
          <Table className="w-full mt-2 mb-6 border rounded-md">
            <TableHeader className="border">
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
              {Array.from({ length: 7 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium whitespace-nowrap">
                    Buy a trash container
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Avatar>
                        <AvatarImage
                          className="w-10 h-10 rounded-full"
                          src="/assets/avatar_1.jpg"
                        />
                      </Avatar>
                      <p className="whitespace-nowrap">Buan Fund</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">Constructive</Badge>
                  </TableCell>
                  <TableCell className="text-center">Contribution</TableCell>
                  <TableCell className="">22/11/2023</TableCell>
                  <TableCell className="text-end">
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
        <PopoverTrigger className="absolute top-0 right-0 px-4 py-2 border rounded-md">
          Filter
        </PopoverTrigger>
        <PopoverContent
          sideOffset={10}
          align="start"
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
