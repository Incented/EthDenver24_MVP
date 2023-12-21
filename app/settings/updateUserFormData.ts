import * as z from "zod";

export const updateUserFormSchema = z.object({
  firstName: z.string({
    required_error: "Full name is required",
  }),

  lastName: z.string({
    required_error: "Phone number is required",
  }),
  userName: z.string({
    required_error: "Country is required",
  }),
  email: z.string({
    required_error: "Email is required",
  }),
  image: z.string().optional(),
});
