// components/ui/Button.tsx
import React from "react";
import { cn } from "../../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: "sm" | "md" | "lg" | "xl";
    variant?: "primary" | "secondary" | "tertiary" | "ghost";
    withIcon?: boolean;
    iconPosition?: "left" | "right" | "center";
    icon?: React.ReactNode;
    fullWidth?: boolean;
    className?: string;
}

const variantClasses = {
    primary: "btn--primary",
    secondary: "btn--secondary",
    tertiary: "btn--tertiary",
    ghost: "btn--ghost",
};

const sizeClasses = {
    sm: "btn--sm",
    md: "btn--md",
    lg: "btn--lg",
    xl: "btn--xl",
};

const iconPositionClasses = {
    left: "btn__icon--left",
    right: "btn__icon--right",
    center: "btn__icon--center",
};

const Button: React.FC<ButtonProps> = ({
    size = "md",
    variant = "primary",
    withIcon = false,
    iconPosition = "center",
    icon,
    fullWidth = false,
    className,
    children,
    ...rest
}) => {
    const isIconOnly = withIcon && icon && !children;

    return (
        <button
            className={cn(
                "btn",
                variantClasses[variant],
                sizeClasses[size],
                fullWidth && "w-full",
                isIconOnly ? "btn--icon-only" : "",
                className
            )}
            {...rest}
        >
            {withIcon && icon && (
                <span className={cn(
                    "btn__icon",
                    iconPositionClasses[iconPosition]
                )}>
                    {icon}
                </span>
            )}
            {children}
        </button>
    );
};

export { Button };
export type { ButtonProps };