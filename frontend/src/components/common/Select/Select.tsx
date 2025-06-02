import React from "react";
import {
    Select as ShadSelectBase,
    SelectContent as ShadSelectContent,
    SelectItem as ShadSelectItem,
    SelectTrigger as ShadSelectTrigger,
    SelectValue as ShadSelectValue,
} from "../../ui/select";
import { cn } from "../../../lib/utils";

interface SelectProps {
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "primary" | "secondary" | "tertiary";
    withIcon?: boolean;
    iconPosition?: "left" | "right";
    icon?: React.ReactNode;
    fullWidth?: boolean;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    value?: string | number;
    onValueChange?: (value: string | number) => void;
    options?: {
        label: string;
        value: string | number;
        disabled?: boolean;
    }[];
}

const variantClasses = {
    primary: "select-primary",
    secondary: "select-secondary",
    tertiary: "select-tertiary",
};

const Select: React.FC<SelectProps> = ({
    value,
    onValueChange,
    options = [],
    variant = "primary",
    fullWidth = false,
    withIcon = false,
    iconPosition = "right",
    icon,
    className,
    placeholder,
    disabled,
    ...rest
}) => {
    const stringValue = value !== undefined ? String(value) : undefined;

    const handleValueChange = (val: string) => {
        const matched = options.find(opt => String(opt.value) === val);
        onValueChange?.(matched?.value ?? val);
    };

    return (
        <ShadSelectBase
            value={stringValue}
            onValueChange={handleValueChange}
            disabled={disabled}
            {...rest}
        >
            <ShadSelectTrigger
                className={cn(
                    "select-base",
                    variantClasses[variant],
                    fullWidth ? "w-full" : "w-fit",
                    className
                )}
                disabled={disabled}
            >
                {withIcon && iconPosition === "left" && icon}
                <ShadSelectValue placeholder={placeholder} />
                {withIcon && iconPosition === "right" && icon}
            </ShadSelectTrigger>
            <ShadSelectContent>
                {options.map((option) => (
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
export {
    Select,
    ShadSelectContent,
    ShadSelectItem,
    ShadSelectTrigger,
    ShadSelectValue,
};
