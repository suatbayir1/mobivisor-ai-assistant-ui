import type { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1e1e20] px-4">
            <div className="w-full max-w-md bg-[#2a2a2d] text-white shadow-xl rounded-2xl p-8">
                <div className="mb-6 text-center">
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                        <Image 
                            src="/favicon.png"
                            alt="Mobivisor Logo"
                            width={100}
                            height={40}
                            priority
                        />
                    </div>
                </div>

                {children}
            </div>
        </div>
    )
}