import { UserRole } from "@/shared/types/user";

export interface MeResponse {
    uuid: string | null;
    authUuid: string | null;
    userName: string;
    email: string;
    role: "USER" | "ADMIN" | string;
    name: string | null;
    phone: string | null;
    avatar: string | null;
}

export interface RegisterResponse {
    uuid: string | null,
    userName: string,
    email: string,
    role: UserRole
}