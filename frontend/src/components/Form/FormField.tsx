// src/components/Form/FormField.tsx
import React from "react";
import {
	FormField as ShadcnFormField,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
} from "../../components/ui/form";
import { Control, FieldValues, Path } from "react-hook-form";
import { cn } from "../../lib/utils";
import "./formfield.css";

type RenderCallbackProps = {
	field: {
		value: unknown;
		onChange: (...args: unknown[]) => void;
		onBlur: (...args: unknown[]) => void;
		name: string;
		ref?: unknown;
	};
	id: string;
	describedById?: string;
};

interface FormFieldProps<T extends FieldValues = FieldValues> {
	name: Path<T>;
	label?: string;
	description?: string;
	control: Control<T>;
	className?: string;
	children: React.ReactNode | ((props: RenderCallbackProps) => React.ReactNode);
}

/**
 * FormField wrapper:
 * - supports both simple element children (cloned) and render-callback pattern
 * - provides deterministic ids for label/description/message
 * - ensures aria wiring and accessible structure
 */
export function FormField<T extends FieldValues = FieldValues>({
	name,
	label,
	description,
	control,
	children,
	className,
}: FormFieldProps<T>) {
	const baseId = `fld-${String(name)}`;
	const labelId = `${baseId}-label`;
	const descId = description ? `${baseId}-desc` : undefined;
	const msgId = `${baseId}-msg`;
	const describedBy = [descId, msgId].filter(Boolean).join(" ") || undefined;

	return (
		<ShadcnFormField
			control={control}
			name={name}
			render={({ field }) => {
				const renderProps: RenderCallbackProps = {
					field,
					id: baseId,
					describedById: describedBy,
				};

				// Render callback pattern (recommended for Select / Calendar / complex controls)
				if (typeof children === "function") {
					return (
						<FormItem className={cn("form-field", className)}>
							{label && (
								<FormLabel
									id={labelId}
									htmlFor={baseId}
									className="form-field__label"
								>
									{label}
								</FormLabel>
							)}

							<FormControl>{children(renderProps)}</FormControl>

							{description && (
								<FormDescription
									id={descId}
									className="form-field__description"
								>
									{description}
								</FormDescription>
							)}

							<FormMessage id={msgId} className="form-field__message" />
						</FormItem>
					);
				}

				// Child is an element (simple cloning path) — inject form props
				const childElement = React.isValidElement(children)
					? React.cloneElement(children as React.ReactElement<unknown>, {
							...(children.props || {}),
							...(typeof children.type === "string"
								? {
										id: baseId,
										name: field.name,
										value: field.value,
										onChange: field.onChange,
										onBlur: field.onBlur,
										ref: field.ref,
										"aria-describedby": describedBy,
								  }
								: {
										id: baseId,
										onChange: field.onChange,
										onBlur: field.onBlur,
										ref: field.ref,
										"aria-describedby": describedBy,
								  }),
					  })
					: children;

				return (
					<FormItem className={cn("form-field", className)}>
						{label && (
							<FormLabel
								id={labelId}
								htmlFor={baseId}
								className="form-field__label"
							>
								{label}
							</FormLabel>
						)}

						<FormControl>{childElement}</FormControl>

						{description && (
							<FormDescription id={descId} className="form-field__description">
								{description}
							</FormDescription>
						)}

						<FormMessage id={msgId} className="form-field__message" />
					</FormItem>
				);
			}}
		/>
	);
}

export default FormField;
