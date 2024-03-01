import GoBack from "@/components/ui/GoBack";
import { getGrantProjectById } from "@/data/user/grant-projects";
import { checkIfUserClaimedMilestone, checkIfUserPrioritizedMilestone, getMilestoneById, getMilestoneClaimerDetails, getMilestoneContributions, getMilestonePrioritizationDetails, getMilestoneValidationDetails, getMilestoneValidations } from "@/data/user/milestones";
import { getUserProfile } from "@/data/user/user";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import MilestoneDetail from "./_components/MilestoneDetail";

export default async function MilestoneDetailPage({ params }: { params: unknown }) {
  const parsedParams = params as { id: string };
  const { id } = parsedParams;
  const [milestone, user, grantProjectDetails] = await Promise.all([
    getMilestoneById(id),
    serverGetLoggedInUser(),
    getGrantProjectById((await getMilestoneById(id)).grant_project_id),

  ]);

  const [milestoneCreator, isMilestonePrioritizedByLoggedInUser, isMilestoneClaimedByUser, milestonePrioritizationDetails, milestoneValidationDetails, milestoneClaimerDetails, milestoneContributions, milestoneValidations] = await Promise.all([
    milestone.user_id ? getUserProfile(milestone.user_id) : Promise.resolve(null),
    checkIfUserPrioritizedMilestone(milestone.id),
    checkIfUserClaimedMilestone(milestone.id),
    getMilestonePrioritizationDetails(milestone.id),
    getMilestoneValidationDetails(milestone.id),
    getMilestoneClaimerDetails(milestone.id),
    getMilestoneContributions(milestone.id),
    getMilestoneValidations(milestone.id)
  ]);

  // const isUserMemberOfCommunity = teamMembersInOrganization.some(
  //   (member) => member.member_id === user.id
  // );

  const isUserMemberOfGrantProject = true;

  return (
    <main className="md:mx-4 md:pt-0 md:px-8 md:pb-8  px-6 pb-8 mt-4">
      <GoBack />
      <MilestoneDetail
        id={id}
        milestone={milestone}
        user_id={user.id}
        grantProjectDetails={grantProjectDetails}
        isUserMemberOfGrantProject={isUserMemberOfGrantProject}
        milestonePrioritizationDetails={milestonePrioritizationDetails}
        milestoneValidationDetails={milestoneValidationDetails}
        milestoneContributions={milestoneContributions}
        isMilestonePrioritizedByLoggedInUser={isMilestonePrioritizedByLoggedInUser}
        isMilestoneClaimedByUser={isMilestoneClaimedByUser}
        milestoneClaimerDetails={milestoneClaimerDetails}
        milestoneCreator={milestoneCreator}
        milestoneValidations={milestoneValidations} />
    </main>
  );
}
