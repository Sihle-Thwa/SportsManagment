// src/components/Table/TableHeader.tsx
import { useEffect, useMemo, useState } from "react";
import { Search, Trash2 } from "lucide-react";
import "./table.css";

export default function TableHeader({
	pageSizeOptions = [10, 25, 50],
	pageSize,
	onPageSizeChange,
	onSearch,
	onAdd,
	selectedCount = 0,
	onBulkDelete,
}: {
	pageSizeOptions?: number[];
	pageSize: number;
	onPageSizeChange: (size: number) => void;
	onSearch: (query: string) => void;
	onAdd?: () => void;
	selectedCount?: number;
	onBulkDelete?: () => void;
}) {
	const [q, setQ] = useState("");
	useEffect(() => {
		const t = setTimeout(() => onSearch(q), 350);
		return () => clearTimeout(t);
	}, [q, onSearch]);

	const pageSizeOptionsList = useMemo(
		() => pageSizeOptions.map((s) => ({ value: s, label: String(s) })),
		[pageSizeOptions],
	);

	return (
		<div className="table-header" role="region" aria-label="Table controls">
			<div className="table-header__left">
				<label className="table-header__label" htmlFor="page-size-select">
					Show
				</label>
				<div className="select-wrapper">
					<select
						id="page-size-select"
						className="table-header__select"
						value={pageSize}
						onChange={(e) => onPageSizeChange(Number(e.target.value))}
						aria-label="Rows per page"
					>
						{pageSizeOptionsList.map((opt) => (
							<option key={opt.value} value={opt.value}>
								{opt.label}
							</option>
						))}
					</select>
				</div>
				<span className="table-header__label">entries</span>
				{selectedCount > 0 && (
					<div className="selected-summary" aria-live="polite">
						<button
							type="button"
							className={"button button--danger"}
							onClick={onBulkDelete}
							aria-label={`Delete ${selectedCount} selected member(s)`}
						>
							<Trash2 size={14} /> Delete selected ({selectedCount})
						</button>
					</div>
				)}
			</div>

			<div className="table-header__center">
				<div className="search-control">
					<Search className="search-icon" aria-hidden />
					<input
						type="search"
						value={q}
						onChange={(e) => setQ(e.target.value)}
						placeholder="Search..."
						aria-label="Search members"
						className="search-input"
					/>
				</div>
			</div>

			<div className="table-header__right">
				<button
					type="button"
					className={"button button--primary"}
					onClick={onAdd}
					aria-label="Add new member"
				>
					<span className="button__icon">＋</span>
					Add New Member
				</button>
			</div>
		</div>
	);
}
