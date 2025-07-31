import { ChatMessage } from "@/features/chat/types";
import { usePdfStore } from "@/features/chat/stores/pdfStore"; 
import { ScrollTextIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function Message({ role, content, sources }: ChatMessage) {
    const isUser = role === "user";
    const openPdf = usePdfStore((state) => state.openPdf);

    const parseContentWithLinks = (text: string) => {
        const markdownLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
        const elements: React.ReactNode[] = [];
        let lastIndex = 0;
        let keyCounter = 0;

        text.replace(markdownLinkRegex, (match, linkText, url, offset) => {
            if (lastIndex < offset) {
                const plainText = text.slice(lastIndex, offset);
                elements.push(...splitPlainUrls(plainText, () => `plain-${keyCounter++}`));
            }

            elements.push(
                <a
                    key={`markdown-${keyCounter++}`}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline break-words"
                >
                    {linkText}
                </a>
            );

            lastIndex = offset + match.length;
            return match;
        });

        if (lastIndex < text.length) {
            const remainingText = text.slice(lastIndex);
            elements.push(...splitPlainUrls(remainingText, () => `plain-${keyCounter++}`));
        }

        return elements;
    };

    function splitPlainUrls(text: string, getKey: () => string): React.ReactNode[] {
        const plainUrlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(plainUrlRegex);

        return parts.map((part) =>
            plainUrlRegex.test(part) ? (
                <a
                    key={getKey()}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline break-words"
                >
                    {part}
                </a>
            ) : (
                <React.Fragment key={getKey()}>{part}</React.Fragment>
            )
        );
    }

    const getSourceText = (id: string) => {
        const pageStr = id.split(':')[1];
        return `Page: ${pageStr}`;
    };

    const systemLogo = "/favicon.png";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
            {!isUser && (
                <div className="mr-2 flex-shrink-0">
                    <Image src={systemLogo} alt="System" width={32} height={32} className="rounded-full" />
                </div>
            )}

            <div
                className={`
                    px-4 py-3 rounded-lg text-sm leading-relaxed 
                    ${isUser
                        ? "bg-gray-600 text-white self-end order-1 max-w-[60%]"
                        : "bg-[#2c2c2f] text-gray-300 self-start max-w-full w-full"
                    }
                `}
            >
                <p>{parseContentWithLinks(content)}</p>

                {sources && sources.length > 0 && (
                    <div className="mt-2 border-t border-gray-700 pt-2 text-xs text-blue-400">
                        <div className="flex flex-wrap gap-2">
                            {sources.map((source, index) => (
                                <button
                                    key={index}
                                    onClick={() => openPdf(source)}
                                    className="flex items-center gap-1 px-2 py-1 bg-gray-700 rounded hover:underline truncate max-w-[250px] text-left cursor-pointer"
                                    title={source.id}
                                >
                                    <ScrollTextIcon className="w-5 h-5" />
                                    <span className="truncate">{getSourceText(source.id)}</span>
                                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-600 text-blue-100">
                                        {source.score}%
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
