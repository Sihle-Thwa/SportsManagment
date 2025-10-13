// src/components/Table/Table.tsx
import React, { useEffect, useMemo, useState } from "react";
import type { ColumnDef } from "./types";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";

export interface TableProps<T> {
	columns: ColumnDef<T>[];
	data: T[];
	idField: keyof T;
	loading?: boolean;
	initialPageSize?: number;
	pageSizeOptions?: number[];
	onSearch?: (q: string) => void;
	onDelete?: (id: string) => void;
	onDeleteMany?: (ids: string[]) => Promise<void> | void;
	onEdit?: (id: string) => void;
	renderRow?: (row: T) => React.ReactNode; // optional custom row renderer
	className?: string;
}

export default function Table<T extends Record<string, unknown>>({
	columns,
	data,
	idField,
	loading = false,
	initialPageSize = 10,
	pageSizeOptions = [10, 25, 50],
	onSearch,
	onDelete,
	onDeleteMany,
	onEdit,
	renderRow,
	className,
}: TableProps<T>) {
	const [query, setQuery] = useState("");
	const [pageSize, setPageSize] = useState(initialPageSize);
	const [pageIndex, setPageIndex] = useState(0);
	const [sort, setSort] = useState<{
		key: keyof T;
		dir: "asc" | "desc";
	} | null>(null);
	const [selected, setSelected] = useState<Record<string, boolean>>({});

	// debounce search upward
	useEffect(() => {
		const t = setTimeout(() => {
			onSearch?.(query);
			setPageIndex(0);
		}, 350);
		return () => clearTimeout(t);
	}, [query, onSearch]);

	// derive filtered / sorted
	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		let rows = data;
		if (q) {
			rows = rows.filter((r) =>
				Object.values(r).some((v) =>
					String(v ?? "")
						.toLowerCase()
						.includes(q),
				),
			);
		}
		if (sort) {
			rows = [...rows].sort((a, b) => {
				const A = String(a[sort.key] ?? "").toLowerCase();
				const B = String(b[sort.key] ?? "").toLowerCase();
				if (A < B) return sort.dir === "asc" ? -1 : 1;
				if (A > B) return sort.dir === "asc" ? 1 : -1;
				return 0;
			});
		}
		return rows;
	}, [data, query, sort]);

	const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
	const pageIndexSafe = Math.min(pageIndex, pageCount - 1);
	const pageRows = useMemo(() => {
		const start = pageIndexSafe * pageSize;
		return filtered.slice(start, start + pageSize);
	}, [filtered, pageIndexSafe, pageSize]);

	// selection helpers
	const selectedIds = useMemo(
		() => Object.keys(selected).filter((k) => selected[k]),
		[selected],
	);
	const isAllVisibleSelected =
		pageRows.length > 0 &&
		pageRows.every((r) => !!selected[String(r[idField])]);
	const isSomeVisibleSelected =
		pageRows.some((r) => !!selected[String(r[idField])]) &&
		!isAllVisibleSelected;

	const toggleRow = (id: string) =>
		setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
	const toggleSelectAllVisible = () =>
		setSelected((prev) => {
			const copy = { ...prev };
			if (isAllVisibleSelected) {
				pageRows.forEach((r) => delete copy[String(r[idField])]);
			} else {
				pageRows.forEach((r) => (copy[String(r[idField])] = true));
			}
			return copy;
		});

	const handleDeleteMany = async () => {
		if (selectedIds.length === 0) return;
		if (!confirm(`Delete ${selectedIds.length} selected items?`)) return;
		try {
			if (onDeleteMany) {
				await onDeleteMany(selectedIds);
			}
			// optimistic local cleanup if parent didn't re-fetch
			// caller can re-fetch, here we clear selection
			setSelected({});
		} catch (err) {
			console.error(err);
		}
	};

	const handleDeleteOne = (id: string) => {
		if (onDelete) onDelete(id);
		// optimistic clean selection
		setSelected((prev) => {
			const cp = { ...prev };
			delete cp[id];
			return cp;
		});
	};

	// expose renderRow fallback
	const defaultRenderRow = (row: T) => (
		<tr key={String(row[idField])} className="even:bg-white odd:bg-transparent">
			<td className="p-2 text-center">
				<input
					type="checkbox"
					aria-label={`Select row ${String(row[idField])}`}
					checked={!!selected[String(row[idField])]}
					onChange={() => toggleRow(String(row[idField]))}
				/>
			</td>
			{columns.map((col) => (
				<td key={String(col.key)} className="p-2">
					{col.render ? col.render(row) : String(row[col.key])}
				</td>
			))}
			<td className="p-2 text-right space-x-2">
				{onEdit && (
					<button
						onClick={() => onEdit(String(row[idField]))}
						aria-label="Edit"
						className="px-2 py-1 rounded"
					>
						Edit
					</button>
				)}
				<button
					onClick={() => handleDeleteOne(String(row[idField]))}
					aria-label="Delete"
					className="px-2 py-1 rounded text-destructive"
				>
					Delete
				</button>
			</td>
		</tr>
	);

	return (
		<div className={className}>
			<TableHeader
				pageSizeOptions={pageSizeOptions}
				pageSize={pageSize}
				onPageSizeChange={(s) => {
					setPageSize(s);
					setPageIndex(0);
				}}
				query={query}
				onQueryChange={(q) => setQuery(q)}
				onAdd={() => {}}
				selectedCount={selectedIds.length}
				onBulkDelete={handleDeleteMany}
			/>

			<TableBody
				columns={columns}
				rows={pageRows}
				loading={loading}
				idField={idField as string}
				sort={sort}
				onSort={(key) => {
					setSort((prev) => {
						if (!prev || prev.key !== key) return { key, dir: "asc" };
						return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
					});
				}}
				renderRow={renderRow ? (r) => renderRow(r) : defaultRenderRow}
				// selection wiring
				selectedMap={selected}
				toggleRow={toggleRow}
				toggleSelectAllVisible={toggleSelectAllVisible}
				isAllVisibleSelected={isAllVisibleSelected}
				isSomeVisibleSelected={isSomeVisibleSelected}
			/>

			<TableFooter
				pageIndex={pageIndexSafe}
				pageCount={pageCount}
				pageSize={pageSize}
				onPageChange={(idx) => setPageIndex(idx)}
				selectedCount={selectedIds.length}
				onBulkDelete={handleDeleteMany}
			/>
		</div>
	);
}
