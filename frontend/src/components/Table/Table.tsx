import { useEffect, useMemo, useRef, useState } from "react";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import TableBody from "./TableBody";
import type { ColumnDef, RowId } from "./types";
import "../../styles/components/table.css";

export type TableProps<T> = {
	columns: ColumnDef<T>[];
	data: T[];
	getRowId: (row: T) => RowId;
	initialPageSize?: number;
	pageSizeOptions?: number[];
	loading?: boolean;
	onAdd?: () => void;
	onBulkDelete?: (ids: RowId[]) => Promise<void> | void;
	searchPlaceholder?: string;
};

type SortState = { id: string | null; direction: "asc" | "desc" | null };

export default function Table<T>({
	columns,
	data,
	getRowId,
	initialPageSize = 10,
	pageSizeOptions = [10, 25, 50],
	loading = false,
	onAdd,
	onBulkDelete,
	searchPlaceholder,
}: TableProps<T>) {
	const [query, setQuery] = useState("");
	const [pageSize, setPageSize] = useState(initialPageSize);
	const [pageIndex, setPageIndex] = useState(0);
	const [selected, setSelected] = useState<Record<string | number, boolean>>(
		{}
	);
	const [sort, setSort] = useState<SortState>({ id: null, direction: null });

	// Filter and sort logic
	const filtered = useMemo(() => {
		if (!query) return data;
		const q = query.toLowerCase();
		return data.filter((row) =>
			columns.some((col) => {
				const val = col.accessor
					? String(col.accessor(row) ?? "")
					: String((row as unknown as Record<string, unknown>)[col.id] ?? "");
				return val.toLowerCase().includes(q);
			})
		);
	}, [data, query, columns]);

	const sorted = useMemo(() => {
		if (!sort.id || !sort.direction) return filtered;
		const col = columns.find((c) => c.id === sort.id);
		if (!col) return filtered;
		const dir = sort.direction === "asc" ? 1 : -1;
		return [...filtered].sort((a, b) => {
			const A =
				(col.accessor
					? col.accessor(a)
					: (a as unknown as Record<string, unknown>)[col.id]) ?? "";
			const B =
				(col.accessor
					? col.accessor(b)
					: (b as unknown as Record<string, unknown>)[col.id]) ?? "";
			return String(A).localeCompare(String(B)) * dir;
		});
	}, [filtered, sort, columns]);

	// Pagination
	const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
	const paged = useMemo(() => {
		const start = pageIndex * pageSize;
		return sorted.slice(start, start + pageSize);
	}, [sorted, pageIndex, pageSize]);

	// Selection
	const pageIds = paged.map(getRowId);
	const allSelected = pageIds.every((id) => selected[id]);
	const someSelected = pageIds.some((id) => selected[id]) && !allSelected;

	function toggleSelectAll() {
		setSelected((prev) => {
			const next = { ...prev };
			if (allSelected) {
				pageIds.forEach((id) => delete next[id]);
			} else {
				pageIds.forEach((id) => (next[id] = true));
			}
			return next;
		});
	}

	function toggleRow(id: RowId) {
		setSelected((prev) => {
			const next = { ...prev };
			next[id] = !next[id];
			return next;
		});
	}

	async function handleBulkDelete() {
		if (onBulkDelete) {
			const ids = Object.keys(selected).filter((k) => selected[k]) as RowId[];
			await onBulkDelete(ids);
			setSelected({});
		}
	}

	const masterRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		if (masterRef.current) masterRef.current.indeterminate = someSelected;
	}, [someSelected]);

	return (
		<div className="table-root" role="region" aria-label="Data table">
			<div className="table-container">
				<div className="table-content">
					<TableHeader
						pageSize={pageSize}
						pageSizeOptions={pageSizeOptions}
						onPageSizeChange={setPageSize}
						onSearch={setQuery}
						onAdd={onAdd}
						onBulkDelete={handleBulkDelete}
						anySelected={Object.values(selected).some(Boolean)}
						selectedCount={
							Object.keys(selected).filter((k) => selected[k]).length
						}
						searchPlaceholder={searchPlaceholder}
					/>

					<table className="table-body" role="table">
						<thead className="table-head" role="rowgroup">
							<tr role="row" className="table-head__row">
								<th className="table-head__cell--checkbox">
									<input
										ref={masterRef}
										type="checkbox"
										aria-label="Select all"
										checked={allSelected}
										onChange={toggleSelectAll}
									/>
								</th>
								{columns.map((col) => {
									const isSorted = sort.id === col.id;
									return (
										<th
											key={col.id}
											className="table-head__cell"
											scope="col"
											aria-sort={
												isSorted
													? sort.direction === "asc"
														? "ascending"
														: "descending"
													: "none"
											}
										>
											<button
												className="table-head__cell--sortable"
												onClick={() =>
													setSort((s) =>
														s.id !== col.id
															? { id: col.id, direction: "asc" }
															: s.direction === "asc"
																? { id: col.id, direction: "desc" }
																: { id: null, direction: null }
													)
												}
											>
												{col.header}
												<span
													className={`sort-indicator ${isSorted ? "active" : ""}`}
												>
													{isSorted
														? sort.direction === "asc"
															? "▲"
															: "▼"
														: "↕"}
												</span>
											</button>
										</th>
									);
								})}
								<th className="table-head__cell">Actions</th>
							</tr>
						</thead>

						<TableBody
							columns={columns}
							rows={paged}
							getRowId={getRowId}
							selected={selected}
							onToggleRow={toggleRow}
							loading={loading}
						/>
					</table>

					<TableFooter
						totalItems={sorted.length}
						pageIndex={pageIndex}
						pageSize={pageSize}
						pageCount={pageCount}
						onPageChange={setPageIndex}
					/>
				</div>
			</div>
		</div>
	);
}
