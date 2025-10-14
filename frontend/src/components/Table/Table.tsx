import { useEffect, useMemo, useRef, useState } from "react";
import TableHeader from "./TableHeader";
import TableFooter from "./TableFooter";
import TableBody from "./TableBody";
import type { ColumnDef, RowId } from "./types";
import "./table.css";

/* simple debounce hook */
function useDebounced<T>(value: T, delay = 300) {
	const [v, setV] = useState(value);
	useEffect(() => {
		const id = setTimeout(() => setV(value), delay);
		return () => clearTimeout(id);
	}, [value, delay]);
	return v;
}

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
	const debouncedQuery = useDebounced(query, 250);

	const [pageSize, setPageSize] = useState(initialPageSize);
	const [pageIndex, setPageIndex] = useState(0);

	// selection map
	const [selected, setSelected] = useState<Record<string | number, boolean>>(
		{},
	);

	// sort state
	const [sort, setSort] = useState<SortState>({ id: null, direction: null });

	// Derived: filtering
	const filtered = useMemo(() => {
		if (!debouncedQuery) return data;
		const q = debouncedQuery.toLowerCase();
		return data.filter((row) =>
			columns.some((col) => {
				const v = col.accessor
					? String(col.accessor(row) ?? "")
					: String((row as Record<string, unknown>)[col.id] ?? "");
				return v.toLowerCase().includes(q);
			}),
		);
	}, [data, debouncedQuery, columns]);

	// Derived: sorting
	const sorted = useMemo(() => {
		if (!sort.id || !sort.direction) return filtered;
		const col = columns.find((c) => c.id === sort.id);
		if (!col) return filtered;

		const direction = sort.direction === "asc" ? 1 : -1;
		return [...filtered].sort((a, b) => {
			const aVal = col.accessor
				? col.accessor(a)
				: (a as Record<string, unknown>)[col.id];
			const bVal = col.accessor
				? col.accessor(b)
				: (b as Record<string, unknown>)[col.id];

			const A = aVal == null ? "" : String(aVal).toLowerCase();
			const B = bVal == null ? "" : String(bVal).toLowerCase();
			if (A < B) return -1 * direction;
			if (A > B) return 1 * direction;
			return 0;
		});
	}, [filtered, sort, columns]);

	const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));
	useEffect(() => {
		if (pageIndex >= pageCount) setPageIndex(0);
	}, [pageCount, pageIndex]);

	const paged = useMemo(() => {
		const start = pageIndex * pageSize;
		return sorted.slice(start, start + pageSize);
	}, [sorted, pageIndex, pageSize]);

	// selection helpers
	const pageIds = paged.map(getRowId);
	const allOnPageSelected =
		pageIds.length > 0 && pageIds.every((id) => !!selected[id]);
	const someOnPageSelected =
		pageIds.some((id) => !!selected[id]) && !allOnPageSelected;

	function toggleSelectAllOnPage() {
		setSelected((prev) => {
			const next = { ...prev };
			if (allOnPageSelected) {
				for (const id of pageIds) delete next[id];
			} else {
				for (const id of pageIds) next[id] = true;
			}
			return next;
		});
	}

	function toggleRow(id: RowId) {
		setSelected((prev) => {
			const next = { ...prev };
			if (next[id]) delete next[id];
			else next[id] = true;
			return next;
		});
	}

	async function handleBulkDelete() {
		if (!onBulkDelete) return;
		const ids = Object.keys(selected).filter((k) => selected[k]) as RowId[];
		await onBulkDelete(ids);
		setSelected({});
	}

	function toggleSort(columnId: string, sortable?: boolean) {
		if (!sortable) return;
		setSort((s) => {
			if (s.id !== columnId) return { id: columnId, direction: "asc" };
			if (s.direction === "asc") return { id: columnId, direction: "desc" };
			return { id: null, direction: null };
		});
	}

	// For indeterminate master checkbox
	const masterRef = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		if (masterRef.current) masterRef.current.indeterminate = someOnPageSelected;
	}, [someOnPageSelected]);

	return (
		<div className="tableRoot" role="region" aria-label="Data table">
			<div className="tableContainer">
				<div className="tableContent">
					<TableHeader
						pageSize={pageSize}
						pageSizeOptions={pageSizeOptions}
						onPageSizeChange={(n) => {
							setPageSize(n);
							setPageIndex(0);
						}}
						onSearch={(q) => {
							setQuery(q);
							setPageIndex(0);
						}}
						searchValue={query}
						onAdd={onAdd}
						onBulkDelete={handleBulkDelete}
						anySelected={Object.values(selected).some(Boolean)}
						selectedCount={
							Object.keys(selected).filter((k) => selected[k]).length
						}
						onClearSearch={() => setQuery("")}
						searchPlaceholder={searchPlaceholder}
					/>

					{/* semantic table */}
					<table
						className="tableBody_tbody"
						role="table"
						aria-label="table-data"
					>
						<thead className="tableBody_thead" role="rowgroup">
							<tr role="row" className="tableBody_thead-row">
								<th
									className="tableBody_thead-cell-checkbox"
									role="columnheader"
								>
									<input
										ref={masterRef}
										type="checkbox"
										aria-label="Select all rows on this page"
										checked={allOnPageSelected}
										onChange={toggleSelectAllOnPage}
									/>
								</th>

								{columns.map((col) => {
									const isSorted = sort.id === col.id;
									return (
										<th
											key={col.id}
											scope="col"
											role="columnheader"
											className="tableBody_thead-cell"
											style={{ width: col.width }}
											aria-sort={
												isSorted
													? sort.direction === "asc"
														? "ascending"
														: "descending"
													: "none"
											}
										>
											<button
												type="button"
												className="tableBody_thead-cell-sortable"
												onClick={() => toggleSort(col.id, col.sortable)}
												aria-label={
													col.sortable ? `${col.header} sortable` : col.header
												}
											>
												<span>{col.header}</span>
												<span
													className={`sort-indicator ${
														isSorted ? "active" : ""
													}`}
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

								<th
									className="tableBody_thead-cell-actions"
									role="columnheader"
								>
									Action
								</th>
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
						onPageChange={(idx) => setPageIndex(idx)}
						pageCount={pageCount}
					/>
				</div>
			</div>
		</div>
	);
}
