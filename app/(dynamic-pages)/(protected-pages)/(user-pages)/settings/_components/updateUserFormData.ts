import * as z from "zod";

export const updateUserFormSchema = z.object({
  firstName: z.string({
    required_error: "Full name is required",
  }),

  lastName: z.string({
    required_error: "Last name is required",
  }),
  userName: z.string().refine((value) => !value.includes(" "), {
    message: "Username must not contain spaces",
  }),
  email: z.string().email({ message: "Please enter a valid email" }),
  image: z.string().optional(),
});
