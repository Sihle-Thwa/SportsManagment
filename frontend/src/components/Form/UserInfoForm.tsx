"use client";
import { useForm, FormProvider } from "react-hook-form";
import "../Form/userinfoform.css";
import "../Form/formfield.css"; // ensure fields CSS loaded
import TextField from "./Fields/TextField";
import SelectField from "./Fields/SelectField";
import DateField from "./Fields/DateField";
import RadioGroupField from "./Fields/RadioGroupField";
import {
	UserInfoFormDefaultValues,
	validateUserInfo,
	GENDER_OPTIONS,
	PROVINCE_OPTIONS,
	COUNTRY_OPTIONS,
} from "../../utils/validators";

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
	const methods = useForm<FormValues>({ defaultValues, mode: "onBlur" });
	const {
		handleSubmit,
		reset,
		formState: { isSubmitting },
	} = methods;

	async function submit(data: FormValues) {
		const errors = validateUserInfo(data);
		if (Object.keys(errors).length > 0) {
			Object.entries(errors).forEach(([k, v]) =>
				methods.setError(k as keyof FormValues, { type: "manual", message: v }),
			);
			return;
		}
		await onSubmit(data);
	}

	return (
		<FormProvider {...methods}>
			<div className="cardBase_userInfo" aria-labelledby="user-info-title">
				<div className="cardHeader_userInfo">
					<div id="user-info-title" className="cardTitle_userInfo">
						{formTitle}
					</div>
					<div className="accentLine_userInfo" aria-hidden />
				</div>

				<div className="cardBody_userInfo">
					<form
						onSubmit={handleSubmit(submit)}
						className="formGrid_userInfo"
						noValidate
					>
						<TextField
							name="firstName"
							label="First name"
							placeholder="First name"
							className="formItem_userInfo"
						/>
						<TextField
							name="lastName"
							label="Last name"
							placeholder="Last name"
							className="formItem_userInfo"
						/>
						<TextField
							name="addressLine1"
							label="Address line 1"
							placeholder="Address 1"
							className="formItem_userInfo"
						/>
						<TextField
							name="addressLine2"
							label="Address line 2"
							placeholder="Address 2"
							className="formItem_userInfo"
						/>

						<RadioGroupField
							name="gender"
							label="Gender"
							className="formItem_userInfo"
							options={GENDER_OPTIONS.map((g) => ({
								value: g.value,
								label: g.label,
							}))}
							defaultValue={defaultValues.gender}
						/>

						<TextField
							name="city"
							label="Town / City"
							placeholder="Town / City"
							className="formItem_userInfo"
						/>

						<DateField
							className="formItem_userInfo"
							name="dateOfBirth"
							label="Date of birth"
						/>

						<SelectField
							className="formItem_userInfo"
							name="province"
							label="Province / State"
							options={PROVINCE_OPTIONS.map((p) => ({
								value: p.value,
								label: p.label,
							}))}
							placeholder="Select province"
						/>

						<TextField
							className="formItem_userInfo"
							name="phone"
							label="Phone"
							placeholder="071 123 4567"
						/>
						<TextField
							className="formItem_userInfo"
							name="postCode"
							label="Postal code"
							placeholder="Postal code"
						/>
						<TextField
							className="formItem_userInfo"
							name="email"
							label="Email"
							placeholder="you@email.com"
							type="email"
						/>

						<SelectField
							className="formItem_userInfo"
							name="country"
							label="Country"
							options={COUNTRY_OPTIONS.map((c) => ({
								value: c.value,
								label: c.label,
							}))}
							placeholder="Select country"
						/>

						<div className="cardFooter_userInfo" aria-hidden>
							<div className="footerActions_userInfo">
								<button
									type="submit"
									className="primary"
									disabled={isSubmitting}
								>
									Save
								</button>
								<button
									type="button"
									className="ghost"
									onClick={() => reset(defaultValues)}
								>
									Reset
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</FormProvider>
	);
}

export default UserInfoForm;
