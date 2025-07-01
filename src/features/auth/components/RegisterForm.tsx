"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/features/auth/schemas/registerSchema";
import { register as registerUser } from "@/features/auth/services/authService";
import { toast } from "sonner";

export default function RegisterForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setLoading(true);
        try {
            const res = await registerUser(data);
            toast.success(res.message);
            router.push("/auth/login");
        } catch (err: any) {
            toast.error(err.message || "Register failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#2a2a2d] p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
            >
                <h1 className="text-xl font-semibold text-center">Register Page</h1>

                <div>
                    <label className="block text-sm font-medium">Username</label>
                    <input
                        {...register("userName")}
                        className="w-full bg-[#1e1e20] border border-gray-600 px-3 py-2 rounded mt-1 placeholder-gray-400"
                        placeholder="username"
                    />
                    {errors.userName && <p className="text-red-500 text-xs mt-1">{errors.userName.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">E-mail</label>
                    <input
                        {...register("email")}
                        className="w-full bg-[#1e1e20] border border-gray-600 px-3 py-2 rounded mt-1 placeholder-gray-400"
                        placeholder="example@mail.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        {...register("password")}
                        className="w-full bg-[#1e1e20] border border-gray-600 px-3 py-2 rounded mt-1 placeholder-gray-400"
                        placeholder="••••••••"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Confirm Password</label>
                    <input
                        type="password"
                        {...register("rePassword")}
                        className="w-full bg-[#1e1e20] border border-gray-600 px-3 py-2 rounded mt-1 placeholder-gray-400"
                        placeholder="••••••••"
                    />
                    {errors.rePassword && (
                        <p className="text-red-500 text-xs mt-1">{errors.rePassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-[#F7941D] hover:bg-[#e07c00] text-white py-2 rounded disabled:opacity-50 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>

            <div className="mt-4 text-center text-gray-400">
                <span>Have an account?  </span>
                <button
                    className="text-[#F7941D] font-semibold hover:underline cursor-pointer"
                    onClick={() => router.push("/auth/login")}
                >
                    Log in
                </button>
            </div>
        </>
    );
}