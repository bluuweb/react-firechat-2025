import { z } from "zod";

export const loginZodSchema = z.object({
  email: z.string().trim().pipe(z.email("Invalid email format")),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type LoginZodSchemaType = z.infer<typeof loginZodSchema>;

export const registerZodSchema = z
  .object({
    email: z.string().trim().pipe(z.email()),
    displayName: z
      .string()
      .min(1, "Display name is required")
      .max(50, "Display name must be at most 50 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Esto hace que el error aparezca en el campo confirmPassword
  });

export type RegisterZodSchemaType = z.infer<typeof registerZodSchema>;
