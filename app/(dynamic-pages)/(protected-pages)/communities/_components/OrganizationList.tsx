"use server";
import CommunityCard from "./CommunityCard";
import { AppAdminOrganizationsFiltersSchema } from "./schema";
import { getPaginatedOrganizationListWithoutEnsuringAdmin } from "@/data/admin/organizations";

export async function OrganizationList({
  filters,
}: {
  filters: AppAdminOrganizationsFiltersSchema;
}) {
  const organizations = await getPaginatedOrganizationListWithoutEnsuringAdmin(
    filters
  );
  return (
    <>
      {organizations.map((organization) => (
        <CommunityCard
          key={organization.id}
          communityName={organization.title}
          communityId={organization.id}
        />
      ))}
    </>
  );
}
