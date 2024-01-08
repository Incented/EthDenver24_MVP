import IsAuth from "@/hooks/IsAuth";
import { ExternalNavigation } from "./_component/ExternalNavigation";

export const dynamic = "force-static";
export const revalidate = 60;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <IsAuth />
      <ExternalNavigation />
      {children}
    </div>
  );
}
