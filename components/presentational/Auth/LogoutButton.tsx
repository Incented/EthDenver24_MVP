"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { Button } from "../Button";

const LogoutButton = () => {
  const router = useRouter();
  const { logout } = usePrivy();

  return (
    <Button
      onClick={() => {
        logout();
        router.push("/");
      }}
    >
      Log out
    </Button>
  );
};

export default LogoutButton;
