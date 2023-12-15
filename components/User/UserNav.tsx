"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import LogoutButton from "../presentational/Auth/LogoutButton";
import { Button } from "../ui/button";

interface UserNavProps {
  avatarUrl?: string;
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
        <Button variant="ghost" className="mb-2">
          My Profile
        </Button>
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
};

export default UserNav;
