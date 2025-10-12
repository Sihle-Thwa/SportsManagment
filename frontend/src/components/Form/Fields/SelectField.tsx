import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "../../ui/select";
import "../formfield.css";

export interface Option {
	value: string;
	label: string;
}

export interface SelectFieldProps {
	name: string;
	label?: string;
	options: Option[];
	placeholder?: string;
	className?: string;
	defaultValue?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
	name,
	label,
	options,
	placeholder,
	defaultValue = "",
}) => {
	const { control, formState } = useFormContext();
	const err = formState.errors[name];

	return (
		<div className="field" data-field-name={name}>
			{label && (
				<label className="field__label" htmlFor={name}>
					{label}
				</label>
			)}

			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field }) => {
					return (
						<>
							<Select
								value={String(field.value ?? "")}
								onValueChange={(v) => field.onChange(v)}
								aria-describedby={err ? `${name}-err` : undefined}
							>
								<SelectTrigger
									id={name}
									className={`field__select-trigger ${err && "error"}`}
								>
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
								<SelectContent>
									{options.map((o) => (
										<SelectItem key={o.value} value={o.value}>
											{o.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							{err && (
								<div id={`${name}-err`} role="alert" className="field__error">
									{String(err.message ?? "Invalid")}
								</div>
							)}
						</>
					);
				}}
			/>
		</div>
	);
};

export default SelectField;
