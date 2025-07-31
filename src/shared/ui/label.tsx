import { LabelHTMLAttributes } from "react";
import { cn } from "@/shared/lib/utils/cn";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function Label({ className, ...props }: LabelProps) {
    return (
        <label 
            className={cn("block text-sm font-medium text-gray-300", className)}
            {...props}
        />
    )
}