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
    <Tabs defaultValue="general" className="">
      <TabsList className="gap-6 p-4 h-fit">
        <TabsTrigger value="general">General Settings</TabsTrigger>
        <TabsTrigger value="wallet">Wallet Settings</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
        <TabsTrigger value="theme">Theme Preferences</TabsTrigger>
        <TabsTrigger value="language">Language & Time</TabsTrigger>
      </TabsList>
      <TabsContent value="general" className="w-full">
        <Card className="p-6">
          <h1 className="text-[16px] font-semibold mb-1">General Settings</h1>
          <p className="mb-2 text-sm">
            Update your photo profile and personal details here
          </p>
          <Separator className="mb-6" />

          <UpdateUserForm />
        </Card>
      </TabsContent>
      <TabsContent value="wallet" className="w-full">
        <Card className="p-6">
          <h1 className="text-[16px] font-semibold mb-1">Wallet Settings</h1>
          <p className="mb-2 text-sm">Manage all your connected wallets</p>
          <Separator className="mb-6" />
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="w-full">
        <Card className="p-6">
          <h1 className="text-[16px] font-semibold mb-1">Notifications</h1>
          <p className="mb-2 text-sm">Manage all your notification</p>
          <Separator className="mb-6" />
        </Card>
      </TabsContent>
      <TabsContent value="theme" className="w-full">
        <Card className="p-6">
          <h1 className="text-[16px] font-semibold mb-1">Theme preferences</h1>
          <p className="mb-2 text-sm">
            Customization according to your preference.
          </p>
          <Separator className="mb-6" />
        </Card>
      </TabsContent>
      <TabsContent value="language" className="w-full">
        <Card className="p-6">
          <h1 className="text-[16px] font-semibold mb-1">Language</h1>
          <p className="mb-2 text-sm">Manage your language preference</p>
          <Separator className="mb-6" />
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
