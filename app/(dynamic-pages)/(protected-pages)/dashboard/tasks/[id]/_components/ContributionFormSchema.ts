import { z } from "zod";
import { TaskFileSchema } from "../../create-task/components/CreateTaskFormSchema";

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

export type ContributionFormSchema = z.infer<typeof contributionFormSchema>;
