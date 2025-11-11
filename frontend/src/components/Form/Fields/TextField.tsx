import React from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import { cn } from "../../../lib/utils";
import "../formfield.css";

export interface TextFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  type?: string;
  className?: string;
  rules?: RegisterOptions;
  disabled?: boolean;
  required?: boolean;
  autoComplete?: string;
}

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      label,
      placeholder,
      description,
      type = "text",
      rules,
      disabled = false,
      required = false,
      autoComplete = undefined,
    },
    ref
  ) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();

    const err = errors[name];
    const { ref: registerRef, ...registerProps } = register(name, rules);

    return (
      <div className="field" data-field-name={name}>
        {label && (
          <label className="field__label" htmlFor={name}>
            {label}
          </label>
        )}
        <input
          id={name}
          ref={(e) => {
            registerRef(e);
            if (ref) {
              if (typeof ref === "function") {
                ref(e);
              } else {
                ref.current = e;
              }
            }
          }}
          {...registerProps}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!err}
          aria-describedby={err ? `${name}-err` : undefined}
          disabled={disabled}
          required={required}
          className={cn("field__input", err && "error")}
          autoComplete={autoComplete}
        />
        {description && <div className="field__desc">{description}</div>}
        {err && (
          <div id={`${name}-err`} role="alert" className="field__error">
            {String(err.message ?? err.type ?? "Invalid")}
          </div>
        )}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;
