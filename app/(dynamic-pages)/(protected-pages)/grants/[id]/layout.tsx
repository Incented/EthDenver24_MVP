import { ReactNode } from "react";

export default async function CommunityDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <main className="flex flex-col ">{children}</main>;
}
