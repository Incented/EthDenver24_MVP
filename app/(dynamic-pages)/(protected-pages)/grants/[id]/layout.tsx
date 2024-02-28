import Pagination from "@/components/ui/Pagination";
import { getAllOrganizationsCount } from "@/data/user/organizations";
import { ReactNode } from "react";

export default async function CommunityDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  const communityCount = await getAllOrganizationsCount();
  const params = new URLSearchParams();
  return <main className="flex flex-col ">{children}</main>;
}
