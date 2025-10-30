import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be longer than 6 characters")
    .max(255, "Password is too long!"),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(255, "Username is too long!"),
  email: z.email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be longer than 6 characters")
    .max(255, "Password is too long"),
});

export type RegisterData = z.infer<typeof registerSchema>;
