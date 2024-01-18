"use client";
import { Anchor } from "@/components/Anchor";
import { usePathname } from "next/navigation";
import { TabProps } from "./types";
import { cn } from "@/lib/utils";

export const Tab = ({ label, href }: TabProps) => {
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
      <span className="leading-9">{label}</span>
    </Anchor>
  );
};
