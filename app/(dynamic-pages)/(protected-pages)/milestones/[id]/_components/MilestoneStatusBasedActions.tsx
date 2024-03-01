import { Enum } from "@/types";
import AddMilestoneContribution from "./AddMilestoneContribution";
import { FreezeMilestonePopOver } from "./FreezeMilestonePopOver";
import MilestoneClaimDialog from "./MilestoneClaimDialog";
import { MilestonePrioritizeDialog } from "./MilestonePrioritizeDialog";

export function MilestoneStatusBasedActions({ milestone_status, milestone_id, isClaimer, isMilestoneCreator, claim_stake_amount, isMilestonePrioritizedByLoggedInUser, isWithinPrioritizedPeriod, isUserMemberOfGrantProject }: { isClaimer: boolean, milestone_status: Enum<"task_status"> | null, isMilestoneCreator: boolean, isMilestonePrioritizedByLoggedInUser: boolean, isWithinPrioritizedPeriod: boolean, isUserMemberOfGrantProject: boolean, milestone_id: string, claim_stake_amount: number | null }) {
    const isNewTask = milestone_status === "new_task";
    const isPrioritized = milestone_status === "prioritized";
    const isClaimed = milestone_status === "claimed";
    const isInProgress = milestone_status === "in_progress";
    return (<div className="flex gap-4">
        {isNewTask && (
            <div className="flex w-full gap-2 mb-4 md:col-start-3 xl:col-start-4 ">
                <MilestonePrioritizeDialog isMilestoneCreator={isMilestoneCreator} milestone_id={milestone_id} isMilestonePrioritizedByLoggedInUser={isMilestonePrioritizedByLoggedInUser} isWithinPrioritizedPeriod={isWithinPrioritizedPeriod} isUserMemberOfGrantProject={isUserMemberOfGrantProject} />
            </div>
        )}

        {isPrioritized && (
            <div className="flex w-full gap-2 mb-4 md:col-start-3 xl:col-start-4 ">
                <MilestoneClaimDialog claimStakeAmount={claim_stake_amount}
                    milestone_id={milestone_id}
                />
                <AddMilestoneContribution milestone_id={milestone_id} />
            </div>)}

        {isClaimed && (
            <div className="flex w-full gap-2 mb-4 md:col-start-3 xl:col-start-4 ">
                <AddMilestoneContribution milestone_id={milestone_id} isClaimed={true} isClaimer={isClaimer} />
            </div>
        )}

        {isInProgress && (
            <div className="flex w-full gap-2 mb-4 md:col-start-3 xl:col-start-4 ">
                <AddMilestoneContribution milestone_id={milestone_id} />
            </div>
        )}

        <FreezeMilestonePopOver milestone_id={milestone_id} /></div>)
}