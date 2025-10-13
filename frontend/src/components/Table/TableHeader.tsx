import { useEffect, useState } from "react";
import { Search, Trash2, Plus } from "lucide-react";

export default function TableHeader({
	pageSizeOptions = [10, 25, 50],
	pageSize,
	onPageSizeChange,
	query,
	onQueryChange,
	onAdd,
	selectedCount = 0,
	onBulkDelete,
}: {
	pageSizeOptions?: number[];
	pageSize: number;
	onPageSizeChange: (n: number) => void;
	query: string;
	onQueryChange: (q: string) => void;
	onAdd?: () => void;
	selectedCount?: number;
	onBulkDelete?: () => void;
}) {
	const [localQ, setLocalQ] = useState(query);
	useEffect(() => setLocalQ(query), [query]);

	useEffect(() => {
		const t = setTimeout(() => onQueryChange(localQ), 300);
		return () => clearTimeout(t);
	}, [localQ, onQueryChange]);

	return (
		<div className="flex items-center justify-between mb-3">
			<div className="flex items-center gap-3">
				<label htmlFor="pageSize" className="sr-only">
					Rows per page
				</label>
				<select
					id="pageSize"
					value={pageSize}
					onChange={(e) => onPageSizeChange(Number(e.target.value))}
					className="rounded border px-2 py-1"
				>
					{pageSizeOptions.map((s) => (
						<option key={s} value={s}>
							{s}
						</option>
					))}
				</select>
				<span className="text-sm text-muted-foreground">entries</span>

				{selectedCount > 0 && (
					<button
						onClick={onBulkDelete}
						className="ml-3 inline-flex items-center gap-2 rounded px-3 py-1 text-sm"
						aria-label={`Delete ${selectedCount} selected`}
					>
						<Trash2 size={14} /> Delete selected ({selectedCount})
					</button>
				)}
			</div>

			<div className="flex items-center gap-3">
				<div className="relative">
					<Search className="absolute left-2 top-1/2 -translate-y-1/2 opacity-60" />
					<input
						type="search"
						placeholder="Search..."
						value={localQ}
						onChange={(e) => setLocalQ(e.target.value)}
						className="pl-8 pr-3 py-1 rounded border"
						aria-label="Search table"
					/>
				</div>

				<button
					onClick={onAdd}
					className="inline-flex items-center gap-2 rounded bg-primary px-3 py-1 text-white"
					aria-label="Add new"
				>
					<Plus size={14} /> Add New
				</button>
			</div>
		</div>
	);
}
