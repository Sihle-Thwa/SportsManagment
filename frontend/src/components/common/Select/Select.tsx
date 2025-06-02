import { cn } from "../../../lib/utils";
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Select as ShadSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



interface SelectProps {
    size?: "sm" | "md" | "lg" | "xl";
    withIcon?: boolean;
    iconPosition?: "left" | "right";
    icon?: React.ReactNode;
    fullWidth?: boolean;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    options?: {
        label: string;
        value: string | number;
        disabled?: boolean;
    }[];
}



export const Select: React.FC<SelectProps> = ({
    placeholder = "Select an option"
    , options = [],
    size = "md",
    withIcon = false,
    iconPosition = "left",
    icon,
    fullWidth = false,
    className,
    disabled = false
}) => {
    return (
        <ShadSelect>
            <SelectTrigger
                className={cn(
                    "select-base",
                    {
                        "select-full-width": fullWidth,
                        "select-disabled": disabled,
                        [`select-${size}`]: size,
                    },
                    className
                )}
            >
                <SelectValue placeholder={placeholder} />
                {withIcon && icon && (
                    <span className={`select-icon select-icon-${iconPosition}`}>
                        {icon}
                    </span>
                )}
                <ChevronDown className="ml-2" />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={String(option.value)} disabled={option.disabled}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </ShadSelect>
    );
};

export default Select;
