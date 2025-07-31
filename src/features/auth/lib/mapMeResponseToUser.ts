import { MeResponse } from "@/features/auth/types";
import { User, UserRole } from "@/shared/types/user";

export function mapMeResponseToUser(data: MeResponse): User {
    return {
        uuid: data.uuid, 
        authUuid: data.authUuid, 
        email: data.email, 
        role: data.role as UserRole, 
        name: data.name, 
        phone: data.phone,
        avatar: data.avatar, 
    };
}