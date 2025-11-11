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
        methods.setError(k as keyof FormValues, { type: "manual", message: v })
      );
      return;
    }
    onSubmit(data);
  }

  return (
    <FormProvider {...methods}>
      <div className="cardBase_userInfo" aria-labelledby="user-info-title">
        <div className="cardHeader_userInfo">
          <div  className="cardTitle_userInfo" id="user-info-title">
            {formTitle}
          </div>
          <div className="accentLine_userInfo" aria-hidden />
        </div>

        <form className="cardBody_userInfo" onSubmit={handleSubmit(submit)}>
          <div className="formColumns_userInfo">
            <div className="personalInfoColumn_userInfo">
              <TextField
                name="firstName"
                label="First name"
                placeholder="First name"
              />
              <TextField
                name="lastName"
                label="Last name"
                placeholder="Last name"
              />
              <RadioGroupField
                name="gender"
                label="Gender"
                options={GENDER_OPTIONS.map((g) => ({
                  value: g.value,
                  label: g.label,
                }))}
                defaultValue={defaultValues.gender}
              />
              <DateField name="dateOfBirth" label="Date of birth" />

              <TextField
                name="phone"
                label="Phone"
                placeholder="071 123 4567"
              />
              <TextField
                name="email"
                label="Email"
                placeholder="you@email.com"
                type="email"
              />
            </div>
            <div className="addressInfoColumn_userInfo">
              <TextField
                name="addressLine1"
                label="Address line 1"
                placeholder="Address 1"
              />
              <TextField
                name="addressLine2"
                label="Address line 2"
                placeholder="Address 2"
              />
              <TextField
                name="city"
                label="Town / City"
                placeholder="Town / City"
              />

              <SelectField
                name="province"
                label="Province / State"
                options={PROVINCE_OPTIONS.map((p) => ({
                  value: p.value,
                  label: p.label,
                }))}
                placeholder="Select province"
              />

              <TextField
                name="postCode"
                label="Postal code"
                placeholder="Postal code"
              />
              <SelectField
                name="country"
                label="Country"
                options={COUNTRY_OPTIONS.map((c) => ({
                  value: c.value,
                  label: c.label,
                }))}
                placeholder="Select country"
              />
            </div>
          </div>
        </form>

        <div className="footerActions_userInfo">
          <button
            type="submit"
            className="buttonSave_userInfo"
            disabled={isSubmitting}
          >
            Save
          </button>
          <button
            type="button"
            className="buttonReset_userInfo"
            onClick={() => reset(defaultValues)}
          >
            Reset
          </button>
        </div>
      </div>
    </FormProvider>
  );
}

export default UserInfoForm;
