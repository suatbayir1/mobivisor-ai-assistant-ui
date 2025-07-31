"use client";

import { LoginFormData } from "@/features/auth/schemas/loginSchema";
import { apiFetch } from "@/shared/lib/fetcher";
import { SERVICE } from "@/shared/constants/service";
import { RegisterFormData } from "../schemas/registerSchema";
import { ApiResponse } from "@/shared/types/apiResponse";
import { MeResponse, RegisterResponse } from "@/features/auth/types";

export async function login(data: LoginFormData) {
    const res = await apiFetch<{ message: string; data: { accessToken: string; refreshToken: string } }>(
        SERVICE.AUTH,
        '/api/v1/auth/login', 
        {
            method: 'POST',
            json: data,
        }
    );

    return res.data;
}

export async function register(data: RegisterFormData) {
    return await apiFetch<ApiResponse<RegisterResponse>>(
        SERVICE.AUTH,
        '/api/v1/auth/register', {
            method: "POST",
            json: data,
        }
    );
}


export async function fetchMe() {
  return await apiFetch<ApiResponse<MeResponse>>(
    SERVICE.AUTH,
    '/api/v1/auth/me',
    { method: 'GET' }
  );
}