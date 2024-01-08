import { FC } from "react";
import SettingsTabs from "./_components/SettingsTabs";

interface pageProps {}

const SettingsPage: FC<pageProps> = ({}) => {
  return (
    <main className="mx-4 mb-8 ">
      <h1 className="mt-8 mb-4 text-2xl">Settings</h1>
      <SettingsTabs />
    </main>
  );
};

export default SettingsPage;
