import React from 'react';
import {
  FormControl,
  FormDescription,
  FormField as ShadcnFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Control, Path, FieldValues } from 'react-hook-form';

interface FormFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  description?: string;
  control: Control<T>;
  children: React.ReactNode;
}

export const FormField = <T extends FieldValues = FieldValues>({
  name,
  label,
  description,
  control,
  children,
}: FormFieldProps<T>) => {
  return (
    <ShadcnFormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="mb-4"> {/* Example Tailwind v4 spacing */}
          {label && (
            <FormLabel className="font-semibold text-base text-gray-800 dark:text-gray-200">
              {label}
            </FormLabel>
          )}
          <FormControl>
            {React.isValidElement(children)
              ? React.cloneElement(children as React.ReactElement, { ...field })
              : children}
          </FormControl>
          {description && (
            <FormDescription className="text-sm text-gray-500 dark:text-gray-400">
              {description}
            </FormDescription>
          )}
          <FormMessage className="text-red-500 text-xs mt-1" />
        </FormItem>
      )}
    />
  );
};