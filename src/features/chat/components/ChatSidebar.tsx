'use client';

import { useState } from "react";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useChatSidebar } from "@/features/chat/hooks/useChatSidebar";
import { useSelectedChat } from '@/features/chat/stores/useSelectedChat';
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { createChat } from "@/features/chat/services/createChat";

export default function ChatSidebar() {
    const [search, setSearch] = useState<string>('');
    const { chats, isLoading, error, fetchChats } = useChatSidebar();
    const user = useAuthStore((state) => state.user);

    const filteredChats = chats
        .map((chat, idx) => ({ chat, idx }))
        .filter(({ chat }) => chat.title.toLowerCase().includes(search.toLowerCase()));

    const handleNewChat = async () => {
        if (!user?.uuid) return;

        const title = `New Conversation ${chats.length + 1}`;
        const newChat = await createChat(user.uuid, title);

        setChatUuid(newChat.uuid);

        await fetchChats();
    };

    const { chatUuid: selectedChatUuid, setChatUuid } = useSelectedChat();

    return (
        <aside className="h-full flex flex-col bg-[#1a1a1c] text-white border-r border-gray-800 p-4 w-64">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold"></h2>
                <button
                    onClick={handleNewChat}
                    className="p-2 hover:bg-[#2a2a2d] rounded transition cursor-pointer"
                    title="Yeni Sohbet"
                >
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Search */}
            <div className="relative mb-4">
                <input
                    type="text"
                    placeholder="Search chats..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-3 py-2 pl-10 rounded bg-[#2a2a2d] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar">
                {isLoading ? (
                    <p className="text-sm text-gray-400">Loading...</p>
                ) : error ? (
                    <p className="text-sm text-red-400">{error}</p>
                ) : filteredChats.length > 0 ? (
                    filteredChats.map(({ chat }) => (
                        <button
                            key={chat.uuid}
                            onClick={() => setChatUuid(chat.uuid)}
                            className={`w-full text-left px-3 py-2 rounded transition cursor-pointer ${
                                chat.uuid === selectedChatUuid
                                    ? "bg-[#2f2f32] text-white font-semibold"
                                    : "hover:bg-[#2a2a2d]"
                            }`}
                        >
                            {chat.title}
                        </button>
                    ))
                ) : (
                    <p className="text-sm text-gray-400">No chats found.</p>
                )}
            </div>
        </aside>
    );
}
