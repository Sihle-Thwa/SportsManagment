import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Popover, PopoverTrigger, PopoverContent } from "../../ui/popover";
import { Calendar } from "../../ui/calendar";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import "../formfield.css";
import { cn } from "../../../lib/utils";

export interface DateFieldProps {
	name: string;
	label?: string;
	placeholder?: string;
	className?: string;
	defaultValue?: Date | string | null;
}

export const DateField: React.FC<DateFieldProps> = ({
	name,
	label,
	placeholder = "Select date",
	className,
	defaultValue = null,
}) => {
	const { control, formState } = useFormContext();
	const err = formState.errors[name];

	return (
		<div className={cn("field", className)} data-field-name={name}>
			{label && (
				<label className="field__label" htmlFor={name}>
					{label}
				</label>
			)}

			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field, fieldState }) => {
					const displayText = (() => {
						const v = field.value;
						if (!v) return placeholder;
						const d = v instanceof Date ? v : new Date(v);
						if (isNaN(d.getTime())) return placeholder;
						return d.toLocaleDateString();
					})();

					return (
						<>
							<Popover>
								<PopoverTrigger asChild>
									<button
										id={name}
										type="button"
										aria-invalid={!!fieldState.error}
										aria-describedby={
											fieldState.error ? `${err}-err` : undefined
										}
										className={cn(
											"field__date-trigger",
											fieldState.error && "error",
										)}
									>
										<span className="field__icon-left">
											<CalendarIcon />
										</span>
										<span className="field__date-text">{displayText}</span>
										<ChevronDown />
									</button>
								</PopoverTrigger>

								<PopoverContent className="popoverContent" align="start">
									<Calendar
										mode="single"
										selected={field.value ?? undefined}
										onSelect={(d: Date | undefined) => field.onChange(d)}
									/>
								</PopoverContent>
							</Popover>

							{fieldState.error && (
								<div id={`${err}-err`} role="alert" className="field__error">
									{String(fieldState.error.message ?? "Invalid date")}
								</div>
							)}
						</>
					);
				}}
			/>
		</div>
	);
};

export default DateField;
