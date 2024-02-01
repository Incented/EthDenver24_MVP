import { z } from "zod";

export const basicCommunityDetailsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long."),
  website: z.string().url("Please enter a valid URL.").or(z.literal("")),
  facebook: z.string().url("Please enter a valid URL.").or(z.literal("")),
  twitter: z.string().url("Please enter a valid URL.").or(z.literal("")),
  linkedin: z.string().url("Please enter a valid URL.").or(z.literal("")),
  instagram: z.string().url("Please enter a valid URL.").or(z.literal("")),
  youtube: z.string().url("Please enter a valid URL.").or(z.literal("")),
  // avatarUrl: z.string().url().or(z.literal("")),
});

export type BasicCommunityDetailsSchema = z.infer<
  typeof basicCommunityDetailsSchema
>;

export const rewardSettingsSchema = z.object({
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

export type RewardSettingsSchema = z.infer<typeof rewardSettingsSchema>;

export const protocolConfigurationSchema = z.object({
  prioritizationQourum: z
    .number()
    .int()
    .min(0, "Prioritization qourum must be min of 0")
    .nullable(),
  validationQuorum: z
    .number()
    .int()
    .min(0, "Validation qourum must be min of 0")
    .nullable(),
  prioritizationPeriod: z
    .number()
    .int()
    .min(0, "Prioritization period must be between 0 and 30")
    .max(30)
    .nullable(),
  contributionPeriod: z
    .number()
    .int()
    .min(0, "Contribution period must be between 0 and 30")
    .max(30)
    .nullable(),
  validationPeriod: z
    .number()
    .int()
    .min(0, "Validation period must be between 0 and 30")
    .max(30)
    .nullable(),
});

export type Periods = {
  prioritizationPeriod: number;
  contributionPeriod: number;
  validationPeriod: number;
};

export type CommunityUrls = {
  website: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  youtube: string;
};

export type ProtocolConfigurationSchema = z.infer<
  typeof protocolConfigurationSchema
>;

export const privilegesSchema = z.object({
  isValidForAdmin: z.boolean().default(false),
  isValidForMembers: z.boolean().default(false),
  isValidForVetoPower: z.boolean().default(false),
});

export const adminSettingsSchema = z.object({
  communitySpecificSettings: privilegesSchema,
  inviteOtherUsers: privilegesSchema,
  approveMembersJoinRequest: privilegesSchema,
  approveTaskProposal: privilegesSchema,
  assignInitialMemberRolesAndPermissions: privilegesSchema,
  addOrRemoveMembers: privilegesSchema,
  manageTaskSettings: privilegesSchema,
  overseeCarrotDistribution: privilegesSchema,
  vetoInappropriateTasks: privilegesSchema,
  viewOngoingTasks: privilegesSchema,
  reviewCommunityPerformance: privilegesSchema,
  postOnTaskDiscussion: privilegesSchema,
  takesCarrotsToPrioritizeTasks: privilegesSchema,
  proposeNewTasks: privilegesSchema,
  contributeToTasks: privilegesSchema,
  participateInTaskValidation: privilegesSchema,
  trackRewards: privilegesSchema,
  adjustPersonalSettings: privilegesSchema,
});

export type AdminSettingsSchema = z.infer<typeof adminSettingsSchema>;

export const generalDetailsSchema = basicCommunityDetailsSchema
  .merge(protocolConfigurationSchema)
  .merge(rewardSettingsSchema);

export type GeneralDetailsSchema = z.infer<typeof generalDetailsSchema>;

export const createCommunitySchema = basicCommunityDetailsSchema
  .merge(rewardSettingsSchema)
  .merge(protocolConfigurationSchema)
  .merge(adminSettingsSchema);

export type CreateCommunitySchema = z.infer<typeof createCommunitySchema>;
