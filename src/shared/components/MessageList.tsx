import Message from "@/features/chat/components/Message";
import { ChatMessage } from "@/features/chat/types";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useAuthStore } from "@/features/auth/store/useAuthStore";

interface MessageListProps {
    messages: ChatMessage[];
    isLoading: boolean;
}

export default function MessageList({ messages, isLoading }: MessageListProps) {
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const isEmpty = messages.length === 0;

    return (
        <div className="flex-1 overflow-y-auto px-4 space-y-4 custom-scrollbar">
            {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                    <Image 
                        src="/favicon.png"
                        alt="Mobivisor Logo"
                        width={100}
                        height={40}
                        priority
                    />

                    <h1 className="mt-5 text-3xl font-extrabold text-white">
                        What can I help with?
                    </h1>
                </div>
            ) : (
                <>
                    <div className="space-y-4 mt-2">
                        {messages.map((message, index) => (
                            <Message key={index} role={message.role} content={message.content} sources={message.sources} />
                        ))}
                        {isLoading && <p className="text-gray-400 text-sm italic">Thinking...</p>}
                        <div ref={bottomRef} />
                    </div>
                </>
            )}
        </div>
    )
}