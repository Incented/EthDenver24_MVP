import TaskCard from "@/components/presentational/Tasks/TaskCard";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";

interface SettingsTabsProps {}

const SettingsTabs: FC<SettingsTabsProps> = ({}) => {
  return (
    <Tabs defaultValue="all" orientation="horizontal" className="">
      <TabsList className="">
        <TabsTrigger value="all">General Settings</TabsTrigger>
        <TabsTrigger value="wallet">Wallet Settings</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="theme">Theme Preferences</TabsTrigger>
        <TabsTrigger value="inReview">Language & Time</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="">
        <Card className="p-6">
          <h1 className="text-[16px] font-semibold">General Settings</h1>
          <p>Update your photo profile and personal details here</p>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
