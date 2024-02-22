import * as z from "zod";

export const TaskType = z.enum([
  "software-dev",
  "hardware-dev",
  "legal",
  "marketing",
  "labor",
  "finance",
  "design",
  "manufacturing",
  "research",
  "communications",
  "interview",
  "translation",
  "writing",
  "data-analytics",
  "operations",
  "administrative",
  "planning",
  "construction",
  "other",
]);

export const TaskFileSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export const taskTypesSchema = z.array(TaskType);

export const createTaskFormSchema = z.object({
  community_id: z.string({
    required_error: "community is required",
  }),

  task_title: z.string({
    required_error: "Task Title is required",
  }),
  task_description: z
    .string({
      required_error: "description is required",
    })
    .trim(),
  task_types: taskTypesSchema.nonempty("Task types are required"),
  task_rewards: z
    .number()
    .min(0, "Rewards must be greater than 0")
    .max(100, "Rewards must be less than 100"),
  task_efforts: z.number(),
  task_files: z.array(TaskFileSchema).optional(), // Made optional and nullable
});

export type CreateTaskFormSchema = z.infer<typeof createTaskFormSchema>;
