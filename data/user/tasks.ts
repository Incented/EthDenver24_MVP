"use server";

import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { supabaseUserClientComponentClient } from "@/supabase-clients/user/supabaseUserClientComponentClient";
import { Table, TableInsertPayload } from "@/types";
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
  const { data, error } = await supabase.from("task_types").select("name");

  if (error) {
    throw error;
  }

  return data;
};
