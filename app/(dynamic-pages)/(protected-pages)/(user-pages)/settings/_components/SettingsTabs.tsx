import { Card, CardFooter } from "@/components/ui/card";
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
    <Tabs
      defaultValue="general"
      className="relative md:grid md:grid-cols-[auto,1fr] flex flex-col gap-4 w-full h-full overflow-auto"
    >
      <TabsList className="flex md:flex-col flex-row gap-6 p-6 md:w-[280px] w-full overflow-x-auto md:overflow-x-hidden bg-secondary h-fit">
        <TabsTrigger
          value="general"
          className="w-full data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-medium text-base font-normal px-0"
        >
          General Settings
        </TabsTrigger>
        <TabsTrigger
          value="wallet"
          className="w-full data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-medium text-base font-normal px-0"
        >
          Wallet Settings
        </TabsTrigger>
        <TabsTrigger
          value="notifications"
          className="w-full data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-medium text-base font-normal px-0"
        >
          Notifications
        </TabsTrigger>
        <TabsTrigger
          value="theme"
          className="w-full data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-medium text-base font-normal px-0"
        >
          Theme Preferences
        </TabsTrigger>
        <TabsTrigger
          value="language"
          className="w-full data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:font-medium text-base font-normal px-0"
        >
          Language & Time
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="general"
        className="w-full h-full bg-transparent p-0 m-0"
      >
        <UpdateUserForm />
      </TabsContent>
      <TabsContent value="wallet" className="w-full bg-transparent p-0 m-0 ">
        <Card className="p-6">
          <div className="md:flex md:flex-row flex flex-col items-start md:justify-between gap-4">
            <div className="w-full">
              <h1 className="text-base leading-9 font-semibold">
                Wallet Settings
              </h1>
              <p className=" text-sm leading-6 text-foreground tracking-[-0.35px]">
                Manage all your connected wallets
              </p>
            </div>
            <CardFooter className="w-full justify-end gap-2 md:mt-3 px-0 py-0">
              <Button
                variant="outline"
                type="submit"
                className="w-full md:w-fit bg-secondary hover:bg-muted border-none"
              >
                Cancel{" "}
              </Button>
              <Button type="submit" className="w-full md:w-fit">
                Save
              </Button>
            </CardFooter>
          </div>

          <Separator className="my-4" />
          <div className="grid gap-6 mb-8 max-w-lg">
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
      <TabsContent
        value="notifications"
        className="w-full bg-transparent p-0 m-0 "
      >
        <Card className="p-6">
          <div className="md:flex md:flex-row flex flex-col items-start md:justify-between gap-4">
            <div className="w-full">
              <h1 className="text-base leading-9 font-semibold">
                Notifications
              </h1>
              <p className=" text-sm leading-6 text-foreground tracking-[-0.35px]">
                Manage all your notifications
              </p>
            </div>
            <CardFooter className="w-full justify-end gap-2 md:mt-3 px-0 py-0">
              <Button
                variant="outline"
                type="submit"
                className="w-full md:w-fit bg-secondary hover:bg-muted border-none"
              >
                Cancel{" "}
              </Button>
              <Button type="submit" className="w-full md:w-fit">
                Save
              </Button>
            </CardFooter>
          </div>
          <Separator className="my-4" />
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
      <TabsContent value="theme" className="w-full bg-transparent p-0 m-0 ">
        <Card className="p-6">
          <div className="md:flex md:flex-row flex flex-col items-start md:justify-between gap-4">
            <div className="w-full">
              <h1 className="text-base leading-9 font-semibold">
                Theme preferences
              </h1>
              <p className=" text-sm leading-6 text-foreground tracking-[-0.35px]">
                Customization according to your preference
              </p>
            </div>
            <CardFooter className="w-full justify-end gap-2 md:mt-3 px-0 py-0">
              <Button
                variant="outline"
                type="submit"
                className="w-full md:w-fit bg-secondary hover:bg-muted border-none"
              >
                Cancel{" "}
              </Button>
              <Button type="submit" className="w-full md:w-fit">
                Save
              </Button>
            </CardFooter>
          </div>
          <Separator className="my-4" />
          <div className="grid gap-4 md:grid-cols-2 max-w-lg">
            <ThemeSettingLight />
            <ThemeSettingDark />
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="language" className="w-full bg-transparent p-0 m-0 ">
        <LanguageSetting />
      </TabsContent>
    </Tabs>
  );
};

export default SettingsTabs;
