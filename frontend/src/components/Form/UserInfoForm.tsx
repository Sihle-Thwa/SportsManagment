// src/components/Form/UserInfoForm.tsx
"use client";
import React, { useEffect, useState } from "react";
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
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../../components/ui/form";
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
							{/* ... all FormField content unchanged ... */}
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
