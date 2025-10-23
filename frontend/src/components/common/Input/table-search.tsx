import { useState, useEffect } from "react";

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

	// keep local state in sync if parent updates `value`
	useEffect(() => {
		setSearchQuery(value);
	}, [value]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value;
		setSearchQuery(newValue);
		onChange(newValue);
	};

	return (
		<div className="flex flex-row justify-center items-center w-full">
			<input
				type="text"
				className="w-full p-2 border rounded"
				placeholder={placeholder}
				value={searchQuery}
				onChange={handleChange}
			/>
		</div>
	);
};
export { TableSearch };
