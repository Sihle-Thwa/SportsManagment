import React from "react";
import { Select } from "../Select/Select";
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

    const handlePageChange = (val: string | number) => {
        const numeric = typeof val === "number" ? val : Number(val);
        if (!isNaN(numeric)) {
            onValueChange(numeric);
        }
    };

    return (
        <div className="relative w-full">
            <Select
                value={value}
                onValueChange={handlePageChange}
                options={transformedOptions}
                placeholder="Select page"
                iconPosition="right"
                variant="primary"
                className={className}
            />
        </div>
    );
};

PageSelect.displayName = "PageSelect";
export { PageSelect };
