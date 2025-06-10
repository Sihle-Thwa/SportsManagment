import { useState } from "react";
import { Input } from "../Input/input";
import { Search } from "lucide-react";


const TableSearch = ({
    value,
    onChange,
    placeholder = "Search Table...",
}: {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}) => {
    const [searchQuery, setSearchQuery] = useState(value);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchQuery(newValue);
        onChange(newValue);
    };

    return (
        <div className="flex flex-row justify-center items-center">
            <Input
                startIcon={Search}
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder={placeholder}
                className="input max-w-full w-full"
            />
        </div>
    );
}
export { TableSearch };