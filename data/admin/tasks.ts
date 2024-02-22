"use server";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { revalidatePath } from "next/cache";

export const freezeTaskAction = async (task_id: string) => {
  const { error: freezed } = await supabaseAdminClient
    .from("tasks")
    .update({ task_status: "freezed" })
    .eq("id", task_id);

  const { error } = await supabaseAdminClient
    .from("freezed_tasks")
    .insert({ task_id });

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/tasks/${task_id}`);
};

export const checkIfTaskIsFreezed = async (task_id: string) => {
  const { data: freezed_tasks, error } = await supabaseAdminClient
    .from("freezed_tasks")
    .select("*")
    .eq("task_id", task_id);

  if (error) {
    throw error;
  }

  return freezed_tasks !== null;
};
