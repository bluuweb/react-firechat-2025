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
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Esto hace que el error aparezca en el campo confirmPassword
  });

export type RegisterZodSchemaType = z.infer<typeof registerZodSchema>;

export const profileZodSchema = z.object({
  displayName: z
    .string()
    .min(1, "Display name is required")
    .max(50, "Display name must be at most 50 characters long"),
  photoURL: z.union([z.url("Invalid URL format"), z.literal("")]).optional(),
});

export type ProfileZodSchemaType = z.infer<typeof profileZodSchema>;

export const taskZodSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be at most 100 characters long"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters long")
    .optional(),
});

export type TaskZodSchemaType = z.infer<typeof taskZodSchema>;

export const messageZodSchema = z.object({
  text: z.string().trim().min(1, "Escriba algo por favor"),
});

export type MessageZodSchemType = z.infer<typeof messageZodSchema>;

export const emailFriendZodSchema = z.object({
  email: z.string().trim().pipe(z.email("Invalid email format")),
});

export type EmailFriendZodSchema = z.infer<typeof emailFriendZodSchema>;
