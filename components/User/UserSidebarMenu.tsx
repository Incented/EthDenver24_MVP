import { cn } from "@/lib/utils";
import { FC } from "react";
import { Anchor } from "../Anchor";
import { MailIcon, Shield, User } from "lucide-react";
import { Avatar } from "@nextui-org/react";
import { FeatureViewModal } from "./FeatureViewModal";
import LogoutButton from "../presentational/Auth/LogoutButton";

interface UserSidebarMenuProps {
  userFullName?: string;
  userEmail?: string;
  avatarUrl?: string;
}

const UserSidebarMenu: FC<UserSidebarMenuProps> = ({
  userFullName = "Wilson Dokidis",
  userEmail = "example@gmail.com",
  avatarUrl = "https://i.pravatar.cc/150?u=a042581f4e29026024d",
}) => {
  return (
    <div className="dark:bg-black ">
      <div className="flex items-start mt-1 gap-2 px-2.5 mb-2">
        <Avatar src={avatarUrl} size="sm" />
        <div className="mb-1">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {userFullName}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {userEmail}
          </div>
        </div>
      </div>
      <div className="h-px bg-gray-200 dark:bg-gray-700 mx-2.5 my-2" />
      <Anchor
        href="/settings"
        className={cn(
          "hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50",
          "flex px-3 gap-2 items-center py-2 text-sm"
        )}
      >
        <User className="text-lg" /> Account settings
      </Anchor>

      <Anchor
        href="/settings/security"
        className={cn(
          "hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50",
          "flex px-3 gap-2 items-center py-2 text-sm"
        )}
      >
        <Shield className="text-lg" /> Security Settings
      </Anchor>
      <div className="h-px bg-gray-200 dark:bg-gray-700 mx-2.5 my-2" />
      <FeatureViewModal />
      <Anchor
        href="/feedback"
        prefetch={false}
        className={cn(
          "hover:bg-gray-100 hover:text-gray-900 text-gray-700 rounded-sm dark:text-gray-400 dark:hover:bg-gray-700/50",
          "flex px-3 gap-2 items-center py-2 text-sm"
        )}
      >
        <MailIcon className="text-lg" />
        Feedback
      </Anchor>
      <div className="h-px bg-gray-200 dark:bg-gray-700 mx-2.5 my-2" />

      <LogoutButton />
    </div>
  );
};

export default UserSidebarMenu;
