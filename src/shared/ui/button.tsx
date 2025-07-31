import { ButtonHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils/cn"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: ButtonProps) {
    return (
        <button 
            className={cn(
                "w-full bg-[#F7941D] hover:bg-[#e07c00] text-white py-2 rounded disabled:opacity-50 cursor-pointer",
                className
            )}
            {...props}
        />
    )
}