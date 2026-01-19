import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required").max(100),
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 characters"),
});

export const resetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const newPasswordSchema = z.object({
  password: z.string().min(8, {
    message: "Minimum 8 characters used",
  }),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ResetInput = z.infer<typeof resetSchema>;
export type NewPasswordInput = z.infer<typeof newPasswordSchema>;
