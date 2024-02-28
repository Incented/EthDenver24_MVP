import GoBack from "@/components/ui/GoBack";
import { getAllMilestonesForGrantProject, getGrantProjectById, getGrantProjectPrioritizations } from "@/data/user/grant-projects";
import { getGrantProgramById } from "@/data/user/grants";
import { getUserProfile } from "@/data/user/user";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { z } from "zod";
import GrantApplicationDetail from "./_components/GrantApplicationDetail";

const paramsSchema = z.object({
  id: z.string(),
});

export default async function GrantDetailsPage({ params }: { params: unknown }) {
  const parsedParams = paramsSchema.parse(params);
  const { id } = parsedParams;
  const [grant, user, grantProgram, grantProjectPrioritizations] = await Promise.all([
    getGrantProjectById(id),
    serverGetLoggedInUser(),
    getGrantProgramById((await getGrantProjectById(id)).organization_id),
    getGrantProjectPrioritizations(id),
  ]);
  const [grantCreator, milestones] = await Promise.all([
    getUserProfile(grant.user_id as string),
    getAllMilestonesForGrantProject(id),
  ]);

  return (
    <main className="md:mx-4 md:pt-0 md:px-8 md:pb-8  px-6 pb-8 mt-4">
      <GoBack />
      <GrantApplicationDetail grant={grant} grantProgram={grantProgram} milestones={milestones} loggedInUserId={user.id} grantProjectPrioritizations={grantProjectPrioritizations} grantCreator={grantCreator} />
    </main>
  );
}
