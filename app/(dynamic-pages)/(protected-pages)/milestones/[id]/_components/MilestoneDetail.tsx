import { Card } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Plus
} from "lucide-react";
import { FC, Suspense } from "react";

import { updateMilestoneStatusAction } from "@/data/user/milestones";
import { Table } from "@/types";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { DemoAutomations } from "../automations";
import MilestoneContributionTable from "./MilestoneContributionTable";
import { MilestonePrioritizerCards } from "./MilestonePrioritizerCards";
import { MilestoneStatusBasedActions } from "./MilestoneStatusBasedActions";
import MilestoneSubDetail from "./MilestoneSubDetail";
import { MilestoneValidationCards } from "./MilestoneValidationCards";


interface MilestoneDetailProps {
  id: string;
  user_id: string;
  milestone: Table<"grant_project_milestones_2">;
  grantProjectDetails: Table<"grant_applications">;
  isUserMemberOfGrantProject: boolean;
  milestoneCreator: {
    avatar_url: string | null;
    created_at: string;
    first_name: string | null;
    full_name: string | null;
    id: string;
    last_name: string | null;
  } | null;
  isMilestonePrioritizedByLoggedInUser: boolean;
  milestonePrioritizationDetails: {
    full_name: string | null;
    avatar_url: string | null;
    count: number;
    created_at: string;
    user_id: string;
  }[];
  milestoneValidationDetails: {
    full_name: string | null;
    avatar_url: string | null;
    count: number;
    created_at: string;
    user_id: string;
  }[];
  isMilestoneClaimedByUser: boolean;
  milestoneClaimerDetails: {
    id: string;
    avatar_url: string | null;
    full_name: string | null;
  } | null;
  milestoneContributions: Table<"grant_project_milestones_contributions">[];
  milestoneValidations: Table<"grant_project_milestone_validations">[] | null;
}
const MilestoneDetail: FC<MilestoneDetailProps> = async ({ milestone, user_id, isUserMemberOfGrantProject, grantProjectDetails, milestoneContributions, milestoneValidationDetails,
  milestoneCreator, isMilestonePrioritizedByLoggedInUser, milestoneClaimerDetails, isMilestoneClaimedByUser, milestonePrioritizationDetails, milestoneValidations
}) => {
  let taskStatusBg = "bg-muted text-foreground";

  const prioritizationPeriod = grantProjectDetails.prioritization_period || 0;
  const prioritizationQourum = grantProjectDetails.prioritization_quorum_percentage || 0;

  const validationQuorum = grantProjectDetails.validation_qourum_percentage || 0;

  // Can be used to check if the task is within the prioritization period
  const isWithinPrioritizedPeriod = Date.now() < new Date(milestone.new_grant_project_milestone_created_at).getTime() + prioritizationPeriod * 24 * 60 * 60 * 1000;

  let lowerPriority = 0;
  let higherPriority = 0;

  milestonePrioritizationDetails.forEach(detail => {
    if (detail.count < 0) {
      lowerPriority += Math.abs(detail.count);
    } else {
      higherPriority += detail.count;
    }
  });

  let approvedValidations = 0;
  let rejectedValidations = 0;

  milestoneValidationDetails.forEach(detail => {
    if (detail.count < 0) {
      rejectedValidations += 1;
    } else {
      approvedValidations += 1;
    }
  });

  const currentPrioritizationQuorum = (higherPriority / (lowerPriority + higherPriority)) * 100;
  const currentValidationQuorum = (approvedValidations / (approvedValidations + rejectedValidations)) * 100;

  if (milestone.grant_project_milestone_status === "new_task" && currentPrioritizationQuorum >= prioritizationQourum) {
    await updateMilestoneStatusAction({ status: "prioritized", task_id: milestone.id });
  }

  if (milestone.grant_project_milestone_status === "prioritized" && isMilestoneClaimedByUser) {
    await updateMilestoneStatusAction({ status: "claimed", task_id: milestone.id });
  }

  const isClaimed = milestone.grant_project_milestone_status === "claimed";

  if (isClaimed && milestoneContributions.length !== 0) {
    await updateMilestoneStatusAction({ status: "in_review", task_id: milestone.id });
  }

  if (!isClaimed && milestone.grant_project_milestone_status === "prioritized" && milestoneContributions.length !== 0) {
    await updateMilestoneStatusAction({ status: "in_progress", task_id: milestone.id });
  }

  if (!isClaimed && milestone.grant_project_milestone_status === "in_progress" && milestoneValidations?.length !== 0) {
    await updateMilestoneStatusAction({ status: "in_review", task_id: milestone.id });
  }

  if (!isClaimed && milestone.grant_project_milestone_status === "in_review" && currentValidationQuorum >= validationQuorum) {
    await updateMilestoneStatusAction({ status: "completed", task_id: milestone.id });
  }

  const isMilestoneCreator = user_id === milestone.user_id;

  if (milestone.grant_project_milestone_status === "in_progress") {
    taskStatusBg = "bg-blue-500 text-foreground";
  } else if (milestone.grant_project_milestone_status === "new_task") {
    taskStatusBg = "bg-zinc-300 dark:bg-zinc-700 text-foreground";
  } else if (milestone.grant_project_milestone_status === "prioritized") {
    taskStatusBg = "bg-primary text-primary-foreground"
  } else if (milestone.grant_project_milestone_status === "claimed") {
    taskStatusBg = "bg-[#A132CD] text-primary-foreground"
  } else if (milestone.grant_project_milestone_status === "freezed") {
    taskStatusBg = "bg-zinc-400 dark:bg-zinc-600 text-primary-foreground"
  } else if (milestone.grant_project_milestone_status === "in_review") {
    taskStatusBg = "bg-[#DA1DBC] text-primary-foreground"
  } else if (milestone.grant_project_milestone_status === "completed") {
    taskStatusBg = "bg-[#00AD00] text-primary-foreground"
  }

  else {
    taskStatusBg = "bg-muted text-foreground";
  }

  revalidatePath(`/dashboard/tasks/${milestone.id}`);

  return (
    <>
      <div className="w-full gap-4 mt-4 md:grid md:grid-cols-3 xl:grid-cols-4">
        <div className="md:col-span-2 xl:col-span-3">
          <Card className="relative mb-4 bg-accent/50 overflow-hidden border-none">
            <div
              className={cn(
                " px-6 py-1 text-sm w-fit text-white rounded-br-md ",
                taskStatusBg
              )}
            >
              {milestone.grant_project_milestone_status?.split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")
                .replace("_", " ")}
            </div>
            <MilestoneSubDetail milestone={milestone} />
          </Card>

          <div className="mb-4 p-8 bg-muted rounded-lg">
            <Suspense fallback={<div>Loading contributions...</div>}>
              <MilestoneContributionTable
                grant_project_milestone_status={milestone.grant_project_milestone_status || "new_task"}
                contributions={milestoneContributions}
                loggedInUser={user_id}
              />
            </Suspense>
          </div>

          <Card className="p-8 mb-4 overflow-hidden border-none bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-lg font-bold ">Discussion</h1>
              <Button variant="ghost" className="text-primary">
                <Plus size={16} />
                Add New Topic
              </Button>
            </div>
            <div className="flex gap-3">
              <Avatar>
                <AvatarImage src="/assets/avatar_1.jpg" />
              </Avatar>

              <Textarea placeholder="Type a new topic here." />
            </div>
          </Card>
        </div>

        <div className="w-full">
          <Suspense fallback={<div>Loading actions...</div>}>
            <MilestoneStatusBasedActions
              claim_stake_amount={grantProjectDetails.claim_stake_amount_percentage}
              isMilestoneCreator={isMilestoneCreator}
              isMilestonePrioritizedByLoggedInUser={isMilestonePrioritizedByLoggedInUser}
              isUserMemberOfGrantProject={isUserMemberOfGrantProject}
              isWithinPrioritizedPeriod={isWithinPrioritizedPeriod}
              milestone_id={milestone.id}
              isClaimer={milestoneClaimerDetails?.id === user_id}
              milestone_status={milestone.grant_project_milestone_status}
            />
          </Suspense>

          <Card className="p-4 mb-4 flex flex-col gap-4">
            <h1 className="text-sm leading-[14px] font-medium">Proposer</h1>
            <div className="flex items-center gap-[10px]">
              <Avatar>
                <AvatarImage src={milestoneCreator?.avatar_url || ""} />
                <AvatarFallback>{milestoneCreator?.full_name?.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <p className="text-sm text-foreground">{milestoneCreator?.full_name}</p>
            </div>
          </Card>
          {isClaimed && (
            <Card className="p-4 mb-4 flex flex-col gap-4">
              <h1 className="text-sm leading-[14px] font-medium">Claimed by</h1>
              <div className="flex items-center gap-[10px]">
                <Avatar>
                  <AvatarImage src={milestoneClaimerDetails?.avatar_url || ""} />
                  <AvatarFallback>{milestoneClaimerDetails?.full_name?.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-foreground">{milestoneClaimerDetails?.full_name}</p>
              </div>
            </Card>
          )}
          <Card className="p-4 mb-4">
            <h1 className="mb-2 text-sm leading-[14px] font-medium">Priority</h1>
            <div className="flex items-center gap-4 mb-2 border-b pb-2">
              <div className="flex items-center space-x-2">
                <p className="text-sm text-muted-foreground">Lower</p>
                <div className="relative size-5"><Image src='/images/arb.svg' alt="ARB" fill /></div>
                <p className="text-sm font-semibold text-foreground">{lowerPriority}</p>
              </div>
              <div className="w-[2px] h-5 bg-gray-300" />
              <div className="flex items-center space-x-2">
                <p className="text-sm font-semibold text-foreground">{higherPriority}</p>
                <div className="relative size-5"><Image src='/images/arb.svg' alt="ARB" fill /></div>
                <p className="text-sm text-muted-foreground">Higher</p>
              </div>
            </div>
            <Suspense>
              <MilestonePrioritizerCards prioritizations={milestonePrioritizationDetails} />
            </Suspense>
          </Card>
          {milestone.grant_project_milestone_status === "in_review" || "completed" && (
            <Card className="p-4 mb-4">
              <h1 className="mb-2 text-sm leading-[14px] font-medium">Validations</h1>
              <div className="flex items-center gap-4 mb-2 border-b pb-2">
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <div className="relative size-5"><Image src='/images/arb.svg' alt="ARB" fill /></div>
                  <p className="text-sm font-semibold text-foreground">{rejectedValidations}</p>
                </div>
                <div className="w-[2px] h-5 bg-gray-300" />
                <div className="flex items-center space-x-2">
                  <p className="text-sm font-semibold text-foreground">{approvedValidations}</p>
                  <div className="relative size-5"><Image src='/images/arb.svg' alt="ARB" fill /></div>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </div>
              <Suspense>
                <MilestoneValidationCards validations={milestoneValidationDetails} />
              </Suspense>
            </Card>
          )}
        </div>
      </div >
      <DemoAutomations taskId={milestone.id} />
    </>
  );
};

export default MilestoneDetail;
