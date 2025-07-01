import { z } from "zod";

export const registerSchema = z.object({
    userName: z
        .string()
        .min(1, { message: "Username is required" }),
    email: z
        .string()
        .email({ message: "Please enter a valid email" }),
    password: z
        .string()
        .min(3, { message: "Password must be at least 3 character"}),
    rePassword: z.string(),
})
.refine((data) => data.password === data.rePassword, {
    message: "Password does not match",
    path: ["rePassword"],
})

export type RegisterFormData = z.infer<typeof registerSchema>;