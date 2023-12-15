"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const IsAuth = () => {
  const router = useRouter();
  const { ready, authenticated } = usePrivy();

  useEffect(() => {
    if (authenticated) {
      router.push("/dashboard");
    }
  }, [ready, authenticated, router]);

  return null;
};

export default IsAuth;
