// TableHeader.tsx
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import "../../styles/components/table.css";

export type TableHeaderProps = {
	pageSize: number;
	pageSizeOptions?: number[];
	onPageSizeChange?: (size: number) => void;
	onSearch?: (q: string) => void;
	onAdd?: () => void;
	onBulkDelete?: () => void;
	anySelected?: boolean;
	selectedCount?: number;
	searchPlaceholder?: string;
	debounceDelay?: number; // in ms (default 300ms)
};

export default function TableHeader({
	pageSize,
	pageSizeOptions = [10, 25, 50],
	onPageSizeChange,
	onSearch,
	onAdd,
	onBulkDelete,
	anySelected = false,
	selectedCount = 0,
	searchPlaceholder = "Search…",
	debounceDelay = 300,
}: TableHeaderProps) {
	const [searchTerm, setSearchTerm] = useState("");

	// 🔁 debounce the search updates
	useEffect(() => {
		const handle = setTimeout(() => {
			if (onSearch) onSearch(searchTerm.trim());
		}, debounceDelay);

		return () => clearTimeout(handle);
	}, [searchTerm, debounceDelay, onSearch]);

	return (
		<div className="table-header" role="toolbar" aria-label="Table controls">
			{/* -------- LEFT CONTROLS -------- */}
			<div className="table-header__left">
				{/* Entries selector */}
				<div
					className="table-header__select"
					role="group"
					aria-label="Rows per page"
				>
					<label htmlFor="table-pagesize" className="sr-only">
						Rows per page
					</label>
					<select
						id="table-pagesize"
						value={pageSize}
						onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
						className="table-header__select"
						aria-label="Rows per page"
						style={{
							appearance: "none",
							border: "none",
							background: "transparent",
						}}
					>
						{pageSizeOptions.map((opt) => (
							<option key={opt} value={opt}>
								{opt} / page
							</option>
						))}
					</select>
				</div>

				{/* Bulk actions */}
				{anySelected && (
					<div className="bulk-actions" aria-live="polite">
						<button
							type="button"
							className="button--danger"
							onClick={() => onBulkDelete?.()}
							aria-label={`Delete ${selectedCount} selected items`}
						>
							Delete ({selectedCount})
						</button>
					</div>
				)}
			</div>

			{/* -------- CENTER: SEARCH -------- */}
			<div className="table-header__center" role="search">
				<div className="search-input" style={{ width: "100%", maxWidth: 420 }}>
					<div className="search-input__wrap">
						<Search className="search-input__icon" aria-hidden />
						<input
							className="search-input__control"
							type="search"
							value={searchTerm}
							placeholder={searchPlaceholder}
							onChange={(e) => setSearchTerm(e.target.value)}
							aria-label="Search table"
						/>
					</div>
				</div>
			</div>

			{/* -------- RIGHT CONTROLS -------- */}
			<div className="table-header__right">
				<button
					type="button"
					className="table-header__button"
					onClick={() => onAdd?.()}
					aria-label="Add new item"
				>
					Add new
				</button>

				<button
					type="button"
					className="table-header__button table-header__button--secondary"
					onClick={() => console.log("Export triggered")}
					aria-label="Export table"
					title="Export"
				>
					Export
				</button>
			</div>
		</div>
	);
}
