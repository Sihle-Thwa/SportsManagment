import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "tertiary" | "ghost";
    size?: "sm" | "md" | "lg";
    withIcon?: boolean;
    iconPosition?: "left" | "right";
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
        const getVariantStyles = () => {
            switch (variant) {
                case "primary":
                    return "bg-blue-500 text-white hover:bg-blue-600";
                case "secondary":
                    return "bg-gray-500 text-white hover:bg-gray-600";
                case "tertiary":
                    return "bg-green-500 text-white hover:bg-green-600";
                case "ghost":
                    return "bg-transparent text-blue-500 hover:bg-blue-100";
                default:
                    return "";
            }
        };

         const getSizeStyles = () => {
      switch (size) {
        case "sm":
          return "px-3 py-1 text-sm";
        case "md":
          return "p-2 py-2 text-md";
        case "lg":
          return "px-5 py-3 text-lg";
        default:
          return "px-4 py-2";
      }
    };
        const getIcon = () => {
            if (!icon) return null;
            return (
                <span className={`mr-2 ${iconPosition === "right" ? "ml-2" : ""}`}>
                    {icon}
                </span>
            );
        };

        

        return (
            <button
                className={cn(
                    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:opacity-50",
                    getVariantStyles(),
                    getSizeStyles(),
                    fullWidth ? "w-full" : "",
                    className
                )}
                ref={ref}
                {...props}
            >
                {withIcon && iconPosition === "left" && (
                    getIcon()
                )}
                {children}
                {withIcon && iconPosition === "right" && (
                    getIcon()
                )}
            </button>
        );
    }
);

Button.displayName = "Button";
export {Button};