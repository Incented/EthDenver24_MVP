"use server";

import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { Enum } from "@/types";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { revalidatePath } from "next/cache";

export const getMilestoneById = async (milestoneId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: task, error } = await supabase
    .from("grant_project_milestones_2")
    .select("*")
    .eq("id", milestoneId)
    .single();

  if (error) {
    throw error;
  }

  return task;
};

export const getMilestonePrioritizationDetails = async (
  milestoneId: string
) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: prioritizationDetails, error: prioritizationError } =
    await supabaseClient
      .from("grant_project_milestone_prioritizations")
      .select("count, created_at, user_id")
      .eq("grant_project_milestone_id", milestoneId);

  if (prioritizationError) {
    throw prioritizationError;
  }
  const userIds = prioritizationDetails.map((detail) => detail.user_id);
  const { data: userProfiles, error: userProfilesError } = await supabaseClient
    .from("user_profiles")
    .select("id, full_name, avatar_url")
    .in("id", userIds);

  if (userProfilesError) {
    throw userProfilesError;
  }
  const prioritizationDetailsWithUser = prioritizationDetails.map((detail) => {
    const userProfile = userProfiles.find(
      (profile) => profile.id === detail.user_id
    );
    return {
      ...detail,
      full_name: userProfile ? userProfile.full_name : null,
      avatar_url: userProfile ? userProfile.avatar_url : null,
    };
  });

  return prioritizationDetailsWithUser;
};

export const checkIfUserPrioritizedMilestone = async (
  milestoneId: string
): Promise<boolean> => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: prioritizedTask, error } = await supabaseClient
    .from("grant_project_milestone_prioritizations")
    .select("*")
    .eq("grant_project_milestone_id", milestoneId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return prioritizedTask !== null;
};

export const getMilestoneValidationDetails = async (milestoneId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: validationDetails, error: validationError } =
    await supabaseClient
      .from("grant_project_milestone_validations")
      .select("count, created_at, user_id")
      .eq("grant_project_milestone_id", milestoneId);

  if (validationError) {
    throw validationError;
  }
  const userIds = validationDetails.map((detail) => detail.user_id);
  const { data: userProfiles, error: userProfilesError } = await supabaseClient
    .from("user_profiles")
    .select("id, full_name, avatar_url")
    .in("id", userIds);

  if (userProfilesError) {
    throw userProfilesError;
  }

  const validationDetailsWithUser = validationDetails.map((detail) => {
    const userProfile = userProfiles.find(
      (profile) => profile.id === detail.user_id
    );
    return {
      ...detail,
      full_name: userProfile ? userProfile.full_name : null,
      avatar_url: userProfile ? userProfile.avatar_url : null,
    };
  });

  return validationDetailsWithUser;
};

export const getMilestoneClaimerDetails = async (milestoneId: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: claimerData, error: claimerError } = await supabaseClient
    .from("grant_project_claimed_milestones")
    .select("user_id")
    .eq("milestone_id", milestoneId)
    .maybeSingle();

  if (claimerError) {
    throw claimerError;
  }

  if (!claimerData) {
    return null;
  }

  const { data: userProfile, error: userProfileError } = await supabaseClient
    .from("user_profiles")
    .select("id, full_name, avatar_url")
    .eq("id", claimerData.user_id)
    .single();

  if (userProfileError) {
    throw userProfileError;
  }

  return userProfile;
};

export const checkIfUserClaimedMilestone = async (
  milestoneId: string
): Promise<boolean> => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: claimedTask, error } = await supabaseClient
    .from("grant_project_claimed_milestones")
    .select("*")
    .eq("milestone_id", milestoneId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return claimedTask !== null;
};

export const getMilestoneContributions = async (milestone_id: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: tasks, error } = await supabase
    .from("grant_project_milestones_contributions")
    .select("*")
    .eq("grant_project_milestone_id", milestone_id);

  if (error) {
    throw error;
  }

  return tasks;
};

export const getMilestoneValidations = async (milestone_id: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: validations, error } = await supabase
    .from("grant_project_milestone_validations")
    .select("*")
    .eq("grant_project_milestone_id", milestone_id);

  if (error) {
    throw error;
  }

  if (!validations) {
    return null;
  }

  return validations;
};

export const prioritizeMilestoneAction = async ({
  stakeAmount,
  grant_project_milestone_id,
}: {
  stakeAmount: number;
  grant_project_milestone_id: string;
}) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: prioritizedTask, error } = await supabaseClient
    .from("grant_project_milestone_prioritizations")
    .insert({
      count: stakeAmount,
      grant_project_milestone_id,
      user_id: user.id,
    });

  if (error) {
    throw error;
  }

  revalidatePath(`/milestones/${grant_project_milestone_id}`);
  return prioritizedTask;
};

export const updateMilestoneStatusAction = async ({
  status,
  task_id,
}: {
  status: Enum<"task_status">;
  task_id: string;
}) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { error } = await supabaseClient
    .from("grant_project_milestones_2")
    .update({ grant_project_milestone_status: status })
    .eq("id", task_id)
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/milestones/${task_id}`);
};

export const claimMilestoneAction = async (milestone_id: string) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { error } = await supabaseClient
    .from("grant_project_claimed_milestones")
    .insert({ milestone_id: milestone_id, user_id: user.id });

  if (error) {
    throw error;
  }

  revalidatePath(`/milestones/${milestone_id}`);
};

export const contributeToMilestoneAction = async ({
  milestone_id,
  description,
  files,
  links,
}: {
  milestone_id: string;
  description: string;
  files: { name: string; url: string }[];
  links: { link?: string }[];
}) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { error } = await supabaseClient
    .from("grant_project_milestones_contributions")
    .insert({
      files: files,
      links,
      description: description,
      grant_project_milestone_id: milestone_id,
      user_id: user.id,
    });

  if (error) {
    throw error;
  }
};

export const validateMilestoneContributionAction = async ({
  contribution_id,
  description,
  milestone_id,
  count,
  files,
}: {
  contribution_id: string;
  description: string;
  milestone_id: string;
  count: number;
  files: { name: string; url: string }[];
}) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { error } = await supabaseClient
    .from("grant_project_milestone_validations")
    .insert({
      contribution_id,
      description,
      count,
      files,
      grant_project_milestone_id: milestone_id,
      user_id: user.id,
    });

  if (error) {
    throw error;
  }
};

export const getValidationsForMilestoneContribution = async (
  contribution_id: string
) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: validations, error } = await supabase
    .from("grant_project_milestone_validations")
    .select("*")
    .eq("contribution_id", contribution_id);

  if (error) {
    throw error;
  }

  if (!validations) {
    return null;
  }

  return validations;
};
