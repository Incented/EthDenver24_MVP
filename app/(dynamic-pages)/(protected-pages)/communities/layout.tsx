import Pagination from "@/components/ui/Pagination";
import { getAllOrganizationsCount } from "@/data/user/organizations";
import { ReactNode } from "react";

export default async function CommunitiesLayouts({
  children,
}: {
  children: ReactNode;
}) {
  const communityCount = await getAllOrganizationsCount();
  const params = new URLSearchParams();
  const limit = Number(params.get("limit") || 5);
  const totalPages = Math.ceil(communityCount / limit);
  return (
    <main className="h-screen px-8 pb-10 flex flex-col min-h-screen overflow-hidden">
      {children}
      <div className="sticky hidden md:flex py-8 pt-4 bottom-0">
        <Pagination
          title="Communities"
          totalPages={totalPages}
          count={communityCount}
        />
      </div>
    </main>
  );
}
