import { z } from "zod";

const socialMediaType = z.enum([
  "website",
  "facebook",
  "twitter",
  "linkedin",
  "instagram",
  "youtube",
]);

const socialLinkSchema = z.object({
  type: socialMediaType,
  url: z.string().url("Please enter a valid URL.").or(z.literal("")).optional(),
});

export type SocialLinkSchema = z.infer<typeof socialLinkSchema>;

export const basicGrantDetailsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long."),
  pool: z.number().min(0.01, "Grant pool must be at least 0.01"),
  slash_percentage: z.number().min(0, "Slash percentage must be at least 0"),
  socialLinks: z.array(socialLinkSchema).optional(),
  avatarUrl: z.string().url().or(z.literal("")),
});

export type BasicGrantDetailsSchema = z.infer<typeof basicGrantDetailsSchema>;

export const grantRewardsSettingsSchema = z.object({
  proposalReward: z
    .number()
    .min(0, "Proposal reward must be between 0 and 100%.")
    .max(100, "Proposal reward must be between 0 and 100%."),
  prioritizationReward: z
    .number()
    .min(0, "Prioritization reward must be between 0 and 100%")
    .max(100, "Prioritization reward must be between 0 and 100%"),
  validationReward: z
    .number()
    .min(0, "Validation reward must be between 0 and 100%")
    .max(100, "Validation reward must be between 0 and 100%"),
  claimStakeAmount: z
    .number()
    .min(0, "Claim stake amount must be between 0 and 100%")
    .max(100, "Claim stake amount must be between 0 and 100%")
    .optional(),
});

export type GrantRewardSettingsSchema = z.infer<
  typeof grantRewardsSettingsSchema
>;

export const grantProtocolConfigurationSchema = z.object({
  prioritizationQourum: z
    .number()
    .int()
    .min(0, "Prioritization qourum must be min of 0"),
  validationQuorum: z
    .number()
    .int()
    .min(0, "Validation qourum must be min of 0"),
  prioritizationPeriod: z
    .number()
    .int()
    .min(0, "Prioritization period must be a number"),
  contributionPeriod: z
    .number()
    .int()
    .min(0, "Contribution period must be a number"),
  validationPeriod: z
    .number()
    .int()
    .min(0, "Validation period must be a number"),
});

export type GrantProtocolConfigurationSchema = z.infer<
  typeof grantProtocolConfigurationSchema
>;

export const grantPrivilegesSchema = z.object({
  isValidForAdmin: z.boolean().default(false),
  isValidForMembers: z.boolean().default(false),
  isValidForVetoPower: z.boolean().default(false),
});

export const GrantLiveStatusEnum = z.enum(["live", "testnet"]);

export const GrantTokenEnum = z.enum(["carrot", "token_1"]);

export const grantCarrotPotSchema = z.object({
  grant_live_status: GrantLiveStatusEnum,
  grant_token: GrantTokenEnum,
  // carrot_pot_address: z
  //   .string()
  //   .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid address.")
  //   .optional()
  //   .transform((val) => (val === "" ? undefined : val)),
});

export type GrantCarrotPotSchema = z.infer<typeof grantCarrotPotSchema>;

export const grantAdminSettingsSchema = z.object({
  changeProtocolSettings: grantPrivilegesSchema,
  grantSpecificSettings: grantPrivilegesSchema,
  inviteOtherUsers: grantPrivilegesSchema,
  approveMembersJoinRequest: grantPrivilegesSchema,
  approveTaskProposal: grantPrivilegesSchema,
  assignInitialMemberRolesAndPermissions: grantPrivilegesSchema,
  addOrRemoveMembers: grantPrivilegesSchema,
  manageTaskSettings: grantPrivilegesSchema,
  overseeCarrotDistribution: grantPrivilegesSchema,
  vetoInappropriateTasks: grantPrivilegesSchema,
  viewOngoingTasks: grantPrivilegesSchema,
  reviewGrantPerformance: grantPrivilegesSchema,
  postOnTaskDiscussion: grantPrivilegesSchema,
  takesCarrotsToPrioritizeTasks: grantPrivilegesSchema,
  proposeNewTasks: grantPrivilegesSchema,
  contributeToTasks: grantPrivilegesSchema,
  participateInTaskValidation: grantPrivilegesSchema,
  trackRewards: grantPrivilegesSchema,
  adjustPersonalSettings: grantPrivilegesSchema,
});

export type GrantAdminSettingsSchema = z.infer<typeof grantAdminSettingsSchema>;

export const grantGeneralDetailsSchema = basicGrantDetailsSchema
  .merge(grantRewardsSettingsSchema)
  .merge(grantProtocolConfigurationSchema);

export type GrantGeneralDetailsSchema = z.infer<
  typeof grantGeneralDetailsSchema
>;

export const grantPrivateDetailsSchema =
  grantAdminSettingsSchema.merge(grantCarrotPotSchema);

export type GrantPrivateDetailsSchema = z.infer<
  typeof grantPrivateDetailsSchema
>;

export const createGrantSchema = basicGrantDetailsSchema
  .merge(grantRewardsSettingsSchema)
  .merge(grantProtocolConfigurationSchema)
  .merge(grantAdminSettingsSchema)
  .merge(grantCarrotPotSchema);

export type CreateGrantSchema = z.infer<typeof createGrantSchema>;
