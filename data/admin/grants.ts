"use server";
import {
  GrantAdminSettingsSchema,
  GrantCarrotPotSchema,
} from "@/app/(dynamic-pages)/(protected-pages)/grants/create-grant/_components/createGrantSchema";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";

export const addPrivateInfoForGrant = async (
  permissions: GrantAdminSettingsSchema,
  communityId: string,
  carrotPotSettings: GrantCarrotPotSchema
) => {
  const { error } = await supabaseAdminClient
    .from("grants_private_info")
    .update({
      user_roles: { ...permissions },
      community_live_status: carrotPotSettings.grant_live_status,
      community_token: carrotPotSettings.grant_token,
    })
    .eq("id", communityId);

  if (error) {
    console.error(error);
    throw error;
  }
};
