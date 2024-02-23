"use server";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";

const demoUserIds: string[] = ["4b00d162-60b2-4952-961d-a00f9f750b4f"];

function randomNumberBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getPrioritizationCount() {
  return randomNumberBetween(-100, 100);
}

export const prioritizeTaskAction = async ({
  stakeAmount,
  task_id,
  user_id,
}: {
  stakeAmount: number;
  task_id: string;
  user_id: string;
}) => {
  const { data: prioritizedTask, error } = await supabaseAdminClient
    .from("prioritizations")
    .insert({ count: stakeAmount, task_id, user_id });

  if (error) {
    throw error;
  }

  return prioritizedTask;
};

export async function demoMakeDemoUsersPrioritiseTask(taskId: string) {
  try {
    const promises = demoUserIds.map((userId) => {
      return prioritizeTaskAction({
        stakeAmount: getPrioritizationCount(),
        task_id: taskId,
        user_id: userId, // You need to modify prioritizeTaskAction to accept user_id
      });
    });

    return Promise.allSettled(promises);
  } catch (error) {
    console.error(error);
  }
}

export const validateContributionAction = async ({
  contribution_id,
  validationCount,
  task_id,
  user_id,
}: {
  contribution_id: string;
  validationCount: number;
  task_id: string;
  user_id: string;
}) => {
  const { data: validation, error } = await supabaseAdminClient
    .from("validations")
    .insert({
      contribution_id,
      count: validationCount,
      user_id,
      task_id,
      description: "This is a demo validation",
      files: [],
    });

  if (error) {
    throw error;
  }

  return validation;
};

export const getAllContributionsForTask = async (task_id: string) => {
  const { data: contributions, error } = await supabaseAdminClient
    .from("contributions")
    .select("*")
    .eq("task_id", task_id);

  if (error) {
    throw error;
  }

  return contributions;
};

export async function demoMakeDemoUsersValidateContributions(taskId: string) {
  try {
    const contributions = await getAllContributionsForTask(taskId);
    const promises = contributions.map((contribution) => {
      return validateContributionAction({
        contribution_id: contribution.id,
        validationCount: randomNumberBetween(-100, 100),
        task_id: taskId,
        user_id: demoUserIds[randomNumberBetween(0, demoUserIds.length - 1)],
      });
    });

    return Promise.allSettled(promises);
  } catch (error) {
    console.error(error);
  }
}
