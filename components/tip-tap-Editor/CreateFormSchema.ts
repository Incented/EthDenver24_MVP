import * as z from "zod";

export const createFormSchema = z.object({
  community: z
    .string({
      required_error: "community is required",
    })
    .trim(),

  taskTitle: z.string({
    required_error: "Task Title is required",
  }),
  taskDescription: z.string({
    required_error: "description is required",
  }),
  taskType: z.string({
    required_error: "Task type is required",
  }),
  reward: z.string({
    required_error: "Reward is required",
  }),
  effort: z.string({
    required_error: "Effort is required",
  }),
  image: z.string().optional(),
  attchament: z.string().optional(),
});
