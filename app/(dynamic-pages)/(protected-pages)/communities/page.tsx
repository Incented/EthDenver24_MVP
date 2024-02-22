import { Search } from "@/components/Search";
import Pagination from "@/components/ui/Pagination";
import { Button } from "@/components/ui/button";
import {
  getAllOrganizationsCount
} from "@/data/user/organizations";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { CommunitiesList } from "./_components/CommunitiesList";
import CommunityLoadingSkeleton from "./_components/CommunityLoadingSkeleton";
import { FilterCommunities } from "./_components/FIlterCommunities";
import {
  filtersSchema
} from "./_components/schema";

export default async function CommunitiesPage({
  searchParams,
}: {
  searchParams: unknown;
}) {
  const validatedSearchParams = filtersSchema.parse(searchParams);
  const suspenseKey = JSON.stringify(validatedSearchParams);
  const communityCount = await getAllOrganizationsCount();
  const params = new URLSearchParams();
  const limit = Number(params.get("limit") || 5);
  const totalPages = Math.ceil(communityCount / limit);
  // const totalPages = Math.ceil(communityCount / limit);
  return (
    <main className="flex flex-col h-screen px-8 pb-10 overflow-hidden">
      <div className="h-screen">
        <div className="items-center mt-8 md:flex">
          <h1 className="text-3xl font-medium ">Communities</h1>
          <div className="flex items-center gap-3 mt-4 ml-auto md:mt-0">
            <Search placeholder="Search Community" />
            <FilterCommunities />
            <Link href={`/communities/create-community`}>
              <Button size="sm">
                <Plus size={16} />
                <p className="hidden md:flex">Add Community</p>
              </Button>
            </Link>
          </div>
        </div>
        <div className="h-full mt-4 overflow-auto pb-60 ">
          <Suspense
            key={suspenseKey}
            fallback={
              <CommunityLoadingSkeleton />
            }
          >
            <CommunitiesList filters={validatedSearchParams} />
          </Suspense>
        </div>

        <div className="flex justify-center md:hidden">
          <Button variant="link">Show more</Button>
        </div>
      </div>
      <div className="sticky bottom-0 hidden py-6 pt-4 md:flex">
        <Pagination
          title="Communities"
          totalPages={totalPages}
          count={communityCount}
        />
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
