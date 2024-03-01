"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardVerticalLayoutContext } from "@/contexts/CardVerticalLayoutContext";
import { cn, parseJsonToStringArray } from "@/lib/utils";
import { Table } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import GrantProjectMilestoneCard from "./GrantProjectMilestoneCard";

type GrantProjectTasksTabProps = {
  milestones: Table<"grant_project_milestones_2">[];
  userId?: string;
  isGrant?: boolean;
  grantProject: Table<"grant_applications">;
};

const grantProjectStatuses = [
  "draft",
  "new_application",
  "prioritized",
  "project",
  "completed",
  "failed",
  "expired",
  "protocol_update"
];



let featuredImageUrl = "/images/task1.jpeg";

const GrantProjectTasksTab = ({ userId, milestones, isGrant, grantProject }: GrantProjectTasksTabProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const communityFilterParams = searchParams?.getAll('community') ?? []
  const { isVertical } = useContext(CardVerticalLayoutContext);
  return (
    <Tabs defaultValue="all tasks" >
      <ScrollArea className="whitespace-nowrap">
        <TabsList className="w-full lg:w-fit">
          <TabsTrigger value="all tasks" className="capitalize">
            All Tasks
          </TabsTrigger>
          <TabsTrigger value="my proposals" className="capitalize">
            My Proposals
          </TabsTrigger>
          {grantProjectStatuses.map((status) => (
            <TabsTrigger key={status} value={status} className="capitalize">
              {status
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
                .replace("_", " ")}
            </TabsTrigger>
          ))}
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="all tasks">
        <div
          className={cn(
            "grid gap-4 mt-4 sm:grid-cols-2 ",
            isVertical
              ? "sm:grid-cols-1 md:grid-cols-1"
              : "sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3"
          )}
        >
          {milestones.map((milestone, i) => (
            <GrantProjectMilestoneCard
              key={i}
              milestoneId={milestone.id}
              grantProjectId={milestone.grant_project_id}
              grantProgramId={grantProject.organization_id}
              imageUrl={featuredImageUrl}
              milestoneTitle={milestone.name}
              milestoneDescription={milestone.description}
              rewards={
                milestone.grant_project_milestone_amount
                  ? `${milestone.grant_project_milestone_amount} ARB`
                  : "0 ARB"
              }
              efforts={
                milestone.efforts ? `${milestone.efforts} days` : "0 days"
              }
              milestoneProjectName={grantProject.name || "Community Name"}
              taskType={parseJsonToStringArray(grantProject.grant_project_types)}
              taskStatus={"new_task"}
              isVertical={false}
              isPublished={grantProject.is_grant_published}
              isGrant={true}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="my proposals">
        <div
          className={cn(
            "grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3",
            isVertical
              ? "sm:grid-cols-1 md:grid-cols-1"
              : "sm:grid-cols-2 md:grid-cols-3"
          )}
        >
          {milestones.map((milestone, i) => (
            <GrantProjectMilestoneCard
              key={i}
              milestoneId={milestone.id}
              grantProjectId={milestone.grant_project_id}
              grantProgramId={grantProject.organization_id}
              imageUrl={featuredImageUrl}
              milestoneTitle={milestone.name}
              milestoneDescription={milestone.description}
              rewards={
                milestone.grant_project_milestone_amount
                  ? `${milestone.grant_project_milestone_amount} ARB`
                  : "0 ARB"
              }
              efforts={
                milestone.efforts ? `${milestone.efforts} days` : "0 days"
              }
              milestoneProjectName={grantProject.name || "Community Name"}
              taskType={parseJsonToStringArray(grantProject.grant_project_types)}
              taskStatus={"new_task"}
              isVertical={isVertical}
              isPublished={grantProject.is_grant_published}
              isGrant={true}
            />
          ))}
        </div>
      </TabsContent>

      {grantProjectStatuses.map((status) => (
        <TabsContent key={status} value={status}>
          <div
            className={cn(
              "grid gap-4 mt-4 sm:grid-cols-2 md:grid-cols-3",
              isVertical
                ? "sm:grid-cols-1 md:grid-cols-1"
                : "sm:grid-cols-2 md:grid-cols-3"
            )}
          >
            {milestones.map((milestone, i) => (
              <GrantProjectMilestoneCard
                key={i}
                milestoneId={milestone.id}
                grantProjectId={milestone.grant_project_id}
                grantProgramId={grantProject.organization_id}
                imageUrl={featuredImageUrl}
                milestoneTitle={milestone.name}
                milestoneDescription={milestone.description}
                rewards={
                  milestone.grant_project_milestone_amount
                    ? `${milestone.grant_project_milestone_amount} ARB`
                    : "0 ARB"
                }
                efforts={
                  milestone.efforts ? `${milestone.efforts} days` : "0 days"
                }
                milestoneProjectName={grantProject.name || "Community Name"}
                taskType={parseJsonToStringArray(grantProject.grant_project_types)}
                taskStatus={"new_task"}
                isVertical={false}
                isPublished={grantProject.is_grant_published}
                isGrant={true}
              />
            ))}
          </div>
        </TabsContent>
      ))}

    </Tabs>
  );
};

export default GrantProjectTasksTab;
