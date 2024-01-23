import { Search } from "@/components/Search";
import { Button } from "@/components/ui/button";
import { Filter, Plus } from "lucide-react";
import CommunityCard from "./_components/CommunityCard";
import Pagination from "@/components/ui/Pagination";
import Link from "next/link";
import { getAllOrganizationsForUser } from "@/data/user/organizations";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { OrganizationList } from "./_components/OrganizationList";
import { appAdminOrganizationsFiltersSchema } from "./_components/schema";
import { getOrganizationsTotalPages } from "@/data/admin/organizations";
import { Suspense } from "react";

export default async function CommunitiesPage({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const validatedSearchParams =
    appAdminOrganizationsFiltersSchema.parse(searchParams);
  const suspenseKey = JSON.stringify(validatedSearchParams);
  return (
    <main className="mx-4 mb-10">
      <div className="items-center mt-8 md:flex">
        <h1 className="text-3xl ">Community</h1>
        <div className="flex items-center gap-3 mt-4 ml-auto md:mt-0">
          <Search placeholder="Search Community" />
          <Button variant="outline">
            <Filter size={20} />
          </Button>
          <Link href={`/communities/create-community`}>
            <Button size="sm">
              <Plus size={16} />
              <p className="hidden md:flex">Add Community</p>
            </Button>
          </Link>
        </div>
      </div>
      <Suspense key={suspenseKey} fallback={<div>Loading...</div>}>
        <div className="grid gap-4 mt-4 mb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <OrganizationList filters={validatedSearchParams} />
        </div>
      </Suspense>
      <div className="hidden md:flex">
        <Pagination currentPage={1} title="Communities" totalPages={10} />
      </div>
      <div className="flex justify-center md:hidden">
        <Button variant="link">Show more</Button>
      </div>
    </main>
  );
}

{
  /* {allCommunities.map((organization) => (
          <CommunityCard
            key={organization.id}
            communityName={organization.title}
          />
        ))} */
}
