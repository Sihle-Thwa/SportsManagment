import React from "react";
import { cn } from "../../../lib/utils"; // Assuming you have a utility for class names
import { ChevronDown } from "lucide-react"; // Importing an icon for the dropdown

interface PageSelectProps {
    value: number;
    onValueChange: (value: number) => void;
    options: number[]; // Array of page numbers
    className?: string;
}

const PageSelect: React.FC<PageSelectProps> = ({
    value,
    onValueChange,
    options,
    className,
}) => {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onValueChange(Number(e.target.value))}
                className={cn("select-base select-primary", className)}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
            <ChevronDown className="select-icon" />
        </div>
    );
};

PageSelect.displayName = "PageSelect";
export { PageSelect };
