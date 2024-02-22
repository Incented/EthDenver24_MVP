import { Enum } from "@/types";
import AddContribution from "./AddContribution";
import ClaimDialog from "./ClaimDialog";
import { FreezeTaskPopOver } from "./FreezeTaskPopOver";
import { PrioritizeDialog } from "./PrioritizeDialog";

export function StatusBasedActions({ task_status, task_id, isClaimer, isTaskCreator, claim_stake_amount, isPrioritizedByUser, isWithinPrioritizedPeriod, isUserMemberOfCommunity }: { isClaimer: boolean, task_status: Enum<"task_status"> | null, isTaskCreator: boolean, isPrioritizedByUser: boolean, isWithinPrioritizedPeriod: boolean, isUserMemberOfCommunity: boolean, task_id: string, claim_stake_amount: number | null }) {
    const isNewTask = task_status === "new_task";
    const isPrioritized = task_status === "prioritized";
    const isClaimed = task_status === "claimed";
    const isInProgress = task_status === "in_progress";
    return (<div className="flex gap-4">
        {isNewTask && (
            <div className="flex w-full gap-2 mb-4 md:col-start-3 xl:col-start-4 ">
                <PrioritizeDialog isTaskCreator={isTaskCreator} task_id={task_id} isPrioritizedByUser={isPrioritizedByUser} isWithinPrioritizedPeriod={isWithinPrioritizedPeriod} isUserMemberOfCommunity={isUserMemberOfCommunity} />
            </div>
        )}

        {isPrioritized && (
            <div className="flex w-full gap-2 mb-4 md:col-start-3 xl:col-start-4 ">
                <ClaimDialog claimStakeAmount={claim_stake_amount}
                    task_id={task_id}
                />
                <AddContribution task_id={task_id} />
            </div>)}

        {isClaimed && (
            <div className="flex w-full gap-2 mb-4 md:col-start-3 xl:col-start-4 ">
                <AddContribution task_id={task_id} isClaimed={true} isClaimer={isClaimer} />
            </div>
        )}

        {isInProgress && (
            <div className="flex w-full gap-2 mb-4 md:col-start-3 xl:col-start-4 ">
                <AddContribution task_id={task_id} />
            </div>
        )}

        <FreezeTaskPopOver task_id={task_id} /></div>)
}