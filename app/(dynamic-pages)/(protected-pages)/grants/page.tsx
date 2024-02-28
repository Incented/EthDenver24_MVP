import {
  getAllOrganizationsCount
} from "@/data/user/organizations";
import {
  filtersSchema
} from "./_components/schema";

export default async function GrantsPage({
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
    <main className="flex flex-col px-4 pb-10 sm:px-8">
      <div className="items-center mt-8 md:flex">
        <h1 className="text-3xl font-medium ">Grants</h1>
      </div>
      <div className="h-full pb-10 mt-4 overflow-auto ">
      </div>
    </main>
  );
}


