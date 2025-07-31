import { useState } from "react";
import { ChatMessage } from "@/features/chat/types";
import { sendChatMessage } from "@/features/chat/services/chatService";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (userMessage: string) => {
    const newMessage: ChatMessage = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, newMessage]);
    setIsLoading(true);

    const response = await sendChatMessage([...messages, newMessage]);
    setMessages((prev) => [...prev, { 
      role: "assistant", 
      content: response.content, 
      sources: response.sources 
    }]);

    setIsLoading(false);
  };

  return { messages, sendMessage, isLoading };
}
