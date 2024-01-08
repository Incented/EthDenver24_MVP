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
import WalletSetting from "./WalletSetting";
import { Button } from "@/components/ui/button";
import NotificationSetting from "./NotificationSetting";
import { ThemeSettingDark, ThemeSettingLight } from "./ThemeSetting";
import LanguageSetting from "./LanguageSetting";

interface SettingsTabsProps {}

const SettingsTabs: FC<SettingsTabsProps> = ({}) => {
  return (
    <Tabs defaultValue="general" className="max-w-6xl">
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
          <div className="flex justify-between gap-4">
            <div>
              <h1 className="text-[16px] font-semibold mb-1">
                Wallet Settings
              </h1>
              <p className="mb-2 text-sm">Manage all your connected wallets</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </div>
          </div>

          <Separator className="mb-6" />
          <div className="grid gap-4 mb-8">
            <WalletSetting
              isConnected
              walletImage="/logos/ico_orange.svg"
              walletName="Metamask"
            />
            <WalletSetting
              isConnected={false}
              walletImage="/logos/ico_orange.svg"
              walletName="Coinbase"
            />
            <WalletSetting
              isConnected={false}
              walletImage="/logos/ico_orange.svg"
              walletName="WalletConnect"
            />
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="w-full">
        <Card className="p-6">
          <div className="flex justify-between gap-4">
            <div>
              <h1 className="text-[16px] font-semibold mb-1">Notifications</h1>
              <p className="mb-2 text-sm">Manage all your notification</p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </div>
          </div>
          <Separator className="mb-6" />
          <div className="grid gap-8">
            <NotificationSetting
              notification="New task uploaded"
              description="Lorem ipsum dolor sit amet"
            />
            <NotificationSetting
              notification="Winner contribution announcement"
              description="Lorem ipsum dolor sit amet"
            />
            <NotificationSetting
              notification="New contribution on your task proposal"
              description="Lorem ipsum dolor sit amet"
            />
            <NotificationSetting
              notification="New validation on your contribution"
              description="Lorem ipsum dolor sit amet"
            />
            <NotificationSetting
              notification="Your join request in community gets approved by admin"
              description="Lorem ipsum dolor sit amet"
            />
            <NotificationSetting
              notification="Email notification"
              description="Lorem ipsum dolor sit amet"
            />
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="theme" className="w-full">
        <Card className="p-6">
          <div className="flex justify-between gap-4">
            <div>
              <h1 className="text-[16px] font-semibold mb-1">
                Theme preferences
              </h1>
              <p className="mb-2 text-sm">
                Customization according to your preference.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </div>
          </div>
          <Separator className="mb-6" />
          <div className="grid gap-4 md:grid-cols-2">
            <ThemeSettingLight />
            <ThemeSettingDark />
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="language" className="w-full">
        <Card className="p-6">
          <div>
            <h1 className="text-[16px] font-semibold mb-1">Language</h1>
            <p className="mb-2 text-sm">Manage your language preference</p>
          </div>

          <Separator className="mb-6" />
          <div className="">
            <LanguageSetting />
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
