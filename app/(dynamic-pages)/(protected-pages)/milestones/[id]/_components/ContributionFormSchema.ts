import { z } from "zod";
import { TaskFileSchema } from "../../../dashboard/tasks/create-task/components/CreateTaskFormSchema";

export const contributionFormSchema = z.object({
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  links: z
    .array(
      z.object({
        link: z
          .string()
          .url({ message: "Please enter a valid URL." })
          .optional(),
      })
    )
    .optional(),
  contribution_files: z.array(TaskFileSchema).optional(), // Made optional and nullable
});

export const validationFormSchema = z.object({
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  count: z.number().min(0.01, "Count must be at least 0.01"), // Allow decimals with a minimum of 0.01
  actionType: z.enum(["validate", "invalidate"]),
  validation_files: z.array(TaskFileSchema).optional(), // Made optional and nullable
});

export type ContributionFormSchema = z.infer<typeof contributionFormSchema>;
export type ValidationFormSchema = z.infer<typeof validationFormSchema>;
