"use server";

import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { Enum } from "@/types";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { revalidatePath } from "next/cache";
import { getOrganizationTitle } from "./organizations";

export const createTaskType = async ({
  name,
  description,
  slug,
}: {
  name: string;
  description?: string;
  slug: string;
}) => {
  console.log("Creating task type with", name, description, slug);
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("task_types")
    .insert({ name, description, slug })
    .single();

  if (error) {
    throw error;
  }

  revalidatePath("/");

  return data;
};

export const getAllNamesOfTaskTypes = async () => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("task_types")
    .select("name, id, slug");

  if (error) {
    throw error;
  }

  return data;
};

export const createTaskAction = async ({
  community_id,
  task_title,
  task_description,
  task_rewards,
  task_efforts,
  task_files,
  task_types,
  is_task_published,
  task_status,
}: {
  community_id: string;
  task_title: string;
  task_description: string;
  task_rewards: number;
  task_efforts: number;
  task_files?: { name: string; url: string }[];
  task_types: {};
  is_task_published: boolean;
  task_status: Enum<"task_status">;
}) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: task, error } = await supabaseClient
    .from("tasks")
    .insert({
      organization_id: community_id,
      user_id: user.id,
      name: task_title,
      description: task_description,
      rewards: task_rewards,
      efforts: task_efforts,
      files: task_files,
      task_types: task_types,
      task_status: task_status,
      is_task_published: is_task_published,
      new_task_created_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/tasks/${task.id}`);
  return task;
};

export const editTaskForm = async ({
  id,
  community_id,
  task_title,
  task_description,
  task_rewards,
  task_efforts,
  task_files,
  task_types,
  is_task_published,
  task_status,
}: {
  id: string;
  community_id: string;
  task_title: string;
  task_description: string;
  task_rewards: number;
  task_efforts: number;
  task_files?: { name: string; url: string }[];
  task_types: {};
  is_task_published: boolean;
  task_status: Enum<"task_status">;
}) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: task, error } = await supabaseClient
    .from("tasks")
    .upsert({
      organization_id: community_id,
      user_id: user.id,
      name: task_title,
      description: task_description,
      rewards: task_rewards,
      efforts: task_efforts,
      files: task_files,
      task_types: task_types,
      task_status: task_status,
      is_task_published: is_task_published,
      new_task_created_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/tasks/${task.id}`);
  return task;
};

export const publishTaskAction = async (id: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const currentTime = new Date().toISOString();
  const { data: task, error } = await supabaseClient
    .from("tasks")
    .update({
      is_task_published: true,
      new_task_created_at: currentTime,
      task_status: "new_task",
    })
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/tasks/${id}`);
  return task;
};

export const unPublishTaskAction = async (id: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: task, error } = await supabaseClient
    .from("tasks")
    .update({ is_task_published: false })
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/tasks/${id}`);
  return task;
};

export const prioritizeTaskAction = async ({
  stakeAmount,
  task_id,
}: {
  stakeAmount: number;
  task_id: string;
}) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: prioritizedTask, error } = await supabaseClient
    .from("prioritizations")
    .insert({ count: stakeAmount, task_id, user_id: user.id });

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/tasks/${task_id}`);
  return prioritizedTask;
};

export const checkIfUserPrioritizedTask = async (
  task_id: string
): Promise<boolean> => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: prioritizedTask, error } = await supabaseClient
    .from("prioritizations")
    .select("*")
    .eq("task_id", task_id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return prioritizedTask !== null;
};

export const checkIfUserClaimedTask = async (
  task_id: string
): Promise<boolean> => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: claimedTask, error } = await supabaseClient
    .from("claimed_tasks")
    .select("*")
    .eq("task_id", task_id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return claimedTask !== null;
};

export const updateTaskStatusAction = async ({
  status,
  task_id,
}: {
  status: Enum<"task_status">;
  task_id: string;
}) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { error } = await supabaseClient
    .from("tasks")
    .update({ task_status: status })
    .eq("id", task_id)
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/tasks/${task_id}`);
};

export const getPrioritizationDetails = async (task_id: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: prioritizationDetails, error: prioritizationError } =
    await supabaseClient
      .from("prioritizations")
      .select("count, created_at, user_id")
      .eq("task_id", task_id);

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

export const getTaskClaimerDetails = async (task_id: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: claimerData, error: claimerError } = await supabaseClient
    .from("claimed_tasks")
    .select("user_id")
    .eq("task_id", task_id)
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

export const claimTaskAction = async (task_id: string) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { error } = await supabaseClient
    .from("claimed_tasks")
    .insert({ task_id, user_id: user.id });

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/tasks/${task_id}`);
};

export const contributeToTaskAction = async ({
  task_id,
  description,
  files,
  links,
}: {
  task_id: string;
  description: string;
  files: { name: string; url: string }[];
  links: { link?: string }[];
}) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { error } = await supabaseClient.from("contributions").insert({
    files: files,
    links,
    description: description,
    task_id: task_id,
    user_id: user.id,
  });

  if (error) {
    throw error;
  }
};

export const getTaskById = async (taskId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId)
    .single();

  if (error) {
    throw error;
  }

  return task;
};

export const getTasksCreatedByUser = async (userId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return tasks;
};

export const getCommunityTasks = async (communityId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("organization_id", communityId);

  if (error) {
    throw error;
  }

  return tasks;
};

export const getTaskContributions = async (task_id: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: tasks, error } = await supabase
    .from("contributions")
    .select("*")
    .eq("task_id", task_id);

  if (error) {
    throw error;
  }

  return tasks;
};

export const getValidationsForContribution = async (
  contribution_id: string
) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: validations, error } = await supabase
    .from("validations")
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

export const getCommunityTasksWithCommunityNames = async (
  communityId: string
) => {
  const tasks = await getCommunityTasks(communityId);
  const tasksWithCommunityNames = await Promise.all(
    tasks.map(async (task) => {
      const communityName = await getOrganizationTitle(task.organization_id);
      return { ...task, task_community_name: communityName };
    })
  );
  return tasksWithCommunityNames;
};

export const getAllTasks = async () => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: tasks, error } = await supabase.from("tasks").select("*");

  if (error) {
    throw error;
  }

  return tasks;
};

export const getAllTasksOfUser = async (userId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: tasks, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId);

  if (error) {
    throw error;
  }

  return tasks;
};

export async function getAllTasksOfUserWithCommunityNames(userId: string) {
  const tasks = await getAllTasksOfUser(userId);
  const tasksWithCommunityNames = await Promise.all(
    tasks.map(async (task) => {
      const communityName = await getOrganizationTitle(task.organization_id);
      return { ...task, task_community_name: communityName };
    })
  );
  return tasksWithCommunityNames;
}

export async function getAllTasksWithCommunityNames() {
  const tasks = await getAllTasks();
  const tasksWithCommunityNames = await Promise.all(
    tasks.map(async (task) => {
      const communityName = await getOrganizationTitle(task.organization_id);
      return { ...task, task_community_name: communityName };
    })
  );
  return tasksWithCommunityNames;
}
