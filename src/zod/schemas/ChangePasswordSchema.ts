import { z } from "zod";

export const ChangePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Password must have at least 8 characters" })
      .max(64, { message: "Password is too long" }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

export type ChangePasswordSchemaType = z.infer<typeof ChangePasswordSchema>;
