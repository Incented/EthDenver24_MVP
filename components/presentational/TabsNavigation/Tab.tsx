"use client";
import { Anchor } from "@/components/Anchor";
import { usePathname } from "next/navigation";
import { TabProps } from "./types";
import { cn } from "@/lib/utils";

export const Tab = ({ label, href, icon }: TabProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Anchor
      href={href}
      className={cn(
        "w-full text-base leading-9 whitespace-nowrap px-0 bg-transparent shadow-none ",
        isActive
          ? "text-foreground font-medium "
          : "text-muted-foreground font-normal hover:text-foreground"
      )}
    >
      <div className="flex gap-2 items-center">
        {icon ? (
          <div className="border rounded-full h-10 w-10 bg-background flex items-center justify-center">
            {icon}
          </div>
        ) : null}
        <span className="leading-9">{label}</span>
      </div>
    </Anchor>
  );
};
