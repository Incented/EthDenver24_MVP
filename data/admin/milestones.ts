"use server";

import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { revalidatePath } from "next/cache";

export const freezeMilestoneAction = async (milestone_id: string) => {
  const { error: freezed } = await supabaseAdminClient
    .from("grant_project_milestones_2")
    .update({ grant_project_milestone_status: "freezed" })
    .eq("id", milestone_id);

  const { error } = await supabaseAdminClient
    .from("freezed_milestones")
    .insert({ milestone_id });

  if (error) {
    throw error;
  }

  revalidatePath(`/milestones/${milestone_id}`);
};
