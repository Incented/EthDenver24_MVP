"use server";
import { getPaginatedOrganizationsList } from "@/data/user/organizations";
import CommunityCard from "./CommunityCard";
import { AppAdminOrganizationsFiltersSchema } from "./schema";

export async function OrganizationList({
  filters,
}: {
  filters: AppAdminOrganizationsFiltersSchema;
}) {
  const organizations = await getPaginatedOrganizationsList(filters);
  console.log(organizations);
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
