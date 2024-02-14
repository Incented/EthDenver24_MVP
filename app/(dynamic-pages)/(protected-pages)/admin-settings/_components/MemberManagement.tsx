"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FC } from "react";
import MemberManagementTopCard from "./MemberManagementTopCard";
import {
  CheckCircle,
  Filter,
  PauseCircle,
  Trash,
  Users,
  XCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import Pagination from "@/components/ui/Pagination";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface MemberManagementProps {}

const MemberManagement: FC<MemberManagementProps> = ({}) => {
  const membersData = [
    {
      name: "Mira Herwitz",
      email: "fullName@gmail.com",
      status: "pending",
      image: "/assets/avatar_1.jpg",
    },
    {
      name: "Mira Herwitz",
      email: "fullName@gmail.com",
      status: "active",
      image: "/assets/avatar_2.jpg",
    },
    {
      name: "Mira Herwitz",
      email: "fullName@gmail.com",
      status: "suspended",
      image: "/assets/avatar_3.jpg",
    },
  ];

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-8">
        <div className="">
          <h2 className="font-semibold">Member Management</h2>
          <p className="text-sm">Manage all member of the community.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
      <ScrollArea className="w-full">
        <ul className="flex gap-4">
          {[...Array(4)].map((arr, i) => (
            <MemberManagementTopCard
              value="122"
              text="Total Members"
              Icon={Users}
              key={i}
            />
          ))}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-semibold">All Members</h1>
        <Button>
          <Filter size={16} className="mr-2" />
          Filter
        </Button>
      </div>

      <Table className="border">
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead></TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {membersData.map((data) => {
            let statusClass = "bg-[#DA7906]";
            if (data.status === "active") {
              statusClass = "bg-green-500";
            } else if (data.status === "pending") {
              statusClass = "bg-[#814C0E]";
            }
            return (
              <TableRow key={data.name}>
                <TableCell className="">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={data.image} className="object-cover" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-sm whitespace-nowrap">{data.name}</p>
                  </div>
                </TableCell>
                <TableCell className="text-center ">
                  <div className="">{data.email}</div>
                </TableCell>
                <TableCell>
                  <Badge className={cn("capitalize", statusClass)}>
                    {data.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {data.status === "pending" ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive"
                        >
                          <XCircle size={14} />
                          <p className="ml-2">Reject</p>
                        </Button>

                        <Separator orientation="vertical" className="h-6" />

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-500"
                        >
                          <CheckCircle size={14} />
                          <p className="ml-2">Aprove</p>
                        </Button>
                      </>
                    ) : null}
                    {data.status === "active" ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive"
                        >
                          <Trash size={14} />
                          <p className="ml-2">Remove</p>
                        </Button>

                        <Separator orientation="vertical" className="h-6" />

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-primary"
                        >
                          <PauseCircle size={14} />
                          <p className="ml-2">Suspend</p>
                        </Button>
                      </>
                    ) : null}
                    {data.status === "suspended" ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive"
                        >
                          <Trash size={14} />
                          <p className="ml-2">Remove</p>
                        </Button>

                        <Separator orientation="vertical" className="h-6" />

                        <Button
                          variant="outline"
                          size="sm"
                          className="text-green-500"
                        >
                          <CheckCircle size={14} />
                          <p className="ml-2">Activate</p>
                        </Button>
                      </>
                    ) : null}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination count={12} title="Members" totalPages={10} />
    </Card>
  );
};

export default MemberManagement;
