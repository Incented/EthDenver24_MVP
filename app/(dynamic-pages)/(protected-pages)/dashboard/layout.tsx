import type { Metadata } from "next";
import Navbar from "./Navbar";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { AppSupabaseClient } from "@/types";
import { User } from "@supabase/supabase-js";
import { getUserProfile } from "@/data/user/user";
import { redirect } from "next/navigation";
import { errors } from "@/utils/errors";
import { Suspense } from "react";

export const metadata: Metadata = {
  icons: {
    icon: "/images/ico_orange.svg",
  },
  title: "Incented Protocol",
  description:
    "A protocol for autonomous task creation, prioritization, validation, and incentivization to supercharge contribution across the Web3 ecosystem and beyond.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-full">{children}</div>;
}
