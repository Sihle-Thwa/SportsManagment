import React from "react";
import { Select as ShadSelectBase, SelectContent as ShadSelectContent, SelectItem as ShadSelectItem, SelectTrigger as ShadSelectTrigger, SelectValue as ShadSelectValue } from "../../ui/select";
import { cn } from "../../../lib/utils";



interface SelectProps {
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "select-primary" | "select-secondary" | "select-tertiary";
    withIcon?: boolean;
    iconPosition?: "left" | "right";
    icon?: React.ReactNode;
    fullWidth?: boolean;
    placeholder?: string;
    className?: string;
    disabled?: boolean;

    value?: string | number; // Only allow string or number
    onValueChange?: (value: string | number) => void;
    options?: {
        label: string;
        value: string | number;
        disabled?: boolean;
    }[];
}


const Select: React.FC<SelectProps> = (props) => {
    const {
        value,
        onValueChange,
        options = [],
        variant,
        fullWidth,
        withIcon = false,
        iconPosition = "right",
        icon,
        className,
        placeholder,
        ...rest
    } = props;

    // Ensure value is always a string or undefined
    // Ensure value is always a string or undefined
    const stringValue = value !== undefined ? String(value) : undefined;
    // Ensure onValueChange returns a string or number as expected by SelectProps
    const handleValueChange = (value: string) => {
        const option = options.find(opt => String(opt.value) === value);
        onValueChange?.(option?.value ?? value);
    };

    return (
        <ShadSelectBase
            value={stringValue}
            onValueChange={handleValueChange}
            {...rest}
        >
            <ShadSelectTrigger
                className={cn(
                    "select-base",
                    `select-${variant}`,
                    fullWidth ? "w-full" : "w-fit",
                    className
                )}
            >
                {withIcon && iconPosition === "left" && icon}
                <ShadSelectValue placeholder={placeholder} />
                {withIcon && iconPosition === "right" && icon}
            </ShadSelectTrigger>
            <ShadSelectContent>
                {options.map(option => (
                    <ShadSelectItem
                        key={option.value}
                        value={String(option.value)}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </ShadSelectItem>
                ))}
            </ShadSelectContent>
        </ShadSelectBase>
    );
};

Select.displayName = "Select";
export { Select, ShadSelectContent, ShadSelectItem, ShadSelectTrigger, ShadSelectValue };
