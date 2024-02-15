"use client";

import React, { FC, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Wallet } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";
import { Button } from "@/components/ui/button";
import UserNav from "@/components/User/UserNav";
import NotificationMenu from "./NotificationMenu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface IProps {
  userProfile: {
    id: string;
    full_name: string | null;
    avatar_url: string | null;
    created_at: string;
  };
}

const Navbar: FC<IProps> = ({ userProfile }) => {
  const [sheetOpen, setSheetOpen] = useState(false);
  const { user, linkWallet } = usePrivy();
  const pathName = usePathname();

  const walletAddress =
    user?.wallet?.address.slice(0, 4) + "..." + user?.wallet?.address.slice(-4);

  const navLinks = [
    { href: "/dashboard", label: "My Dashboard" },
    { href: "/dashboard/rewards", label: "Rewards" },
    { href: "/communities", label: "Communities" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <header className="w-full py-3 border-b ">
      <nav className="flex items-center justify-between gap-6 mx-4">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Menu className="absolute cursor-pointer lg:hidden" />
          </SheetTrigger>

          <SheetContent side="left">
            {/* {navLinks.map((link, i) => (
                <SheetClose
                  asChild
                  className="px-8 py-3 rounded-md hover:bg-accent"
                  key={i}
                >
                  <Link
                    color="foreground"
                    className="text-sm "
                    href={link.href}
                    aria-current="page"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))} */}
            <NavigationMenu className="mx-auto">
              <NavigationMenuList className="flex flex-col items-center justify-center space-y-10">
                <NavigationMenuItem>
                  <Link href="/dashboard" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      onClick={() => setSheetOpen(false)}
                    >
                      My Dashboard
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/dashboard/rewards" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      onClick={() => setSheetOpen(false)}
                    >
                      Rewards
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/communities" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      onClick={() => setSheetOpen(false)}
                    >
                      Communities
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
                  <NavigationMenuContent className="">
                    <ul className="p-3 w-[200px] space-y-3">
                      <li>
                        <NavigationMenuLink
                          asChild
                          onClick={() => setSheetOpen(false)}
                        >
                          <a
                            className="flex flex-col w-full h-full p-3 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                            href="/settings"
                          >
                            User Settings
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink
                          asChild
                          onClick={() => setSheetOpen(false)}
                        >
                          <a
                            className="flex flex-col w-full h-full p-3 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                            href="/admin-settings"
                          >
                            Admin Settings
                          </a>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
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
          <p className="text-xl font-bold text-inherit">Incented</p>
        </Link>
        <NavigationMenu className="hidden gap-0 text-sm xl:ml-12 xl:gap-0 lg:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  My Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/dashboard/rewards" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Rewards
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/communities" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Communities
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
              <NavigationMenuContent className="">
                <ul className="p-3 w-[150px] space-y-3">
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="flex flex-col w-full h-full p-3 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                        href="/settings"
                      >
                        User Settings
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="flex flex-col w-full h-full p-3 no-underline rounded-md outline-none select-none bg-gradient-to-b from-muted/50 to-muted focus:shadow-md"
                        href="/admin-settings"
                      >
                        Admin Settings
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

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
