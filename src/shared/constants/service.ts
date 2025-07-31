export const SERVICE = {
    AUTH: "auth",
    USER: "user",
    CHAT: "chat",
    CHAT_HISTORY: "chat_history",
} as const;

export type ApiService = (typeof SERVICE)[keyof typeof SERVICE];

export const SERVICE_BASE_URLS: Record<ApiService, string> = {
    [SERVICE.AUTH]: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL!,
    [SERVICE.USER]: process.env.NEXT_PUBLIC_USER_API_BASE_URL!,
    [SERVICE.CHAT]: process.env.NEXT_PUBLIC_CHAT_API_BASE_URL!,
    [SERVICE.CHAT_HISTORY]: process.env.NEXT_PUBLIC_CHAT_HISTORY_API_BASE_URL!,
}