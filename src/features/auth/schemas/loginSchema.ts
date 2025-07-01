import { z } from "zod";

export const loginSchema = z.object({
    userName: z
        .string()
        .min(1, {message: "Username is required"}),
    password: z
        .string()
        .min(3, {message: "Password must be at least 3 characters"})
});

export type LoginFormData = z.infer<typeof loginSchema>;