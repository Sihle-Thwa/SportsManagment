"use client";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";

import { Input } from "../../components/ui/input";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "../../components/ui/select";
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from "../../components/ui/popover";
import { Calendar } from "../../components/ui/calendar";

import { FormField } from "./FormField";
import "./userinfoform.css";
import { cn } from "../../lib/utils";
import {
	UserInfoFormDefaultValues,
	validateUserInfo,
	GENDER_OPTIONS,
	PROVINCE_OPTIONS,
	COUNTRY_OPTIONS,
} from "../../utils/validators";

/**
 * NOTE: FormValues type derived from your default values constant.
 * Adjust if your project shapes differ.
 */
type FormValues = typeof UserInfoFormDefaultValues;

export function UserInfoForm({
	defaultValues = UserInfoFormDefaultValues,
	onSubmit,
	formTitle = "User Information",
}: {
	defaultValues?: FormValues;
	onSubmit: (data: FormValues) => void;
	formTitle?: string;
}) {
	const form = useForm<FormValues>({ defaultValues, mode: "onBlur" });
	const { handleSubmit, control } = form;
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({});

	useEffect(() => {
		Object.entries(validationErrors).forEach(([field, message]) => {
			form.setError(field as keyof FormValues, { type: "manual", message });
		});
	}, [validationErrors, form]);

	function submit(data: FormValues) {
		const errors = validateUserInfo(data);
		if (Object.keys(errors).length > 0) {
			setValidationErrors(errors);
			return;
		}
		setValidationErrors({});
		onSubmit(data);
	}

	// small Icon wrapper for input adornments
	const IconWrapper = ({ children }: { children: React.ReactNode }) => (
		<div className="inputIcon_userInfo">{children}</div>
	);

	return (
		<div
			className="cardBase_userInfo"
			role="region"
			aria-labelledby="user-info-title"
		>
			<div className="cardHeader_userInfo">
				<div>
					<div id="user-info-title" className="title_userInfo">
						{formTitle}
					</div>
					<div className="accentLine_userInfo" aria-hidden />
				</div>
			</div>

			<div className="cardBody_userInfo">
				<form
					onSubmit={handleSubmit(submit)}
					className="formGrid_userInfo"
					noValidate
				>
					{/* First Name */}
					<FormField name="firstName" label="First Name" control={control}>
						<Input placeholder="First name" className="input_userInfo" />
					</FormField>

					{/* Address Line 1 */}
					<FormField
						name="addressLine1"
						label="Address Line 1"
						control={control}
					>
						<Input placeholder="address 1" className="input_userInfo" />
					</FormField>

					{/* Last Name */}
					<FormField name="lastName" label="Last Name" control={control}>
						<Input placeholder="Last name" className="input_userInfo" />
					</FormField>

					{/* Address Line 2 */}
					<FormField
						name="addressLine2"
						label="Address Line 2"
						control={control}
					>
						<Input placeholder="address 2" className="input_userInfo" />
					</FormField>

					{/* Gender (radio group horizontal) */}
					<FormField name="gender" label="Gender" control={control}>
						{({ field, id, describedById }) => (
							<div
								role="radiogroup"
								aria-labelledby={`${id}-label`}
								aria-describedby={describedById ?? undefined}
								className="radioGroup_userInfo"
							>
								{GENDER_OPTIONS.map((g) => (
									<label key={g.value} className="radioItem_userInfo">
										<input
											type="radio"
											name={field.name}
											value={g.value}
											checked={field.value === g.value}
											onChange={() => field.onChange(g.value)}
											onBlur={field.onBlur}
											aria-checked={field.value === g.value}
										/>
										<span>{g.label}</span>
									</label>
								))}
							</div>
						)}
					</FormField>

					{/* Town/City */}
					<FormField name="city" label="Town/City" control={control}>
						<Input placeholder="durban" className="input_userInfo" />
					</FormField>

					{/* Date of Birth (Date picker) */}
					<FormField name="dateOfBirth" label="Date of Birth" control={control}>
						{({ field, id, describedById }) => (
							<Popover>
								<PopoverTrigger asChild>
									<button
										id={id}
										aria-describedby={describedById ?? undefined}
										className={cn("input_userInfo", "dateTrigger_userInfo")}
										type="button"
									>
										<IconWrapper>
											<CalendarIcon />
										</IconWrapper>
										<span className="dateText_userInfo">
											{field.value
												? format(field.value as Date, "dd/MMM/yyyy")
												: "dd/MMM/yyyy"}
										</span>
										<ChevronDown className="chevron_userInfo" />
									</button>
								</PopoverTrigger>

								<PopoverContent
									className="popoverContent_userInfo"
									align="start"
								>
									<Calendar
										mode="single"
										selected={field.value as Date | undefined}
										onSelect={(d) => field.onChange(d)}
										className="calendar_userInfo"
									/>
								</PopoverContent>
							</Popover>
						)}
					</FormField>

					{/* Province/State (Select) */}
					<FormField name="province" label="Province/State" control={control}>
						{({ field, id, describedById }) => (
							<Select
								value={typeof field.value === "string" ? field.value : ""}
								onValueChange={(val) => field.onChange(val)}
								aria-describedby={describedById ?? undefined}
							>
								<SelectTrigger id={id} className="selectTrigger_userInfo">
									<SelectValue placeholder="Select province" />
									<ChevronDown />
								</SelectTrigger>
								<SelectContent>
									{PROVINCE_OPTIONS.map((p) => (
										<SelectItem key={p.value} value={p.value}>
											{p.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					</FormField>

					{/* Phone */}
					<FormField name="phone" label="Phone" control={control}>
						<Input placeholder="071 123 4567" className="input_userInfo" />
					</FormField>

					{/* Post Code */}
					<FormField name="postCode" label="Post Code" control={control}>
						<Input placeholder="1234" className="input_userInfo" />
					</FormField>

					{/* Email */}
					<FormField name="email" label="Email" control={control}>
						<Input placeholder="jrose@email.com" className="input_userInfo" />
					</FormField>

					{/* Country (Select) */}
					<FormField name="country" label="Country" control={control}>
						{({ field, id, describedById }) => (
							<Select
								value={typeof field.value === "string" ? field.value : ""}
								onValueChange={(val) => field.onChange(val)}
								aria-describedby={describedById ?? undefined}
							>
								<SelectTrigger id={id} className="selectTrigger_userInfo">
									<SelectValue placeholder="Select country" />
									<ChevronDown />
								</SelectTrigger>
								<SelectContent>
									{COUNTRY_OPTIONS.map((c) => (
										<SelectItem key={c.value} value={c.value}>
											{c.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}
					</FormField>

					{/* footer buttons full width span 2 columns on desktop */}
					<div className="footerWrap_userInfo">
						<div className="footerActions_userInfo">
							<button type="submit" className="primary">
								Save
							</button>
							<button
								type="button"
								className="ghost"
								onClick={() => {
									form.reset(defaultValues);
								}}
							>
								Reset
							</button>
						</div>
					</div>
				</form>
			</div>

			<div className="cardFooter_userInfo" aria-hidden>
				{/* optional small helper text */}
			</div>
		</div>
	);
}

export default UserInfoForm;
