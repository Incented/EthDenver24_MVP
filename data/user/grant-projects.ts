import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { Enum } from "@/types";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import { revalidatePath } from "next/cache";

export const getAllNamesOfGrantProjectTypes = async () => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("grant_project_all_types")
    .select("name, id, slug");

  if (error) {
    throw error;
  }

  return data;
};

export const createGrantApplicationAction = async ({
  grant_program_id,
  grant_project_title,
  grant_project_summary,
  grant_amount,
  grant_project_files,
  grant_project_types,
  is_grant_published,
  grant_project_status,
}: {
  grant_program_id: string;
  grant_project_title: string;
  grant_project_summary: string;
  grant_amount: number;
  grant_project_files?: { name: string; url: string }[];
  grant_project_types: {};
  is_grant_published: boolean;
  grant_project_status: Enum<"grant_project_status">;
}) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: grantApplication, error } = await supabaseClient
    .from("grant_applications")
    .insert({
      organization_id: grant_program_id,
      user_id: user.id,
      name: grant_project_title,
      description: grant_project_summary,
      grant_amount: grant_amount,
      files: grant_project_files,
      grant_project_types: grant_project_types,
      grant_project_status: grant_project_status,
      is_grant_published: is_grant_published,
      new_grant_project_created_at: new Date().toISOString(),
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/grants/${grantApplication.id}`);
  return grantApplication;
};

export const createMilestoneForGrantProject = async ({
  grant_project_id,
  milestone_title,
  milestone_description,
  milestone_effort,
  milestone_budget,
}: {
  grant_project_id: string;
  milestone_title: string;
  milestone_description: string;
  milestone_effort: number;
  milestone_budget: number;
}) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: milestone, error } = await supabaseClient
    .from("grant_project_milestones")
    .insert({
      grant_project_id: grant_project_id,
      title: milestone_title,
      description: milestone_description,
      effort: milestone_effort,
      budget: milestone_budget,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/grants/${milestone.id}`);
  return milestone;
};
