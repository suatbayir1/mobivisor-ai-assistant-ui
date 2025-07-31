import { apiFetch } from "@/shared/lib/fetcher";
import { SERVICE } from "@/shared/constants/service";

export async function saveChatMessage(chatUuid: string, content: string, sender: string) {
  await apiFetch(
    SERVICE.CHAT_HISTORY,
    `/api/v1/messages/create`,
    {
      method: 'POST',
      json: {
        chatUuid,
        content,
        sender,
      },
    }
  );
}
