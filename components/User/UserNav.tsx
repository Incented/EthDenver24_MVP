"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { FC } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface UserNavProps {
  avatarUrl: string;
  userName: string | null;
  onAvatarClick?: () => void;
}

const UserNav: FC<UserNavProps> = ({ avatarUrl = "", userName, onAvatarClick }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' onClick={onAvatarClick} className="w-fit">
          <Avatar className="">
            <AvatarImage src={avatarUrl} className="object-cover" />
            <AvatarFallback>{userName?.slice(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
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
