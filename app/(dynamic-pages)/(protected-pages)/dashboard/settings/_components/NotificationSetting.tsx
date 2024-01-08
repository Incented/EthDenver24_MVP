"use client";
import { Checkbox } from "@/components/ui/checkbox";
import { FC } from "react";

interface NotificationSettingProps {
  notification: string;
  description: string;
}

const NotificationSetting: FC<NotificationSettingProps> = ({
  notification = "New task uploaded",
  description = "Lorem ipsum dolor sit amet",
}) => {
  return (
    <div className="">
      <div className="flex items-center space-x-2">
        <Checkbox id={notification} />

        <label
          htmlFor={notification}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {notification}
        </label>
      </div>
      <p className="inline ml-6 text-xs text-gray-400">{description}</p>
    </div>
  );
};

export default NotificationSetting;
