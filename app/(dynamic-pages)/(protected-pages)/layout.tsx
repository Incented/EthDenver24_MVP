import { AppSupabaseClient } from "@/types";
import { User } from "@supabase/supabase-js";
import { ReactNode, Suspense } from "react";
import { redirect } from "next/navigation";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { LoggedInUserProvider } from "@/contexts/LoggedInUserContext";
import { errors } from "@/utils/errors";
import { getUserProfile } from "@/data/user/user";
import { ClientLayout } from "./ClientLayout";
import Navbar from "./dashboard/Navbar";

async function fetchData(supabaseClient: AppSupabaseClient, authUser: User) {
  const [userProfile] = await Promise.all([getUserProfile(authUser.id)]);
  return { userProfile };
}

export default async function Layout({ children }: { children: ReactNode }) {
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
      <LoggedInUserProvider user={user}>
        <div className="">
          <Suspense>
            <div className="">
              <Navbar userProfile={userProfile} />
            </div>
          </Suspense>
          <div>
            <ClientLayout userProfile={userProfile}>{children}</ClientLayout>
          </div>
        </div>
      </LoggedInUserProvider>
    );
  } catch (fetchDataError) {
    errors.add(fetchDataError);
    return <p>Error: An error occurred.</p>;
  }
}
