"use client";

import type { Metadata } from "next";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { AppSupabaseClient } from "@/types";
import { User } from "@supabase/supabase-js";
import { getUserProfile } from "@/data/user/user";
import { redirect } from "next/navigation";
import { errors } from "@/utils/errors";
import Navbar from "../../dashboard/Navbar";
import { Suspense, useMemo } from "react";
import { TabsNavigation } from "@/components/presentational/TabsNavigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tabs = useMemo(() => {
    return [
      {
        label: "General Settings",
        href: `/settings`,
      },
      {
        label: "Wallet Settings",
        href: `/settings/wallet`,
      },
      {
        label: "Notifications",
        href: `/settings/notifications`,
      },
      {
        label: "Theme preferences",
        href: `/settings/theme`,
      },
      {
        label: "Language and timezone",
        href: `/settings/language`,
      },
    ];
  }, []);
  return (
    <div className="px-8 pt-0 w-full h-full md:overflow-y-hidden">
      <h1 className="mt-10 mb-4 text-3xl font-semibold ">Settings</h1>
      <div className="relative md:grid md:grid-cols-[auto,1fr] flex flex-col gap-4 w-full h-full">
        <TabsNavigation tabs={tabs} />
        <div className="pb-0 md:pb-44 overflow-auto md:overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
