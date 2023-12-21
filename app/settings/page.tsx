import { FC } from "react";
import SettingsTabs from "./SettingsTabs";

interface pageProps {}

const SettingsPage: FC<pageProps> = ({}) => {
  return (
    <main className="mx-8 mb-4 ">
      <h1 className="mt-8 mb-20 text-2xl">Settings</h1>

      <SettingsTabs />
    </main>
  );
};

export default SettingsPage;
