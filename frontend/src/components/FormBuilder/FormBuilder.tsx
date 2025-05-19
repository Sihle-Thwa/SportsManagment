import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Define field types
export type FieldType = 
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'date'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'textarea';

// Define option type for select, radio, checkbox fields
export interface FieldOption {
  label: string;
  value: string;
}

// Define field configuration
export interface FormFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: FieldOption[];
  defaultValue?: unknown;
  description?: string;
  validations?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    patternMessage?: string;
  };
}

// Define form configuration
export interface FormConfig {
  title?: string;
  description?: string;
  fields: FormFieldConfig[];
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
}

interface FormBuilderProps {
  config: FormConfig;
  onSubmit: (data: unknown) => void;
  defaultValues?: Record<string, unknown>;
  className?: string;
}

export const FormBuilder = ({
  config,
  onSubmit,
  defaultValues = {},
  className
}: FormBuilderProps) => {
  // Generate Zod schema dynamically based on field config
  const generateSchema = () => {
    const schema: z.ZodRawShape = {};
    
    config.fields.forEach((field) => {
      let fieldSchema;
      
      // Base validation based on field type
      switch (field.type) {
        case 'text':
        case 'password':
        case 'tel':
        case 'textarea':
          fieldSchema = z.string();
          break;
        case 'email':
          fieldSchema = z.string().email(field.validations?.patternMessage || 'Invalid email address');
          break;
        case 'number':
          fieldSchema = z.number();
          break;
        case 'date':
          fieldSchema = z.date();
          break;
        case 'select':
        case 'radio':
          if (field.options && field.options.length > 0) {
            const values = field.options.map(opt => opt.value);
            fieldSchema = z.enum(values as [string, ...string[]]);
          } else {
            fieldSchema = z.string();
          }
          break;
        case 'checkbox':
          fieldSchema = z.boolean();
          break;
        default:
          fieldSchema = z.string();
      }
      
      // Apply additional validations if specified
      if (field.validations) {
        // Only apply string validations to string fields
        if (
          (field.type === 'text' ||
            field.type === 'email' ||
            field.type === 'password' ||
            field.type === 'tel' ||
            field.type === 'textarea') &&
          z.string()._def.typeName === (fieldSchema as z.ZodTypeAny)._def.typeName
        ) {
          if (field.validations.minLength) {
            fieldSchema = (fieldSchema as z.ZodString).min(field.validations.minLength, `Minimum ${field.validations.minLength} characters required`);
          }
          if (field.validations.maxLength) {
            fieldSchema = (fieldSchema as z.ZodString).max(field.validations.maxLength, `Maximum ${field.validations.maxLength} characters allowed`);
          }
          if (field.validations.pattern) {
            fieldSchema = (fieldSchema as z.ZodString).regex(
              new RegExp(field.validations.pattern),
              field.validations.patternMessage || 'Invalid format'
            );
          }
        }
        
        if (field.type === 'number') {
          if (field.validations.min !== undefined) {
            fieldSchema = (fieldSchema as z.ZodNumber).min(field.validations.min, `Minimum value is ${field.validations.min}`);
          }
          if (field.validations.max !== undefined) {
            fieldSchema = (fieldSchema as z.ZodNumber).max(field.validations.max, `Maximum value is ${field.validations.max}`);
          }
        }
      }
      
      // Make field optional or required
      schema[field.name] = field.required === false ? fieldSchema.optional() : fieldSchema;
    });
    
    return z.object(schema);
  };

  // Generate merged default values
  const generateDefaultValues = () => {
    const values: Record<string, unknown> = {};
    
    config.fields.forEach((field) => {
      // Use provided defaultValues if available, otherwise use field's defaultValue
      values[field.name] = defaultValues[field.name] !== undefined 
        ? defaultValues[field.name] 
        : field.defaultValue !== undefined
          ? field.defaultValue
          : getInitialValueByType(field);
    });
    
    return values;
  };

  // Get initial value based on field type
  const getInitialValueByType = (field: FormFieldConfig) => {
    switch (field.type) {
      case 'number':
        return 0;
      case 'checkbox':
        return false;
      case 'date':
        return new Date();
      case 'select':
      case 'radio':
        return field.options && field.options.length > 0 ? field.options[0].value : '';
      default:
        return '';
    }
  };

  const schema = generateSchema();
  const initialValues = generateDefaultValues();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  // Render specific field based on type
  const renderField = (field: FormFieldConfig) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'tel':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      
      case 'number':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder={field.placeholder}
                    onChange={(e) => formField.onChange(parseFloat(e.target.value))}
                    value={formField.value}
                    onBlur={formField.onBlur}
                    name={formField.name}
                    ref={formField.ref}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      
      case 'textarea':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      
      case 'select':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <Select onValueChange={formField.onChange} defaultValue={formField.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      
      case 'radio':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="space-y-3">
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={formField.onChange}
                    defaultValue={formField.value}
                    className="flex flex-col space-y-1"
                  >
                    {field.options?.map((option) => (
                      <FormItem key={option.value} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="font-normal">{option.label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      
      case 'checkbox':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{field.label}</FormLabel>
                </div>
              </FormItem>
            )}
          />
        );
      
      case 'date':
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="flex flex-col">
                <FormLabel>{field.label}</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !formField.value && "text-muted-foreground"
                        )}
                      >
                        {formField.value ? (
                          format(formField.value, "PPP")
                        ) : (
                          <span>{field.placeholder || "Pick a date"}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formField.value}
                      onSelect={formField.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={cn("space-y-6", className)}>
      {config.title && <h2 className="text-2xl font-bold">{config.title}</h2>}
      {config.description && <p className="text-gray-500">{config.description}</p>}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.fields.map((field) => renderField(field))}
          </div>
          
          <div className="flex justify-end space-x-2">
            {config.onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={config.onCancel}
              >
                {config.cancelLabel || "Cancel"}
              </Button>
            )}
            <Button type="submit">
              {config.submitLabel || "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};