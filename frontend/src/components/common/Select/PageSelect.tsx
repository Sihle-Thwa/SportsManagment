import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../../lib/utils";
import { Select } from "../Select"; // Update this path based on your folder structure

interface PageSelectProps {
    value: number;
    onValueChange: (value: number) => void;
    options: number[];
    className?: string;
}

const PageSelect: React.FC<PageSelectProps> = ({
    value,
    onValueChange,
    options,
    className,
}) => {
    const transformedOptions = options.map((page) => ({
        label: `${page}`,
        value: page,
    }));

    return (
        <div className="relative w-full">
            <Select
                value={value}
                onValueChange={(value) => {
                    if (typeof value === "number") {
                        onValueChange(value);
                    } else if (!isNaN(Number(value))) {
                        onValueChange(Number(value));
                    }
                }}
                options={transformedOptions}
                placeholder="Select page"
                withIcon
                icon={<ChevronDown className="select-icon" />}
                iconPosition="right"
                variant="select-primary" // 👈 Now controlled via prop
                className={className}
            />
        </div>
    );
};

PageSelect.displayName = "PageSelect";
export { PageSelect };
