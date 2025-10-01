// FormField.tsx
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
import "./formfield.css";
import { cn } from "../../lib/utils";

type RenderCallbackProps = {
	field: {
		value: unknown;
		onChange: (...args: unknown[]) => void;
		onBlur: (...args: unknown[]) => void;
		name: string;
		ref?: unknown;
	};
	id: string; // id for the input
	describedById: string | null; // id for aria-describedby (desc + message)
};

interface FormFieldProps<T extends FieldValues = FieldValues> {
	name: Path<T>;
	label?: string;
	description?: string;
	control: Control<T>;
	className?: string;
	/**
	 * children may be:
	 *  - a React element — we will clone and inject {...field}
	 *  - a render function: ({ field, id, describedById }) => ReactNode
	 */
	children: React.ReactNode | ((props: RenderCallbackProps) => React.ReactNode);
}

export const FormField = <T extends FieldValues = FieldValues>({
	name,
	label,
	description,
	control,
	children,
	className,
}: FormFieldProps<T>) => {
	// create stable ids for label/description/message
	const id = `field-${String(name)}`;
	const descId = description ? `field-${String(name)}-desc` : null;
	const msgId = `field-${String(name)}-msg`;
	const describedById = [descId, msgId].filter(Boolean).join(" ") || null;

	return (
		<ShadcnFormField
			control={control}
			name={name}
			render={({ field }) => {
				// field: { value, onChange, onBlur, name, ref }
				const renderProps: RenderCallbackProps = {
					field,
					id,
					describedById,
				};

				// If children is a function (render callback) let it control rendering.
				if (typeof children === "function") {
					return (
						<FormItem className="formItem">
							{label && (
								<FormLabel htmlFor={id} className="formLabel">
									{label}
								</FormLabel>
							)}

							<FormControl>
								{/* children is function */}
								{children(renderProps)}
							</FormControl>

							{description && (
								<FormDescription
									id={descId ?? undefined}
									className="formDescription"
								>
									{description}
								</FormDescription>
							)}

							<FormMessage id={msgId} className="formMessage" />
						</FormItem>
					);
				}

				// Otherwise, if children is an element, cloneElement and inject standard field props
				const childElement = React.isValidElement(children)
					? React.cloneElement(children as React.ReactElement, {
							id,
							name: field.name,
							value: field.value,
							onChange: field.onChange,
							onBlur: field.onBlur,
							// Only pass ref if the element is a DOM element (type is string)
							...(typeof (children as React.ReactElement).type === "string"
								? {
										ref: field.ref,
										"aria-describedby": describedById ?? undefined,
								  }
								: {}),
					  })
					: children;

				return (
					<FormItem className={cn("formItem", className)}>
						{label && (
							<FormLabel htmlFor={id} className="formLabel">
								{label}
							</FormLabel>
						)}

						<FormControl>{childElement}</FormControl>

						{description && (
							<FormDescription
								id={descId ?? undefined}
								className="formDescription"
							>
								{description}
							</FormDescription>
						)}

						<FormMessage id={msgId} className="formMessage" />
					</FormItem>
				);
			}}
		/>
	);
};

export default FormField;
