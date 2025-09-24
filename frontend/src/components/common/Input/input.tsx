import * as React from "react";
import { cn } from "../../../lib/utils";
import { X, type LucideIcon } from "lucide-react";
import "./input.css";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	startIcon?: LucideIcon;
	endIcon?: LucideIcon;
	onClear?: () => void;
	value: string; // make controlled
	setValue: (v: string) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			startIcon: StartIcon,
			endIcon: EndIcon,
			onClear,
			value,
			setValue,
			className,
			...props
		},
		ref,
	) => {
		return (
			<div className={cn("input-wrapper", className)}>
				{StartIcon && (
					<div className="input__icon input__icon--start" aria-hidden>
						<StartIcon className="input__icon-svg" />
					</div>
				)}

				<input
					ref={ref}
					value={value}
					onChange={(e) => setValue(e.target.value)}
					className={cn(
						"input",
						StartIcon ? "input--with-start" : "",
						EndIcon ? "input--with-end" : "",
					)}
					{...props}
				/>

				{/* clear button (visible when value present) */}
				{value && (
					<button
						type="button"
						className="input__clear"
						aria-label="Clear"
						onClick={() => {
							setValue("");
							onClear?.();
						}}
					>
						<X className="input__clear-icon" />
					</button>
				)}

				{EndIcon && (
					<div className="input__icon input__icon--end" aria-hidden>
						<EndIcon className="input__icon-svg" />
					</div>
				)}
			</div>
		);
	},
);

Input.displayName = "Input";
export { Input };
