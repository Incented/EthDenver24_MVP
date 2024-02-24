"use client";

import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import { FC } from "react";

interface NotificationMenuProps { onNotificationClick?: () => void; }
interface NotificationItemProps {
  notificationMessage: string;
  notificationTime: string;

}

const NotificationItem: FC<NotificationItemProps> = ({
  notificationMessage,
  notificationTime,
}) => (
  <li className="px-3 py-1 rounded-md bg-gray-50 dark:bg-accent">
    <p className="text-sm font-light">{notificationMessage.slice(0, 50)}...</p>
    <p className="text-xs text-gray-500">{notificationTime}</p>
  </li>
);

const NotificationMenu: FC<NotificationMenuProps> = ({ onNotificationClick }) => {
  return (
    <>
      <Button className="" variant="ghost" onClick={onNotificationClick}>
        <Bell size={16} />
      </Button>
      {/* <Popover>
        <PopoverTrigger className="px-3">
          <Button variant="ghost" onClick={onNotificationClick}>
            <Bell size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          sideOffset={30}
          align="center"
          className="w-[300px] md:w-[430px] px-4 flex flex-col justify-start max-h-[466px]"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-lg font-semibold">Notifications</h1>
            <PopoverClose asChild>
              <X size={18} className="cursor-pointer" />
            </PopoverClose>
          </div>

          <ul className="flex flex-col gap-3 overflow-y-scroll">
            <NotificationItem
              notificationMessage="To eradicate invasive species, reintroduce native species an"
              notificationTime="2 minutes ago"
            />
            <NotificationItem
              notificationMessage="To eradicate invasive species, reintroduce native species an"
              notificationTime="2 minutes ago"
            />
            <NotificationItem
              notificationMessage="To eradicate invasive species, reintroduce native species an"
              notificationTime="2 minutes ago"
            />
            <NotificationItem
              notificationMessage="To eradicate invasive species, reintroduce native species an"
              notificationTime="2 minutes ago"
            />
            <NotificationItem
              notificationMessage="To eradicate invasive species, reintroduce native species an"
              notificationTime="2 minutes ago"
            />
          </ul>
        </PopoverContent>
      </Popover> */}
    </>
  );
};

export default NotificationMenu;
