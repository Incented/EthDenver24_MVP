"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell, Wallet } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import UserNav from "@/components/User/UserNav";
import NotificationMenu from "./NotificationMenu";

export default function App() {
  const { user, linkWallet } = usePrivy();

  const walletAddress =
    user?.wallet?.address.slice(0, 4) + "..." + user?.wallet?.address.slice(-4);

  return (
    <header className="py-3 border-b ">
      <nav className="flex items-center justify-between gap-6 mx-4">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logos/ico_orange.svg"
            width={50}
            height={50}
            alt="Incented Logo"
            className="w-8 h-8"
          />
          <p className="font-bold text-inherit">Incented</p>
        </Link>
        <ul className="hidden gap-6 xl:gap-10 lg:flex">
          <li>
            <Link color="foreground" href="/dashboard" aria-current="page">
              My Dashbord
            </Link>
          </li>
          <li>
            <Link href="#" color="foreground">
              Rewards
            </Link>
          </li>
          <li>
            <Link color="foreground" href="#">
              Notification
            </Link>
          </li>
          <li>
            <Link color="foreground" href="#">
              Settings
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-3">
          <NotificationMenu />
          <UserNav />
          <Button
            className="flex items-center gap-1"
            onClick={() => {
              user?.wallet === undefined ? linkWallet() : null;
            }}
          >
            <Wallet size={18} />
            <p className="text-sm">
              {user?.wallet ? walletAddress : "Connect"}
            </p>
          </Button>
        </div>
      </nav>
    </header>
  );
}
