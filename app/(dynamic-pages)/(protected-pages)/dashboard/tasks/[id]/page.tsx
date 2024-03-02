import GoBack from "@/components/ui/GoBack";
import { getOrganizationById, getTeamMembersInOrganization } from "@/data/user/organizations";
import { checkIfUserClaimedTask, checkIfUserPrioritizedTask, getPrioritizationDetails, getTaskById, getTaskClaimerDetails, getTaskContributions, getValidationDetails, getValidationsForTask } from "@/data/user/tasks";
import { getUserProfile } from "@/data/user/user";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { z } from "zod";
import DraftTaskDetail from "./_components/DraftTaskDetail";
import TaskDetail from "./_components/TaskDetail";

const paramsSchema = z.object({
  id: z.string(),
})

export default async function TaskDetailsPage({ params }: { params: unknown }) {
  const { id } = paramsSchema.parse(params);
  console.log("task id", id);

  const [task, user, communityDetails, teamMembersInOrganization] = await Promise.all([
    getTaskById(id),
    serverGetLoggedInUser(),
    getOrganizationById((await getTaskById(id)).organization_id),
    getTeamMembersInOrganization((await getTaskById(id)).organization_id)

  ]);

  const [taskCreator, isPrioritizedByLoggedInUser, isClaimedByUser, taskPrioritizationDetails, taskValidationDetails, claimerDetails, contributions, validationsForTask] = await Promise.all([
    getUserProfile(task.user_id!),
    checkIfUserPrioritizedTask(task.id),
    checkIfUserClaimedTask(task.id),
    getPrioritizationDetails(task.id),
    getValidationDetails(task.id),
    getTaskClaimerDetails(task.id),
    getTaskContributions(task.id),
    getValidationsForTask(task.id)
  ]);

  const isUserMemberOfCommunity = teamMembersInOrganization.some(
    (member) => member.member_id === user.id
  );

  const isTaskPublished = task.is_task_published;

  return (
    <main className="md:mx-4 md:pt-0 md:px-8 md:pb-8  px-6 pb-8 mt-4">
      <GoBack />
      {/* TODO: draft task component. NOTE: This is a placeholder for actual condition. After figuring out rendering logic, modify accordingly */}
      {!isTaskPublished ? (
        <DraftTaskDetail id={id} task={task} />
      ) : (
        <TaskDetail
          id={id}
          task={task}
          user_id={user.id}
          community={communityDetails}
          isUserMemberOfCommunity={isUserMemberOfCommunity}
          taskPrioritizationDetails={taskPrioritizationDetails}
          taskValidationDetails={taskValidationDetails}
          contributions={contributions}
          isPrioritizedByLoggedInUser={isPrioritizedByLoggedInUser}
          isClaimedByUser={isClaimedByUser}
          claimerDetails={claimerDetails}
          taskCreator={taskCreator}
          validationsForTask={validationsForTask} />
      )}
    </main>
  );
}
