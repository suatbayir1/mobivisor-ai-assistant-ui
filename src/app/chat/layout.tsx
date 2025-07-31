"use client";

import dynamic from 'next/dynamic';
import ChatSidebar from "@/features/chat/components/ChatSidebar";
import { useState } from "react";
import { PanelLeftOpen, PanelLeftClose } from "lucide-react";
import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut, Settings, CircleUser } from "lucide-react";
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useRouter } from "next/navigation";
import AuthGuard from '@/shared/components/AuthGuard';

const PDFDrawer = dynamic(() => import('@/features/chat/components/PdfDrawer'), {
    ssr: false,
});

export default function ChatLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const router = useRouter();

    return (
        <AuthGuard>
            <div className="flex h-screen bg-[#1e1e20] text-white overflow-hidden relative">
                {/* Top Control Bar */}
                <div className="absolute top-4 left-4 right-4 z-30 flex justify-between items-center pointer-events-none">
                    <div className="flex items-center gap-3 pointer-events-auto">
                        {/* Sidebar Toggle Button */}
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="bg-[#2a2a2d] text-white px-3 py-2 rounded hover:bg-[#3a3a3d] shadow transition cursor-pointer"
                        >
                            {sidebarOpen ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
                        </button>

                        <Image
                            src="/favicon.png"
                            alt="Mobivisor Logo"
                            width={32}
                            height={32}
                            className="object-contain"
                            priority
                        />
                    </div>

                    <div className="pointer-events-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer bg-gray-800">
                                    <AvatarImage src="/user-avatar.png" alt="@user" />
                                    <AvatarFallback className='bg-gray-800'>
                                        {(user?.name?.charAt(0) || user?.email?.charAt(0) || "U").toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#2a2a2d] text-white border-none">
                                <DropdownMenuItem 
                                    className="flex items-center gap-2 text-gray-400 pointer-events-none cursor-default hover:bg-transparent"
                                >
                                    <CircleUser className="w-4 h-4" /> {user?.email}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                                    <Settings className="w-4 h-4" /> Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                    onClick={() => {
                                        logout();
                                        router.push("/auth/login");
                                    }}
                                    className="flex items-center gap-2 text-red-500 cursor-pointer"
                                >
                                    <LogOut className="w-4 h-4" /> Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Sidebar */}
                {sidebarOpen && (
                    <ChatSidebar />
                )}

                {/* Main Content */}
                <main className="flex-1 flex justify-center overflow-y-auto pt-5 pb-6 px-4">
                    <div className="w-full max-w-3xl flex flex-col h-full">
                        {children}
                    </div>
                </main>

                <PDFDrawer />
            </div>
        </AuthGuard>
    )
}
