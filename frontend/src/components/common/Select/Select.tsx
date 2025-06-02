import React from "react";
import { Select as ShadSelectBase, SelectContent as ShadSelectContent, SelectItem as ShadSelectItem, SelectTrigger as ShadSelectTrigger, SelectValue as ShadSelectValue } from "../../ui/select";



interface SelectProps {
    size?: "sm" | "md" | "lg" | "xl";
    withIcon?: boolean;
    iconPosition?: "left" | "right";
    icon?: React.ReactNode;
    fullWidth?: boolean;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    value?: string | number;
    onValueChange?: (value: string | number) => void;
    options?: {
        label: string;
        value: string | number;
        disabled?: boolean;
    }[];
}



const Select: React.FC<SelectProps> = (props) => {
    const {
        value,
        onValueChange,
        options = [],
        ...rest
    } = props;

    // Ensure value is always a string or undefined
    const stringValue = value !== undefined ? String(value) : undefined;

    // Ensure onValueChange returns a string or number as expected by SelectProps
    const handleValueChange = (val: string) => {
        if (onValueChange) {
            // Try to convert back to number if original value was a number
            const option = options.find(opt => String(opt.value) === val);
            if (option) {
                onValueChange(option.value);
            } else {
                onValueChange(val);
            }
        }
    };

    return (
        <ShadSelectBase
            value={stringValue}
            onValueChange={handleValueChange}
            {...rest}
        >
            <ShadSelectTrigger>
                <ShadSelectValue placeholder={props.placeholder} />
            </ShadSelectTrigger>
            <ShadSelectContent>
                {options.map(option => (
                    <ShadSelectItem
                        key={option.value}
                        value={String(option.value)}
                        disabled={option.disabled}
                    >
                        {option.label}
                    </ShadSelectItem>
                ))}
            </ShadSelectContent>
        </ShadSelectBase>
    );
};

Select.displayName = "Select";
export { Select, ShadSelectContent, ShadSelectItem, ShadSelectTrigger, ShadSelectValue };
