"use server";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { updateGrantProjectStatusAction } from "../user/grant-projects";

const demoUserIds: string[] = [
  "ea405d02-7c1e-48c1-b6a8-34a05b0a76cb",
  "fb6d0808-e481-4746-8886-d199aff149b1",
  "86d65757-e1ee-4af1-9517-c30b4a7fec97",
  "bd186eff-0df1-402e-a75e-ffece606a47b",
  "43826c24-ca7e-41b9-87e5-bc327d139a31",
  "7e744376-de24-4e40-bc7f-d9216fd8c352",
];

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

export async function demoMakeDemoUsersPrioritizeNewTasks() {
  try {
    // Fetch all tasks with the status "new_task"
    const { data: newTasks, error: fetchError } = await supabaseAdminClient
      .from("tasks")
      .select("*")
      .eq("task_status", "new_task");

    if (fetchError) throw fetchError;

    // For each new task, prioritize it randomly by each demo user
    const prioritizationPromises = newTasks
      .map((task) =>
        demoUserIds.map((userId) =>
          prioritizeTaskAction({
            stakeAmount: getPrioritizationCount(),
            task_id: task.id,
            user_id: userId,
          })
        )
      )
      .flat(); // Flatten the array of arrays to get a single array of promises

    return Promise.allSettled(prioritizationPromises);
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

export async function demoMakeDemoUsersValidateContributionsForTasksWithContributions() {
  try {
    // Fetch all task_ids that have at least one contribution
    const { data: contributionTaskIds, error: contributionIdsError } =
      await supabaseAdminClient
        .from("contributions")
        .select("task_id")
        .not("task_id", "is", null);

    if (contributionIdsError) throw contributionIdsError;

    // Extract the task_ids from the contributions
    const taskIds = contributionTaskIds.map((c) => c.task_id);

    // Fetch all tasks that have at least one contribution using the 'in' method
    const { data: tasksWithContributions, error: tasksError } =
      await supabaseAdminClient.from("tasks").select("id").in("id", taskIds);

    if (tasksError) throw tasksError;

    // For each task, fetch its contributions and create validations
    const validationPromises = tasksWithContributions.map(async (task) => {
      // Fetch contributions for the current task
      const { data: contributions, error: contributionsError } =
        await supabaseAdminClient
          .from("contributions")
          .select("id")
          .eq("task_id", task.id);

      if (contributionsError) throw contributionsError;

      // Create a validation for each contribution
      return contributions.map((contribution) => {
        const randomUserId =
          demoUserIds[randomNumberBetween(0, demoUserIds.length - 1)];
        const randomValidationCount = randomNumberBetween(-100, 100);

        return validateContributionAction({
          contribution_id: contribution.id,
          validationCount: randomValidationCount,
          task_id: task.id,
          user_id: randomUserId,
        });
      });
    });

    // Flatten the array of arrays of promises and wait for all of them to settle
    const allValidations = (await Promise.all(validationPromises)).flat();
    return Promise.allSettled(allValidations);
  } catch (error) {
    console.error(error);
  }
}

export const demoUpdateProjectsStatusBasedOnQuorum = async () => {
  try {
    const projects = await getGrantApplicationsByStatus("prioritized");
    const promises = projects.map(async (project) => {
      const currentPrioritizationCount = await getCurrentPrioritizationCount(
        project.id
      );
      console.log("project", project.id, currentPrioritizationCount);

      if (
        currentPrioritizationCount >= project.prioritization_quorum_percentage
      ) {
        return await updateGrantProjectStatusAction({
          status: "project",
          grantProjectId: project.id,
        });
      }
    });

    return Promise.allSettled(promises);
  } catch (error) {
    console.error(error);
  }
  // return projects.map(async (project) => {
  //   const prioritizationQuorum = project.prioritization_quorum_percentage;
  //   const currentPrioritizationCount = await getCurrentPrioritizationCount(
  //     project.id
  //   );

  //   if (currentPrioritizationCount > prioritizationQuorum) {
  //     return await updateGrantProjectStatusAction({
  //       status: "project", // Assuming 'project' is a valid status in your Enum
  //       grantProjectId: project.id,
  //     });
  //   }
  // });
};

export const getGrantApplicationsByStatus = async (status: string) => {
  const { data, error } = await supabaseAdminClient
    .from("grant_applications")
    .select("*")
    .eq("grant_project_status", status);

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const getCurrentPrioritizationCount = async (projectId: string) => {
  const { data, error } = await supabaseAdminClient
    .from("grant_project_prioritizations")
    .select("count")
    .eq("id", projectId);

  if (error) {
    throw error;
  }

  let lowerPriority = 0;
  let higherPriority = 0;

  data.forEach((prioritization) => {
    if (prioritization.count < 0) {
      lowerPriority += Math.abs(prioritization.count);
    } else {
      higherPriority += prioritization.count;
    }
  });

  console.log("lowerPriority", lowerPriority);
  console.log("higherPriority", higherPriority);

  if (lowerPriority === 0) {
    return 100;
  }

  if (higherPriority === 0) {
    return 0;
  }

  let totalVotes = lowerPriority + higherPriority;
  let currentGrantPrioritizationQuorum = (higherPriority / totalVotes) * 100;

  return currentGrantPrioritizationQuorum;
};
