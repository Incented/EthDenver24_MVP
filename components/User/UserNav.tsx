"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import Link from "next/link";

interface UserNavProps {
  avatarUrl: string;
}

const UserNav: FC<UserNavProps> = ({
  avatarUrl = "https://i.pravatar.cc/150?u=a042581f4e29026024d",
}) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>IN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={30}
        align="center"
        className="w-[150px] px-4 flex flex-col justify-start"
      >
        <Link href="#" className="hover:bg-accent py-1 px-2 rounded-md">
          My Profile
        </Link>
        <Link href="/logout" className="hover:bg-accent py-1 px-2 rounded-md">
          Logout
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default UserNav;
