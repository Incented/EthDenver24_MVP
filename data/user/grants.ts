"use server";
import { GrantGeneralDetailsSchema } from "@/app/(dynamic-pages)/(protected-pages)/grants/create-grant/_components/createGrantSchema";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";

export const createGrantAction = async (
  publicData: GrantGeneralDetailsSchema
) => {
  const supabase = createSupabaseUserServerComponentClient();
  const user = await serverGetLoggedInUser();
  const { data, error } = await supabase
    .from("grant_programs")
    .insert({
      title: publicData.title,
      description: publicData.description,
      created_by: user.id,
      proposal_absolute_reward: publicData.proposalReward,
      prioritization_reward_percentage: publicData.prioritizationReward,
      validation_reward_percentage: publicData.validationReward,
      claim_stake_amount_percentage: publicData.claimStakeAmount,
      prioritization_quorum_percentage: publicData.prioritizationQourum,
      validation_quorum_percentage: publicData.validationQuorum,
      contribution_period: publicData.contributionPeriod,
      validation_period: publicData.validationPeriod,
      prioritization_period: publicData.prioritizationPeriod,
      facebook_url: publicData.socialLinks?.find(
        (link) => link.type === "facebook"
      )?.url,
      twitter_url: publicData.socialLinks?.find(
        (link) => link.type === "twitter"
      )?.url,
      linkedin_url: publicData.socialLinks?.find(
        (link) => link.type === "linkedin"
      )?.url,
      website_url: publicData.socialLinks?.find(
        (link) => link.type === "website"
      )?.url,
      instagram_url: publicData.socialLinks?.find(
        (link) => link.type === "instagram"
      )?.url,
      youtube_url: publicData.socialLinks?.find(
        (link) => link.type === "youtube"
      )?.url,
      grant_image: publicData.avatarUrl,
      grant_pool: publicData.pool,
      slash_percentage: publicData.slash_percentage,
    })
    .select("*")
    .single();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
};

export const getAllGrants = async () => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("grant_programs")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const getGrantProgramById = async (grantId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("grant_programs")
    // query team_members and team_invitations in one go
    .select("*")
    .eq("id", grantId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export async function getAllGrantsCount() {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("grant_programs")
    .select("id");
  if (error) {
    throw error;
  }
  return data.length;
}

export async function getAllGrantNames() {
  const supabaseClient = createSupabaseUserServerComponentClient();

  const { data, error } = await supabaseClient
    .from("grant_programs")
    .select("title, id, grant_image");
  if (error) {
    throw error;
  }

  return data;
}
