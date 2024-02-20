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

interface TotalRewardsProps {}

const TotalRewards: FC<TotalRewardsProps> = ({}) => {
  return (
    <Card className="p-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h4>Total Rewards : </h4> <span>2,000 Carrots</span>
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
        <RewardProgress status=" Proposition Rewards" value="600" />
        <RewardProgress status="Prioritization Rewards" value="600" />
        <RewardProgress status="Contribution Rewards" value="200" />
        <RewardProgress status="Validation Rewards" value="400" />
      </div>
    </Card>
  );
};

export default TotalRewards;

function RewardProgress({ value, status }: { value: string; status: string }) {
  return (
    <div className="">
      <p className="ml-1">{value} Carrots</p>
      <div className="flex items-center justify-between">
        <Progress value={Number(value) / 10} className="w-1/2" />
        <h4 className="text-muted-foreground">
          {Number(value) / 10}% {status}
        </h4>
      </div>
    </div>
  );
}
