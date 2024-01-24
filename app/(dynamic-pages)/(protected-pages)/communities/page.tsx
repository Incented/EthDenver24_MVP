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
import { FilterOrganizations } from "./_components/FIlterCommunities";

export default async function CommunitiesPage({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const validatedSearchParams =
    appAdminOrganizationsFiltersSchema.parse(searchParams);
  const suspenseKey = JSON.stringify(validatedSearchParams);
  return (
    <main className="px-8 pb-10 flex flex-col min-h-screen">
      <div className="items-center mt-8 md:flex">
        <h1 className="text-3xl font-medium ">Communities</h1>
        <div className="flex items-center gap-3 mt-4 ml-auto md:mt-0">
          <Search placeholder="Search Community" />
          <FilterOrganizations />
          <Link href={`/communities/create-community`}>
            <Button size="sm">
              <Plus size={16} />
              <p className="hidden md:flex">Add Community</p>
            </Button>
          </Link>
        </div>
      </div>
      <Suspense
        key={suspenseKey}
        fallback={
          <div className="flex-grow w-full">
            <div className="flex items-center justify-center h-full">
              Loading...
            </div>
          </div>
        }
      >
        <div className="flex-grow">
          <OrganizationList filters={validatedSearchParams} />
        </div>
      </Suspense>
      <div className="hidden md:flex py-8">
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
