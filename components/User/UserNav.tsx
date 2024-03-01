"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { demoMakeDemoUsersPrioritizeNewTasks, demoMakeDemoUsersValidateContributionsForTasksWithContributions } from "@/data/admin/demo-scripts";
import { useToastMutation } from "@/hooks/useToastMutation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface UserNavProps {
  avatarUrl: string;
  userName: string | null;
}

const UserNav: FC<UserNavProps> = ({ avatarUrl = "", userName }) => {
  const router = useRouter();
  const { mutate: makeDemoUsersPrioritiseAllNewTasks } = useToastMutation(demoMakeDemoUsersPrioritizeNewTasks, {
    loadingMessage: "Prioritizing new tasks...",
    successMessage: "Tasks prioritized",
    errorMessage: "Failed to prioritize tasks",
    onSuccess: () => {
      router.refresh()
    }
  });

  const handlePrioritizeClick = () => {
    makeDemoUsersPrioritiseAllNewTasks();
  };

  const { mutate: makeDemoUsersValidateContributionsForTasksWithContributions } = useToastMutation(demoMakeDemoUsersValidateContributionsForTasksWithContributions, {
    loadingMessage: "Validating tasks with contributions...",
    successMessage: "Tasks validated",
    errorMessage: "Failed to validate tasks",
    onSuccess: () => {
      router.refresh()
    }
  });

  const handleValidateClick = () => {
    makeDemoUsersValidateContributionsForTasksWithContributions();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={avatarUrl} className="object-cover" />
          <AvatarFallback>{userName?.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={30}
        side="bottom"
        className="-mt-6 -ml-6 w-[120px] flex flex-col justify-start p-2"
      >
        <Link href="#" className="w-full text-sm font-normal px-2 py-1 rounded-md hover:bg-accent" >
          Settle
        </Link>
        <Link href="#" className="w-full text-sm font-normal px-2 py-1 rounded-md hover:bg-accent" onClick={handlePrioritizeClick}>
          Prioritize        </Link>
        <Link href="#" className="w-full text-sm font-normal px-2 py-1 rounded-md hover:bg-accent" onClick={handleValidateClick}>
          Validate
        </Link>
        <Link href="#" className="hidden text-sm font-normal px-2 py-1 rounded-md hover:bg-accent">
          My Profile
        </Link>
        <Link href="/logout" className="text-sm font-normal px-2 py-1 rounded-md hover:bg-accent">
          Logout
        </Link>
      </PopoverContent>
    </Popover>
  );
};

export default UserNav;
