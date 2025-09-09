import React from "react";
import { cn } from "../../../lib/utils";
import "../../../styles/components/button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	size?: "sm" | "md" | "lg";
	variant?: "primary" | "secondary" | "tertiary" | "ghost";
	withIcon?: boolean;
	iconPosition?: "left" | "right" | "center";
	icon?: React.ReactNode;
	fullWidth?: boolean;
	className?: string;
}

const variantClasses = {
	primary: "button-primary",
	secondary: "button-secondary",
	tertiary: "button-tertiary",
	ghost: "button-ghost",
};

const sizeClasses = {
	sm: "button-sm",
	md: "button-md",
	lg: "button-lg",
};

const iconPositionClasses = {
	left: "button-icon-left",
	right: "button-icon-right",
	center: "button-icon-center",
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
				"button",
				variantClasses[variant],
				sizeClasses[size],
				fullWidth && "w-full",
				isIconOnly ? "button-icon-only" : "",
				className,
			)}
			{...rest}
		>
			{withIcon && icon && (
				<span className={cn("button-icon", iconPositionClasses[iconPosition])}>
					{icon}
				</span>
			)}
			{children}
		</button>
	);
};

export { Button };
export type { ButtonProps };
