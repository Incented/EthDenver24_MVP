"use client";
import { Card } from "@/components/ui/card";
import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TaskCard from "@/components/presentational/Tasks/TaskCard";
import Pagination from "@/components/ui/Pagination";

interface CommunityDetailsTabProps {}

const CommunityDetailsTab: FC<CommunityDetailsTabProps> = ({}) => {
  return (
    <div className="">
      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Task</TabsTrigger>
          <TabsTrigger value="prioritized">Prioritized</TabsTrigger>
          <TabsTrigger value="claimed">Claimed</TabsTrigger>
          <TabsTrigger value="inProgress">In Progress</TabsTrigger>
          <TabsTrigger value="inReview">In Review</TabsTrigger>
          <TabsTrigger value="complete">Complete</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
          </div>
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
      <Pagination currentPage={1} title="Task" totalPages={10} />
    </div>
  );
};

export default CommunityDetailsTab;
