import { z } from "zod";

export const primaryUserDetailsSchema = z.object({
  firstName: z
    .string()
    .min(3, "First name must be at least 3 characters long."),
  lastName: z.string().min(3, "Last name must be at least 3 characters long."),
  avatarUrl: z.string().url().or(z.literal("")).optional(),
  fullName: z.string().optional(),
  username: z.string().min(3, "Username must be at least 3 characters long."),
});

export type PrimaryUserDetailsSchema = z.infer<typeof primaryUserDetailsSchema>;
