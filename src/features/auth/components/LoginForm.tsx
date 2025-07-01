"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginFormData } from "@/features/auth/schemas/loginSchema";
import { fetchMe, login } from "@/features/auth/services/authService";
import FormError from "@/shared/ui/form-error";
import Label from "@/shared/ui/label";
import Input from "@/shared/ui/input";
import Button from "@/shared/ui/button";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "sonner";
import { mapMeResponseToUser } from "@/features/auth/lib/mapMeResponseToUser";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const setToken = useAuthStore((s) => s.setToken);
    const setUser = useAuthStore((s) => s.setUser);

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        try {
            const res = await login(data);
            setToken(res.accessToken);

            const me = await fetchMe();
            setUser(mapMeResponseToUser(me.data));

            router.push("/chat");
        } catch(err: any) {
            toast.error(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <form 
                onSubmit={handleSubmit(onSubmit)}
                className="bg-[#2a2a2d] p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
            >
                <h1 className="text-2xl font-semibold text-center">Login Page</h1>

                <div>
                    <Label htmlFor="userName">Username</Label>
                    <Input
                        id="userName"
                        placeholder="username"
                        {...register("userName")}
                    />
                    <FormError message={errors.userName?.message} />
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        {...register("password")}
                    />
                    <FormError message={errors.password?.message} />
                </div>

                <Button type="submit" disabled={loading}>
                    {loading ? "Login..." : "Login"}
                </Button>
            </form>

            <div className="mt-4 text-center text-gray-400">
                <span>Don't have an account?  </span>
                <button
                    className="text-[#F7941D] font-semibold hover:underline cursor-pointer"
                    onClick={() => router.push("/auth/register")}
                >
                    Create an account
                </button>
            </div>
        </>
    )
}