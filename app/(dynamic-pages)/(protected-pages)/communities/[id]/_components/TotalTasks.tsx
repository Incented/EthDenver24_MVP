"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { FC } from "react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/Progress";

interface TotalTasksProps {}

const TotalTasks: FC<TotalTasksProps> = ({}) => {
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h4>Total Task : </h4> <span>20</span>
        </div>
        <Select>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="last 24h" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="24">last 24h</SelectItem>
              <SelectItem value="12">last 12h</SelectItem>
              <SelectItem value="6">last 6h</SelectItem>
              <SelectItem value="3">last 3h</SelectItem>
              <SelectItem value="1">last 1h</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Separator className="my-4" />

      <div className="grid gap-4">
        <TaskProgress status="Prioritized" value="4" />
        <TaskProgress status="Claimed" value="1" />
        <TaskProgress status="In Progress" value="5" />
        <TaskProgress status="In Review" value="2" />
        <TaskProgress status="Complete" value="4" />
        <TaskProgress status="Expired" value="3" />
      </div>
    </Card>
  );
};

export default TotalTasks;

function TaskProgress({ value, status }: { value: string; status: string }) {
  return (
    <div className="">
      <p className="ml-1">{value}</p>
      <div className="flex items-center justify-between">
        <Progress value={Number(value) * 5} className="w-1/2" />
        <h4 className="text-muted-foreground">
          {Number(value) * 5}% {status}
        </h4>
      </div>
    </div>
  );
}
