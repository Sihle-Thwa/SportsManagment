// components/ui/Button.tsx
import React from "react";
import { cn } from "../../../lib/utils";
import { Button as ShadButton } from "../../ui/button";


interface ButtonProps {
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "primary" | "secondary" | "tertiary" | "ghost";
    withIcon?: boolean;
    iconPosition?: "left" | "right" | "center";
    icon?: React.ReactNode;
    fullWidth?: boolean;
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;
}

const variantClasses = {
    primary: "btn--primary",
    secondary: "btn--secondary",
    tertiary: "btn--tertiary",
    ghost: "btn--ghost",
};

const Button: React.FC<ButtonProps> = ({
    size = "md",
    variant = "primary",
    withIcon = false,
    iconPosition = "left",
    icon,
    fullWidth = false,
    className,
    disabled = false,
    children,
    ...rest
}) => {
    return (
        <ShadButton
            className={cn(
                "btn",
                variantClasses[variant],
                fullWidth && "w-full",
                withIcon && `icon-${iconPosition}`,
                className
            )}
            disabled={disabled}
            {...rest}
        >
            {withIcon && icon && (
                <span className={`icon ${iconPosition}`}>{icon}</span>
            )}
            {children}
        </ShadButton>
    );
};

export { Button };