import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import "../formfield.css";
import { cn } from "../../../lib/utils";

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupFieldProps {
  name: string;
  label?: string;
  options: RadioOption[];
  className?: string;
  defaultValue?: string;
  orientation?: "horizontal" | "vertical";
}

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  name,
  label,
  options,
  defaultValue = "",
  orientation = "horizontal",
  className,
}) => {
  const { control, formState } = useFormContext();
  const err = formState.errors[name];

  function cnLocal(...args: (string | undefined | false)[]) {
    return args.filter(Boolean).join(" ");
  }

  return (
    <div className={cn("field", className)} data-field-name={name}>
      {label && (
        <div id={`${name}-label`} className="field__label">
          {label}
        </div>
      )}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => {
          return (
            <>
              <div
                role="radiogroup"
                aria-labelledby={label ? `${name}-label` : undefined}
                aria-describedby={fieldState.error ? `${err}-err` : undefined}
                className={cnLocal(
                  "radioGroup",
                  orientation === "horizontal"
                    ? "radioHorizontal"
                    : "radioVertical"
                )}
              >
                {options.map((opt) => {
                  const checked = String(field.value) === String(opt.value);
                  return (
                    <label className="radioItem" key={opt.value}>
                      <input
                        type="radio"
                        name={name}
                        value={opt.value}
                        checked={checked}
                        onChange={() => field.onChange(opt.value)}
                        onBlur={field.onBlur}
                        aria-checked={checked}
                      />
                      <span>{opt.label}</span>
                    </label>
                  );
                })}
              </div>

              {fieldState.error && (
                <div id={`${err}-err`} role="alert" className="field__error">
                  {String(fieldState.error.message ?? "Invalid selection")}
                </div>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default RadioGroupField;
