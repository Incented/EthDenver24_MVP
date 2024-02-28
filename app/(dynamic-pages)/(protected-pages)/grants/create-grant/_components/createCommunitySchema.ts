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

export const basicCommunityDetailsSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long."),
  socialLinks: z.array(socialLinkSchema).optional(),
  avatarUrl: z.string().url().or(z.literal("")),
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
    .min(0, "Prioritization period must be a number")
    .nullable(),
  contributionPeriod: z
    .number()
    .int()
    .min(0, "Contribution period must be a number")
    .nullable(),
  validationPeriod: z
    .number()
    .int()
    .min(0, "Validation period must be a number")
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

export const communityLiveStatusEnum = z.enum(["live", "testnet"]);

export const communityTokenEnum = z.enum(["carrot", "token_1"]);

export const carrotPotSchema = z.object({
  community_live_status: communityLiveStatusEnum,
  community_token: communityTokenEnum,
  // carrot_pot_address: z
  //   .string()
  //   .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid address.")
  //   .optional()
  //   .transform((val) => (val === "" ? undefined : val)),
});

export type CarrotPotSchema = z.infer<typeof carrotPotSchema>;

export const adminSettingsSchema = z.object({
  changeProtocolSettings: privilegesSchema,
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
  .merge(rewardSettingsSchema)
  .merge(protocolConfigurationSchema);

export type GeneralDetailsSchema = z.infer<typeof generalDetailsSchema>;

export const privateDetailsSchema = adminSettingsSchema.merge(carrotPotSchema);

export type PrivateDetailsSchema = z.infer<typeof privateDetailsSchema>;

export const createCommunitySchema = basicCommunityDetailsSchema
  .merge(rewardSettingsSchema)
  .merge(protocolConfigurationSchema)
  .merge(adminSettingsSchema)
  .merge(carrotPotSchema);

export type CreateCommunitySchema = z.infer<typeof createCommunitySchema>;
