export enum FieldType {
    Text = 'text',
    Email = 'email',
    Password = 'password',
    Number = 'number',
    Tel = 'tel',
    Date = 'date',
    Select = 'select',
    Radio = 'radio',
    Checkbox = 'checkbox',
    Textarea = 'textarea',
}

export interface FieldOption {
    label: string;
    value: string;
}

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

export interface FormConfig {
    title?: string;
    description?: string;
    fields: FormFieldConfig[];
    submitLabel?: string;
    cancelLabel?: string;
    onCancel?: () => void;
}
