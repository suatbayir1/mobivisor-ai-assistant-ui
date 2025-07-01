import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/shared/lib/utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
    return (
        <input 
            ref={ref}
            className={cn(
                "w-full bg-[#1e1e20] border border-gray-600 text-white px-3 py-2 rounded mt-1 placeholder-gray-400",
                className
            )}
            {...props}
        />
    )
});

Input.displayName = "Input";

export default Input;