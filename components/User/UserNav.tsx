"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Link from "next/link";

interface UserNavProps {
  avatarUrl: string;
  userName: string | null;
}

const UserNav: FC<UserNavProps> = ({ avatarUrl = "", userName }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{userName?.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={30}
        align="center"
        className="w-[150px] px-4 flex flex-col justify-start"
      >
        <Link href="#" className="px-2 py-1 rounded-md hover:bg-accent">
          My Profile
        </Link>
        <Link href="/logout" className="px-2 py-1 rounded-md hover:bg-accent">
          Logout
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default UserNav;
