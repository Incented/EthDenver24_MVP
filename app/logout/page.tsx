"use client";
import { T } from "@/components/ui/Typography";
import { supabaseUserClientComponentClient } from "@/supabase-clients/user/supabaseUserClientComponentClient";
import { useDidMount } from "rooks";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

export default function Logout() {
  const { logout } = usePrivy();
  logout();
  const router = useRouter();
  useDidMount(async () => {
    await supabaseUserClientComponentClient.auth.signOut();
    router.refresh();
    router.replace("/");
  });

  return <T.P>Signing out...</T.P>;
}
