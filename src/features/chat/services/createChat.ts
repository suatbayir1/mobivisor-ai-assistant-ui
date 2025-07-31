import { apiFetch } from "@/shared/lib/fetcher";
import { SERVICE } from "@/shared/constants/service";

type CreateChatResponse = {
  message: string;
  data: {
    uuid: string;
    title: string;
    createdAt: string;
  };
};

export async function createChat(userUuid: string, title: string): Promise<CreateChatResponse["data"]> {
  const response = await apiFetch<CreateChatResponse>(
    SERVICE.CHAT_HISTORY,
    "/api/v1/chats/create",
    {
      method: "POST",
      json: {
        userUuid,
        title,
      },
    }
  );

  return response.data;
}
