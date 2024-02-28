import * as z from "zod";

export const GrantProjectTypeSlug = z.enum([
  "compute-networks",
  "cryptocurrency",
  "data",
  "developer-tooling",
  "entertainment",
  "financial-services",
  "governance",
  "marketplace",
  "metaverse-gaming",
  "mining-validation",
  "network",
  "news-info",
  "physical-infrastructure-networks",
  "security",
  "synthetic-assets",
  "wallet",
  "other",
]);

export const GrantApplicationFileSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export const grantProjectTypesSchema = z.array(GrantProjectTypeSlug);

export const createMilestoneForGrantSchema = z.object({
  grant_project_id: z.string({
    required_error: "Grant project ID is required",
  }),
  milestone_title: z.string({
    required_error: "Milestone title is required",
  }),
  milestone_description: z.string({
    required_error: "Milestone description is required",
  }),
  milestone_effort: z.number().min(1, "Effort must be at least 1 day"),
  milestone_budget: z.number().min(1, "Amount must be at least 1 dollar"),
});

export type CreateMilestoneForGrantSchema = z.infer<
  typeof createMilestoneForGrantSchema
>;

export const basicGrantApplicationFormSchema = z.object({
  grant_project_title: z.string({
    required_error: "Grant Title is required",
  }),
  grant_project_summary: z
    .string({
      required_error: "description is required",
    })
    .trim(),
  grant_project_types: grantProjectTypesSchema.nonempty(
    "Project types are required"
  ),
  grant_project_amount: z.number().min(0.01, "Amount must be at least 0.01"),
  grant_project_files: z.array(GrantApplicationFileSchema).optional(), // Made optional and nullable
});

export type BasicGrantApplicationFormSchema = z.infer<
  typeof basicGrantApplicationFormSchema
>;

export const createGrantApplicationFormSchema = z.object({
  ...basicGrantApplicationFormSchema.shape,
  grant_milestones: z.array(createMilestoneForGrantSchema),
});

export type CreateGrantApplicationFormSchema = z.infer<
  typeof createGrantApplicationFormSchema
>;
