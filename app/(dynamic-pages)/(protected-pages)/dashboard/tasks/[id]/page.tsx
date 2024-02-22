import GoBack from "@/components/ui/GoBack";
import { getOrganizationById, getTeamMembersInOrganization } from "@/data/user/organizations";
import { checkIfUserClaimedTask, checkIfUserPrioritizedTask, getPrioritizationDetails, getTaskById, getTaskClaimerDetails, getTaskContributions } from "@/data/user/tasks";
import { getUserProfile } from "@/data/user/user";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import DraftTaskDetail from "./_components/DraftTaskDetail";
import TaskDetail from "./_components/TaskDetail";

export default async function TaskDetailsPage({ params }: { params: unknown }) {
  const parsedParams = params as { id: string };
  const { id } = parsedParams;
  const [task, user, communityDetails, teamMembersInOrganization] = await Promise.all([
    getTaskById(id),
    serverGetLoggedInUser(),
    getOrganizationById((await getTaskById(id)).organization_id),
    getTeamMembersInOrganization((await getTaskById(id)).organization_id)

  ]);

  const [taskCreator, isPrioritizedByUser, isClaimedByUser, taskPrioritizationDetails, claimerDetails, contributions] = await Promise.all([
    task.user_id ? getUserProfile(task.user_id) : Promise.resolve(null),
    checkIfUserPrioritizedTask(task.id),
    checkIfUserClaimedTask(task.id),
    getPrioritizationDetails(task.id),
    getTaskClaimerDetails(task.id),
    getTaskContributions(task.id),
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
          contributions={contributions}
          isPrioritizedByUser={isPrioritizedByUser}
          isClaimedByUser={isClaimedByUser}
          claimerDetails={claimerDetails}
          taskCreator={taskCreator} />
      )}
    </main>
  );
}
