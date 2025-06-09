// components/ui/Button.tsx
import React from "react";
import { cn } from "../../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary" | "ghost";
    size?: "sm" | "md" | "lg" | "xl";
    withIcon?: boolean;
    iconPosition?: "left" | "right" | "center";
    icon?: React.ReactNode;
    fullWidth?: boolean;
    className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = "primary",
            size = "md",
            withIcon = false,
            iconPosition = "left",
            icon,
            fullWidth = false,
            className,
            ...props
        },
        ref
    ) => {
        const base = "btn";

        const variantClass = {
            primary: "btn--primary",
            secondary: "btn--secondary",
            tertiary: "btn--tertiary",
            ghost: "btn--ghost"
        }[variant];

        const sizeClass = {
            sm: "btn--sm",
            md: "btn--md",
            lg: "btn--lg",
            xl: "btn--xl"
        }[size];

        return (
            <button
                ref={ref}
                className={cn(
                    base,
                    variantClass,
                    sizeClass,
                    fullWidth && "w-full",
                    withIcon && iconPosition === "center" && "btn--icon-only",
                    className
                )}
                {...props}
            >
                {withIcon && iconPosition === "left" && icon && (
                    <span className="btn__icon btn__icon--left">{icon}</span>
                )}

                {iconPosition !== "center" && children && <span>{children}</span>}

                {withIcon && iconPosition === "right" && icon && (
                    <span className="btn__icon btn__icon--right">{icon}</span>
                )}

                {withIcon && iconPosition === "center" && !children && icon && (
                    <span className="btn__icon btn__icon--center">{icon}</span>
                )}
            </button>
        );
    }
);

Button.displayName = "Button";
export { Button };
