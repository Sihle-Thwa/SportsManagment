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
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>{React.cloneElement(children as React.ReactElement, { ...field })}</FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};