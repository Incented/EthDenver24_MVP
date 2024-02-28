import { getAllGrants } from "@/data/user/grants";
import { GrantProgramCard } from "./_components/GrantProgramCard";
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
  const params = new URLSearchParams();
  const limit = Number(params.get("limit") || 5);
  const grantPrograms = await getAllGrants();
  // const totalPages = Math.ceil(communityCount / limit);
  return (
    <main className="flex flex-col px-4 pb-10 sm:px-8">
      <div className="items-center mt-8 md:flex">
        <h1 className="text-3xl font-medium ">Grants</h1>
      </div>

      <div className="grid gap-4 my-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {grantPrograms.map((grantProgram) => (
          <GrantProgramCard
            key={grantProgram.id}
            communityName={grantProgram.title}
            communityDescription={grantProgram.description!}
            communityImage={grantProgram.grant_image ?? ""}
            communityCreatedBy={grantProgram.created_by}
            communityId={grantProgram.id}
          />
        ))}
      </div>

      <div className="h-full pb-10 mt-4 overflow-auto ">
      </div>
    </main>
  );
}


