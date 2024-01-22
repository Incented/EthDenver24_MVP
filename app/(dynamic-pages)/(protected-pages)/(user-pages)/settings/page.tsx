import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { getUserPrivateInfo, getUserProfile } from "@/data/user/user";
import { AccountSettings } from "./AccountSettings";

async function SettingsPage({}) {
  const user = await serverGetLoggedInUser();
  const userPrivateInfo = await getUserPrivateInfo(user.id);
  const userProfile = await getUserProfile(user.id);

  return (
    <AccountSettings
      userPrivateInfo={userPrivateInfo}
      userProfile={userProfile}
    />
  );
}

export default SettingsPage;
