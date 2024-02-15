"use server";

import { CreateTaskFormSchema } from "@/app/(dynamic-pages)/(protected-pages)/dashboard/tasks/create-task/components/CreateTaskFormSchema";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { supabaseUserClientComponentClient } from "@/supabase-clients/user/supabaseUserClientComponentClient";
import { Enum, Table, TableInsertPayload } from "@/types";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { revalidatePath } from "next/cache";

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

  console.log("Task type created", data);
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

export const createDraftTaskAction = async ({
  community_id,
  task_title,
  task_description,
  task_rewards,
  task_efforts,
  task_files,
  task_types,
  task_status,
}: {
  community_id: string;
  task_title: string;
  task_description: string;
  task_rewards: number;
  task_efforts: number;
  task_files?: { name: string; url: string }[];
  task_types: {};
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
      files: JSON.stringify(task_files),
      task_types: JSON.stringify(task_types),
      task_status: task_status,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/tasks/${task.id}`);
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
