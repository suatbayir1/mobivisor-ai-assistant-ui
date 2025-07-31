'use client';

import { useEffect, useState } from "react";
import { ChatMessage } from "@/features/chat/types";
import { apiFetch } from "@/shared/lib/fetcher";
import { SERVICE } from "@/shared/constants/service";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

export function useChatMessages(chatUuid: string | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatUuid || !user?.uuid) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await apiFetch<{
          message: string;
          data: ChatMessage[];
        }>(
          SERVICE.CHAT_HISTORY,
          `/api/v1/chats/get/${chatUuid}`,
          {
            method: "POST",
            json: {
              userUuid: user.uuid,
            },
          }
        );

        setMessages(response.data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch chat messages";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, [chatUuid, user?.uuid]);

  return { messages, isLoading, error };
}
