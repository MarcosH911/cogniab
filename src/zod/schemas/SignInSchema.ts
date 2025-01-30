import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" })
    .max(64, { message: "Email is too long" }),

  password: z
    .string()
    .min(1, { message: "Password is required" })
    .max(64, { message: "Password is too long" }),
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;
