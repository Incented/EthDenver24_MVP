"use server";
import { CreateMilestoneForGrantSchema } from "@/app/(dynamic-pages)/(protected-pages)/grants/[id]/submit-application/components/CreateGrantApplicationFormSchema";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import { Enum, TableInsertPayload } from "@/types";
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

  return data ?? [];
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
  grant_milestones,
}: {
  grant_program_id: string;
  grant_project_title: string;
  grant_project_summary: string;
  grant_amount: number;
  grant_project_files?: { name: string; url: string }[];
  grant_project_types: {};
  is_grant_published: boolean;
  grant_project_status: Enum<"grant_project_status">;
  grant_milestones: CreateMilestoneForGrantSchema[];
}) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerActionClient();
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
    .select("id")
    .single();

  if (error) {
    throw error;
  }

  const milestones: TableInsertPayload<"grant_project_milestones">[] =
    grant_milestones.map((milestone) => ({
      grant_project_id: grantApplication.id,
      title: milestone.milestone_title,
      description: milestone.milestone_description,
      effort: milestone.milestone_effort,
      budget: milestone.milestone_budget,
    }));

  await createMilestonesForGrantProject(milestones);

  return grantApplication.id;
};

export const createMilestonesForGrantProject = async (
  milestones: TableInsertPayload<"grant_project_milestones">[]
) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { error } = await supabaseClient
    .from("grant_project_milestones")
    .insert(milestones);

  if (error) {
    throw error;
  }

  return null;
};

export const getGrantProjectById = async (grantId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data: grant, error } = await supabase
    .from("grant_applications")
    .select("*")
    .eq("id", grantId)
    .single();

  if (error) {
    throw error;
  }

  return grant;
};

export const getGrantProjectPrioritizations = async (grantId: string) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("grant_project_prioritizations")
    .select("*")
    .eq("grant_project_id", grantId);

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const publishGrantAction = async (id: string) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const currentTime = new Date().toISOString();
  const { error } = await supabaseClient
    .from("grant_applications")
    .update({
      is_grant_published: true,
      new_task_created_at: currentTime,
      grant_project_status: "new_application",
    })
    .eq("id", id);

  if (error) {
    throw error;
  }

  revalidatePath(`/grant-applications/${id}`);
  return null;
};

export const updateGrantProjectStatusAction = async ({
  status,
  grantProjectId,
}: {
  status: Enum<"grant_project_status">;
  grantProjectId: string;
}) => {
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { error } = await supabaseClient
    .from("grant_applications")
    .update({ grant_project_status: status })
    .eq("id", grantProjectId)
    .single();

  if (error) {
    throw error;
  }

  revalidatePath(`/grant-applications/${grantProjectId}`);
};

export const getAllMilestonesForGrantProject = async (
  grantProjectId: string
) => {
  const supabase = createSupabaseUserServerComponentClient();
  const { data, error } = await supabase
    .from("grant_project_milestones")
    .select("*")
    .eq("grant_project_id", grantProjectId);

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const prioritizeGrantProjectAction = async ({
  stakeAmount,
  grantProjectId,
}: {
  stakeAmount: number;
  grantProjectId: string;
}) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data: prioritizedTask, error } = await supabaseClient
    .from("grant_project_prioritizations")
    .insert({
      count: stakeAmount,
      grant_project_id: grantProjectId,
      user_id: user.id,
    });

  if (error) {
    throw error;
  }

  revalidatePath(`/dashboard/tasks/${grantProjectId}`);
  return prioritizedTask;
};

export const checkIfUserPrioritizedGrantProject = async (
  grantProjectId: string
) => {
  const user = await serverGetLoggedInUser();
  const supabaseClient = createSupabaseUserServerComponentClient();
  const { data, error } = await supabaseClient
    .from("grant_project_prioritizations")
    .select("*")
    .eq("user_id", user.id)
    .eq("grant_project_id", grantProjectId);

  if (error) {
    throw error;
  }

  return data.length > 0;
};
