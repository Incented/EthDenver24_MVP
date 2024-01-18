"use client";

import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Wallet } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import UserNav from "@/components/User/UserNav";
import NotificationMenu from "./NotificationMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SheetClose } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface IProps {
  userProfile: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    created_at: string;
  };
}

const Navbar: FC<IProps> = ({ userProfile }) => {
  const { user, linkWallet } = usePrivy();
  const pathName = usePathname();

  const walletAddress =
    user?.wallet?.address.slice(0, 4) + "..." + user?.wallet?.address.slice(-4);

  const navLinks = [
    { href: "/dashboard", label: "My Dashboard" },
    { href: "/dashboard/rewards", label: "Rewards" },
    { href: "/dashboard/community", label: "Community" },
    { href: "/dashboard/settings", label: "Settings" },
  ];

  return (
    <header className="w-full py-3 border-b ">
      <nav className="flex items-center justify-between gap-6 mx-4">
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="absolute cursor-pointer lg:hidden" />
          </SheetTrigger>

          <SheetContent side="left">
            <ul className="flex flex-col gap-8 mx-6 mt-10">
              {navLinks.map((link, i) => (
                <SheetClose
                  asChild
                  className="px-8 py-3 rounded-md hover:bg-accent"
                  key={i}
                >
                  <Link
                    color="foreground"
                    className=" text-sm"
                    href={link.href}
                    aria-current="page"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="flex items-center ml-6 lg:ml-0">
          <Image
            src="/logos/ico_orange.svg"
            width={50}
            height={50}
            alt="Incented Logo"
            className="w-8 h-8"
          />
          <p className="font-bold text-xl text-inherit">Incented</p>
        </Link>
        <ul className="hidden xl:ml-12 gap-0 xl:gap-0 lg:flex text-sm">
          {navLinks.map((link, i) => (
            <li key={i}>
              <Link
                color="foreground"
                href={link.href}
                aria-current="page"
                className={cn(
                  "px-4 py-2",
                  pathName === link.href && pathName.startsWith(link.href)
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center">
          <NotificationMenu />
          <UserNav
            userName={userProfile.full_name}
            avatarUrl={userProfile.avatar_url || ""}
          />
          <Button
            className="flex items-center gap-2"
            onClick={() => {
              user?.wallet === undefined ? linkWallet() : null;
            }}
          >
            <Wallet size={16} className="text-white" />
            <p className="text-sm">
              {user?.wallet ? walletAddress : "Connect"}
            </p>
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
