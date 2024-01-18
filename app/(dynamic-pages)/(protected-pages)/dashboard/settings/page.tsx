import { FC } from "react";
import SettingsTabs from "./_components/SettingsTabs";

interface pageProps {}

const SettingsPage: FC<pageProps> = ({}) => {
  return (
    <>
      <div className="mx-8 h-full">
        <h1 className="mt-8 mb-4 text-3xl font-semibold">Settings</h1>
        <SettingsTabs />
      </div>
    </>
  );
};

export default SettingsPage;
