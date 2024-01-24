"use server";
import {
  getAllOrganizationsForUser,
  getPaginatedOrganizationsList,
} from "@/data/user/organizations";
import CommunityCard from "./CommunityCard";
import { AppAdminOrganizationsFiltersSchema } from "./schema";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";

export async function OrganizationList({
  filters,
}: {
  filters: AppAdminOrganizationsFiltersSchema;
}) {
  const organizations = await getPaginatedOrganizationsList(filters);
  const user = await serverGetLoggedInUser();
  const userOrganizations = await getAllOrganizationsForUser(user.id);
  const filteredOrganizations = organizations.filter(
    (organization) =>
      !userOrganizations.some((userOrg) => userOrg.id === organization.id)
  );
  return (
    <div className="grid gap-4 mt-4 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filteredOrganizations.map((organization) => (
        <CommunityCard
          key={organization.id}
          communityName={organization.title}
          communityId={organization.id}
        />
      ))}
    </div>
  );
}
