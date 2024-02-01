import { ReactNode } from "react";

export default function RewardsLayout({ children }: { children: ReactNode }) {
  return <div className="overflow-hidden">{children}</div>;
}
