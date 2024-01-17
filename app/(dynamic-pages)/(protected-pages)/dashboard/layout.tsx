import type { Metadata } from "next";
import Navbar from "./Navbar";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { AppSupabaseClient } from "@/types";
import { User } from "@supabase/supabase-js";
import { getUserProfile } from "@/data/user/user";
import { redirect } from "next/navigation";
import { errors } from "@/utils/errors";

export const metadata: Metadata = {
  icons: {
    icon: "/images/ico_orange.svg",
  },
  title: "Incented Protocol",
  description:
    "A protocol for autonomous task creation, prioritization, validation, and incentivization to supercharge contribution across the Web3 ecosystem and beyond.",
};

async function fetchData(supabaseClient: AppSupabaseClient, authUser: User) {
  const [userProfile] = await Promise.all([getUserProfile(authUser.id)]);
  return { userProfile };
}
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient.auth.getUser();
  const { user } = data;

  if (!user) {
    // This is unreachable because the user is authenticated
    // But we need to check for it anyway for TypeScript.
    return redirect("/login");
  } else if (error) {
    return <p>Error: An error occurred.</p>;
  }

  try {
    const { userProfile } = await fetchData(supabaseClient, data.user);

    return (
      <main>
        <Navbar userProfile={userProfile} />
        {children}
      </main>
    );
  } catch (fetchDataError) {
    errors.add(fetchDataError);
    return <p>Error: An error occurred.</p>;
  }
}
