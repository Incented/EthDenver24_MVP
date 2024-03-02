"use server";
import { supabaseAdminClient } from "@/supabase-clients/admin/supabaseAdminClient";
import { TableInsertPayload } from "@/types";
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

export const demoRevertProjectsStatusToNewApplication = async (
  grant_project_id: string
) => {
  try {
    const { data, error } = await supabaseAdminClient
      .from("grant_project_prioritizations")
      .delete()
      .eq("grant_project_id", grant_project_id);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

// export const resetGrantApplicationsForNextDemo = async () => {
//   const organizationId = "d28edab0-9b7d-4319-b37f-c8aaf57ce374";
//   const rowsToAdd: Array<TableInsertPayload<"grant_applications">> = [
//     {
//       name: "Sven needs money",
//       organization_id: organizationId,
//       project_status: "draft",
//       description: "<p>I am poor, please give me a grant</p>",
//       user_id: "37cd86de-8c19-4889-b0b9-224716e2174b",
//       files: [
//         {
//           url: "https://zrrvbemasvqppixraece.supabase.co/storage/v1/object/public/task-assets/download-(32).png",
//           name: "download (32).png",
//         },
//       ],
//       grant_project_types: ["compute-networks", "wallet", "synthetic-assets"],
//       is_grant_published: true,
//       grant_community: "",
//       new_grant_project_created_at: "2024-03-01 18:32:37.211+00",
//       grant_amount: 100000,
//       grant_project_status: "new_application",
//       prioritization_quorum_percentage: 41,
//     },
//     {
//       name: "This is the titlefkvadf;vj",
//       organization_id: organizationId,
//       project_status: "draft",
//       description: "This is the task description",
//       user_id: "37cd86de-8c19-4889-b0b9-224716e2174b",
//       files: [
//         {
//           url: "https://zrrvbemasvqppixraece.supabase.co/storage/v1/object/public/task-assets/410099074_750951666467604_7704977087930814188_n.jpg",
//           name: "410099074_750951666467604_7704977087930814188_n.jpg",
//         },
//       ],
//       grant_project_types: ["developer-tooling", "data"],
//       is_grant_published: true,
//       grant_community: "",
//       new_grant_project_created_at: "2024-03-01 20:58:59.738+00",
//       grant_amount: 10,
//       grant_project_status: "new_application",
//       prioritization_quorum_percentage: 41,
//     },
//     {
//       name: "This is the title",
//       organization_id: organizationId,
//       project_status: "draft",
//       description: "This is the task description",
//       user_id: "b8f746b2-bf09-4d6d-b20a-0fd0aa00f239",
//       files: [],
//       grant_project_types: ["compute-networks"],
//       is_grant_published: true,
//       grant_community: "",
//       new_grant_project_created_at: "2024-03-02 00:09:51.347+00",
//       grant_amount: 10,
//       grant_project_status: "new_application",
//       prioritization_quorum_percentage: 40,
//     },
//     {
//       name: "This is the title",
//       organization_id: organizationId,
//       project_status: "draft",
//       description: "This is the task description",
//       user_id: "37cd86de-8c19-4889-b0b9-224716e2174b",
//       files: [],
//       grant_project_types: ["compute-networks"],
//       is_grant_published: true,
//       grant_community: "",
//       new_grant_project_created_at: "2024-03-02 01:21:33.824+00",
//       grant_amount: 10,
//       grant_project_status: "new_application",
//       prioritization_quorum_percentage: 42,
//     },
//   ];

//   // delete all the grant applications in this organization

//   const { error } = await supabaseAdminClient
//     .from("grant_applications")
//     .delete()
//     .eq("organization_id", organizationId);

//   if (error) {
//     throw error;
//   }

//   // insert the new grant applications

//   const { data, error: insertError } = await supabaseAdminClient
//     .from("grant_applications")
//     .insert(rowsToAdd)
//     .select("id");

//   if (insertError) {
//     throw insertError;
//   }

//   return data;
// };

// Ensure this is the right data. The organization_id is different from the one in the original snippet
// Do not provide id, created_at, or updated_at as they are automatically generated

export const resetGrantApplicationsForNextDemo = async () => {
  const organizationId = "379f55af-2377-49c5-8203-600aabcc1cab";
  const rowsToAdd: Array<TableInsertPayload<"grant_applications">> = [
    {
      name: "Artium - NFT Marketplace on Arbitrum",
      organization_id: "379f55af-2377-49c5-8203-600aabcc1cab",
      project_status: "draft",
      description:
        "<p>Artium seeks to revolutionize the NFT marketplace on Arbitrum by offering low-cost minting, buying, and selling of NFTs. It will feature unique artist collaborations, community-driven collections, and seamless integration with the broader Arbitrum DeFi ecosystem.</p>",
      user_id: "37cd86de-8c19-4889-b0b9-224716e2174b",
      files: [
        {
          url: "https://zrrvbemasvqppixraece.supabase.co/storage/v1/object/public/task-assets/Screenshot-2024-03-02-002312.png",
          name: "Screenshot 2024-03-02 002312.png",
        },
      ],
      grant_project_types: ["marketplace"],
      is_grant_published: true,
      grant_community: "",
      new_grant_project_created_at: "2024-03-02 13:11:29.688+00",
      grant_amount: 160000,
      grant_project_status: "project",
      prioritization_quorum_percentage: 42,
    },
    {
      name: "ArbQuest - Adventure RPG on Arbitrum",
      organization_id: "379f55af-2377-49c5-8203-600aabcc1cab",
      project_status: "draft",
      description:
        "<p>ArbQuest is a blockchain-based RPG game that utilizes NFTs for characters, items, and lands. Players can explore, battle, and trade within an expansive universe, all while benefiting from Arbitrum's low-cost transactions.</p>",
      user_id: "37cd86de-8c19-4889-b0b9-224716e2174b",
      files: [
        {
          url: "https://zrrvbemasvqppixraece.supabase.co/storage/v1/object/public/task-assets/123.jpg",
          name: "123.jpg",
        },
      ],
      grant_project_types: ["compute-networks"],
      is_grant_published: true,
      grant_community: "",
      new_grant_project_created_at: "2024-03-02 07:42:57.503+00",
      grant_amount: 170000,
      grant_project_status: "new_application",
      prioritization_quorum_percentage: 42,
    },
    {
      name: "ArbiLend - Decentralized Lending and Borrowing",
      organization_id: "379f55af-2377-49c5-8203-600aabcc1cab",
      project_status: "draft",
      description:
        "<p>ArbiLend aims to become a leading decentralized finance (DeFi) platform on Arbitrum, offering secure and efficient lending and borrowing services. By utilizing Arbitrum's low transaction fees and high throughput, ArbiLend will offer competitive interest rates for lenders and borrowers across a variety of cryptocurrencies.</p>",
      user_id: "37cd86de-8c19-4889-b0b9-224716e2174b",
      files: [
        {
          url: "https://zrrvbemasvqppixraece.supabase.co/storage/v1/object/public/task-assets/Screenshot-2024-03-01-233858.png",
          name: "Screenshot 2024-03-01 233858.png",
        },
      ],
      grant_project_types: ["cryptocurrency", "financial-services"],
      is_grant_published: true,
      grant_community: "",
      new_grant_project_created_at: "2024-03-02 06:39:42.72+00",
      grant_amount: 180000,
      grant_project_status: "new_application",
      prioritization_quorum_percentage: 42,
    },
    {
      name: "Buidl Week Support",
      organization_id: "379f55af-2377-49c5-8203-600aabcc1cab",
      project_status: "draft",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      user_id: "7e744376-de24-4e40-bc7f-d9216fd8c352",
      files: [],
      grant_project_types: ["compute-networks"],
      is_grant_published: true,
      grant_community: "",
      new_grant_project_created_at: "2024-03-02 12:32:21.364+00",
      grant_amount: 10,
      grant_project_status: "new_application",
      prioritization_quorum_percentage: 42,
    },
  ];

  // delete all the grant applications in this organization

  const { error } = await supabaseAdminClient
    .from("grant_applications")
    .delete()
    .eq("organization_id", organizationId);

  if (error) {
    throw error;
  }

  // insert the new grant applications

  const { data, error: insertError } = await supabaseAdminClient
    .from("grant_applications")
    .insert(rowsToAdd)
    .select("id");

  if (insertError) {
    throw insertError;
  }

  return data;
};
