"use server";
import {
  AdminSettingsSchema,
  CarrotPotSchema,
} from "@/app/(dynamic-pages)/(protected-pages)/communities/create-community/_components/createCommunitySchema";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { ensureAppAdmin } from "@/utils/route-handlers/ensureAppAdmin";

export const addPrivateInfoForOrganization = async (
  permissions: AdminSettingsSchema,
  communityId: string,
  carrotPotSettings: CarrotPotSchema
) => {
  const { error } = await supabaseAdminClient
    .from("organizations_private_info")
    .update({
      user_roles: { ...permissions },
      community_live_status: carrotPotSettings.community_live_status,
      community_token: carrotPotSettings.community_token,
    })
    .eq("id", communityId);

  if (error) {
    console.error(error);
    throw error;
  }
};

export async function getOrganizationsTotalPages({
  query = "",
  limit = 10,
}: {
  query?: string;
  limit?: number;
}) {
  ensureAppAdmin();
  const { data, error } = await supabaseAdminClient.rpc(
    "app_admin_get_all_organizations_count",
    {
      search_query: query,
    }
  );
  if (error) throw error;
  return Math.ceil(Number(data) / limit);
}

export async function getPaginatedOrganizationList({
  limit = 10,
  page,
  query,
}: {
  page?: number;
  query?: string;
  limit?: number;
}) {
  ensureAppAdmin();

  const { data, error } = await supabaseAdminClient.rpc(
    "app_admin_get_all_organizations",
    {
      page: page,
      search_query: query,
      page_size: limit,
    }
  );
  if (error) throw error;
  if (!data) {
    throw new Error("No data");
  }
  return data;
}
