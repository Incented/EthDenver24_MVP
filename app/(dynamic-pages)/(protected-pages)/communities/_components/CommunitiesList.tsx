"use server";
import {
  getAllBookmarkedOrganizationsForUser,
  getPaginatedOrganizationsList,
  getTeamMembersInOrganization
} from "@/data/user/organizations";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { revalidatePath } from "next/cache";
import CommunityCard from "./CommunityCard";
import { FiltersSchema } from "./schema";

export async function CommunitiesList({ filters }: { filters: FiltersSchema }) {
  const user = await serverGetLoggedInUser();
  const [allOrganizations, bookmarkedOrganizations] = await Promise.all([
    getPaginatedOrganizationsList(filters),
    getAllBookmarkedOrganizationsForUser(user.id),
  ]);
  let filteredOrganizations = allOrganizations;
  if (filters.types) {
    if (filters.types.includes("my_communities")) {
      const checkUserMembershipPromises = allOrganizations.map(
        async (organization) => {
          const members = await getTeamMembersInOrganization(organization.id);
          return members.some((member) => member.member_id === user.id)
            ? organization
            : null;
        }
      );

      const organizationsWithUser = await Promise.all(
        checkUserMembershipPromises
      );
      filteredOrganizations = organizationsWithUser.filter(
        (organization) => organization !== null
      ) as typeof filteredOrganizations;
    }

    if (filters.types.includes("bookmarked")) {
      filteredOrganizations = allOrganizations.filter((organization) =>
        bookmarkedOrganizations.includes(organization.id)
      );
    }
  }

  revalidatePath("/communities");

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredOrganizations.map((organization) => (
        <CommunityCard
          key={organization.id}
          communityName={organization.title}
          communityImage={organization.community_image ?? ""}
          communityCreatedBy={organization.created_by}
          userId={user.id}
          communityId={organization.id}
          isBookmarked={bookmarkedOrganizations.includes(organization.id)}
        />
      ))}
    </div>
  );
}
