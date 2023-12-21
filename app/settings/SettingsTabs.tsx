import { Card } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/vertical-tabs";
import { FC } from "react";
import UpdateUserForm from "./UpdateUserForm";
import { Separator } from "@/components/ui/separator";

interface SettingsTabsProps {}

const SettingsTabs: FC<SettingsTabsProps> = ({}) => {
  return (
    <Tabs defaultValue="all" className="">
      <TabsList className="gap-6 p-4 h-fit">
        <TabsTrigger value="all">General Settings</TabsTrigger>
        <TabsTrigger value="wallet">Wallet Settings</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="theme">Theme Preferences</TabsTrigger>
        <TabsTrigger value="inReview">Language & Time</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="w-full">
        <Card className="p-6">
          <h1 className="text-[16px] font-semibold">General Settings</h1>
          <p className="mb-2">
            Update your photo profile and personal details here
          </p>
          <Separator className="mb-6" />

          <UpdateUserForm />
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
