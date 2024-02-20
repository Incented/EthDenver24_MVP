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
  const { data: task, error } = await supabaseClient
    .from("tasks")
    .update({ is_task_published: true })
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

export async function getAllTasksWithCommunityNames(userId: string) {
  const tasks = await getAllTasks();
  const tasksWithCommunityNames = await Promise.all(
    tasks.map(async (task) => {
      const communityName = await getOrganizationTitle(task.organization_id);
      return { ...task, task_community_name: communityName };
    })
  );
  return tasksWithCommunityNames;
}
