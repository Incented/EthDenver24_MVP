import { FC } from "react";
import SettingsTabs from "./_components/SettingsTabs";
import UpdateUserForm from "./_components/UpdateUserForm";

interface pageProps {}

const SettingsPage: FC<pageProps> = ({}) => {
  return <UpdateUserForm />;
};

export default SettingsPage;
