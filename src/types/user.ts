import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .email({ message: "Must be a valid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(8, "Password must be at least 8 characters"),
  name: z
    .string({ message: "Name is required" })
    .min(1, "Name cannot be empty")
    .max(100, "Name must be 100 characters or less"),
});

export const loginSchema = z.object({
  email: z
    .email({ message: "Must be a valid email address" }),
  password: z
    .string({ message: "Password is required" })
    .min(1, "Password is required"),
}); 

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}