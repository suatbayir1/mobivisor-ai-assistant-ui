export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    CUSTOMER = "CUSTOMER",
    SALES = "SALES",
    ENGINEER = "ENGINEER"
}

export interface User {
    uuid: string | null;
    authUuid: string | null;
    email: string;
    role: UserRole;
    name: string | null;
    phone: string | null;
    avatar: string | null;
}