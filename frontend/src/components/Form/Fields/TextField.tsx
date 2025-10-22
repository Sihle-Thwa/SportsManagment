import React from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { cn } from "../../../lib/utils";
import "../formfield.css";

export interface TextFieldProps {
	id?: string;
	name: string;
	label?: string;
	placeholder?: string;
	description?: string;
	type?: string;
	className?: string;
	rules?: RegisterOptions;
	disabled?: boolean;
	required?: boolean;
	autoComplete?: string;
}

export const TextField: React.FC<TextFieldProps> = ({
	id,
	name,
	label,
	placeholder,
	description,
	type = "text",
	rules,
	disabled = false,
	required = false,
	autoComplete = undefined,
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
				id={id}
				{...register(name, rules)}
				type={type}
				placeholder={placeholder}
				aria-invalid={!!err}
				aria-describedby={err ? `${name}-err` : undefined}
				disabled={disabled}
				required={required}
				className={cn("field__input", err && "error")}
				autoComplete={autoComplete}
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
