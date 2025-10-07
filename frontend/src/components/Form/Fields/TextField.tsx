import React from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { cn } from "../../../lib/utils";
import "../formfield.css";

export interface TextFieldProps {
	name: string;
	label?: string;
	placeholder?: string;
	description?: string;
	type?: string;
	className?: string;
	rules?: RegisterOptions;
	disabled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
	name,
	label,
	placeholder,
	description,
	type = "text",
	rules,
	disabled = false,
}) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	const err = errors[name];

	return (
		<div className="field" data-field-name={name}>
			{label && (
				<label className="field__label" htmlFor={name}>
					{label}
				</label>
			)}
			<input
				id={name}
				{...register(name, rules)}
				type={type}
				placeholder={placeholder}
				aria-invalid={!!err}
				aria-describedby={err ? `${name}-err` : undefined}
				disabled={disabled}
				className={cn("field__input", err && "error")}
			/>
			{description && <div className="field__desc">{description}</div>}
			{err && (
				<div id={`${name}-err`} role="alert" className="field__error">
					{String(err.message ?? err.type ?? "Invalid")}
				</div>
			)}
		</div>
	);
};

export default TextField;
