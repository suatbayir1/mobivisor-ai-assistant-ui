import { ChatMessage, Source } from "@/features/chat/types";
import { SERVICE } from "@/shared/constants/service";
import { apiFetch } from "@/shared/lib/fetcher";

export async function sendChatMessage(messages: ChatMessage[]): Promise<Omit<ChatMessage, 'role'>> {
  const lastUserMessage: ChatMessage = messages[messages.length - 1];

  const payload = {
    query: lastUserMessage.content,
    top_k: 5,
    collection: "mobivisor",
  };

  const data = await apiFetch<{ response: string; sources: Source[] }>(
    SERVICE.CHAT,
    '/api/v1/document/query',
    {
      method: 'POST',
      json: payload,
    }
  );

  return {
    content: data.response || "No response.",
    sources: data.sources || [],
  }
}
