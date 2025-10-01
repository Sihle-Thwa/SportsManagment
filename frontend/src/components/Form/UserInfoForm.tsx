// src/components/Form/UserInfoForm.tsx
"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
	validateUserInfo,
	UserInfoFormDefaultValues,
	GENDER_OPTIONS,
	COUNTRY_OPTIONS,
	PROVINCE_OPTIONS,
} from "../../utils/validators";

import { Button } from "../common/Button/Button";
import { Calendar } from "../../components/ui/calendar";
import { Form, FormControl } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../../components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "../../components/ui/popover";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { cn } from "../../lib/utils";
import { useForm } from "react-hook-form";
import { FormField } from "./FormField";
import "./userinfoform.css";

type FormValues = typeof UserInfoFormDefaultValues;

interface UserInfoFormProps {
	defaultValues?: typeof UserInfoFormDefaultValues;
	onSubmit: (formData: typeof UserInfoFormDefaultValues) => void;
	formTitle?: string;
}

export function UserInfoForm({
	defaultValues = UserInfoFormDefaultValues,
	onSubmit,
	formTitle = "User Information",
}: UserInfoFormProps) {
	const form = useForm<FormValues>({ defaultValues });
	const [validationErrors, setValidationErrors] = useState<
		Record<string, string>
	>({});

	const handleSubmit = (data: FormValues) => {
		const errors = validateUserInfo(data);
		if (Object.keys(errors).length === 0) {
			onSubmit(data);
			setValidationErrors({});
		} else {
			setValidationErrors(errors);
		}
	};

	useEffect(() => {
		Object.entries(validationErrors).forEach(([field, message]) => {
			form.setError(field as keyof FormValues, { type: "manual", message });
		});
	}, [validationErrors, form]);

	return (
		<Card className="cardBase">
			<CardHeader className="cardHeader">
				<CardTitle className="cardTitle">{formTitle}</CardTitle>
			</CardHeader>

			<CardContent className="cardBody">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="space-y-6"
					>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
							{/* First Name */}
							<FormField
								control={form.control}
								name="firstName"
								label="First Name"
								className=""
							>
								<Input placeholder="First Name" />
							</FormField>

							{/* Last Name */}
							<FormField
								control={form.control}
								name="lastName"
								label="Last Name"
							>
								<Input placeholder="Last Name" />
							</FormField>

							{/* Gender */}
							<FormField control={form.control} name="gender" label="Gender">
								<Select
									onValueChange={(val) => form.setValue("gender", val)}
									defaultValue={form.getValues().gender}
								>
									<FormControl>
										<SelectTrigger
											className={cn(
												validationErrors.gender && "border-red-500",
											)}
										>
											<SelectValue placeholder="Select gender" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{GENDER_OPTIONS.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormField>

							{/* Date of Birth */}
							<FormField
								control={form.control}
								name="dateOfBirth"
								label="Date of Birth"
							>
								<Popover>
									<PopoverTrigger asChild>
										<Button
											variant="ghost"
											className={cn(
												"pl-3 text-left font-normal w-full justify-between",
												!form.getValues().dateOfBirth &&
													"text-muted-foreground",
												validationErrors.dateOfBirth && "border-red-500",
											)}
										>
											{form.getValues().dateOfBirth ? (
												format(form.getValues().dateOfBirth, "PPP")
											) : (
												<span>Select date</span>
											)}
											<CalendarIcon className="ml-2 h-4 w-4" />
										</Button>
									</PopoverTrigger>

									<PopoverContent className="w-auto p-0" align="start">
										<Calendar
											mode="single"
											selected={form.getValues().dateOfBirth}
											onSelect={(d) => {
												if (d) form.setValue("dateOfBirth", d);
											}}
										/>
									</PopoverContent>
								</Popover>
							</FormField>

							{/* Phone */}
							<FormField control={form.control} name="phone" label="Phone">
								<Input type="tel" placeholder="Phone Number" />
							</FormField>

							{/* Email */}
							<FormField control={form.control} name="email" label="Email">
								<Input type="email" placeholder="Email Address" />
							</FormField>

							{/* Address Line 1 */}
							<FormField
								control={form.control}
								name="addressLine1"
								label="Address Line 1"
							>
								<Input placeholder="Address Line 1" />
							</FormField>

							{/* Address Line 2 */}
							<FormField
								control={form.control}
								name="addressLine2"
								label="Address Line 2 (Optional)"
							>
								<Input placeholder="Address Line 2" />
							</FormField>

							{/* City */}
							<FormField control={form.control} name="city" label="City">
								<Input placeholder="City" />
							</FormField>

							{/* Province */}
							<FormField
								control={form.control}
								name="province"
								label="Province"
							>
								<Select
									onValueChange={(val) => form.setValue("province", val)}
									defaultValue={form.getValues().province}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select Province" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{PROVINCE_OPTIONS.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormField>

							{/* Post Code */}
							<FormField
								control={form.control}
								name="postCode"
								label="Postal Code"
							>
								<Input placeholder="Postal Code" />
							</FormField>

							{/* Country */}
							<FormField control={form.control} name="country" label="Country">
								<Select
									onValueChange={(val) => form.setValue("country", val)}
									defaultValue={form.getValues().country}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select country" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{COUNTRY_OPTIONS.map((option) => (
											<SelectItem key={option.value} value={option.value}>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormField>
						</div>

						<CardFooter className="cardFooter">
							<div style={{ display: "flex", gap: 12 }}>
								<Button variant="primary" size="md">
									Submit
								</Button>
								<Button variant="tertiary" size="md">
									Reset
								</Button>
							</div>
						</CardFooter>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export default UserInfoForm;
