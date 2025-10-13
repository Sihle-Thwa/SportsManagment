import React from "react";
import type { ColumnDef } from "./types";

export default function TableBody<T>({
	columns,
	rows,
	loading,
	sort,
	onSort,
	renderRow,
	// selection wiring
	toggleSelectAllVisible,
	isAllVisibleSelected,
	isSomeVisibleSelected,
}: {
	columns: ColumnDef<T>[];
	rows: T[];
	loading?: boolean;
	idField: string;
	sort?: { key: keyof T; dir: "asc" | "desc" } | null;
	onSort?: (key: keyof T) => void;
	renderRow: (row: T) => React.ReactNode;
	selectedMap?: Record<string, boolean>;
	toggleRow?: (id: string) => void;
	toggleSelectAllVisible?: () => void;
	isAllVisibleSelected?: boolean;
	isSomeVisibleSelected?: boolean;
}) {
	if (loading) {
		return (
			<div role="status" aria-live="polite" className="p-4">
				<div className="animate-pulse space-y-2">
					<div className="h-6 bg-gray-200 rounded" />
					<div className="h-6 bg-gray-200 rounded" />
					<div className="h-6 bg-gray-200 rounded" />
				</div>
			</div>
		);
	}

	return (
		<div className="overflow-x-auto border rounded">
			<table className="min-w-full" role="table" aria-label="Data table">
				<thead className="bg-surface">
					<tr>
						<th className="p-2 text-center">
							<input
								type="checkbox"
								aria-label={
									isAllVisibleSelected
										? "Unselect all visible rows"
										: "Select all visible rows"
								}
								checked={!!isAllVisibleSelected}
								ref={(el) => {
									if (!el) return;
									el.indeterminate =
										!!isSomeVisibleSelected && !isAllVisibleSelected;
								}}
								onChange={() => toggleSelectAllVisible?.()}
							/>
						</th>
						{columns.map((col) => (
							<th key={String(col.key)} className="p-2 text-left">
								{col.sortable ? (
									<button
										onClick={() => onSort?.(col.key)}
										className="inline-flex items-center gap-2"
									>
										<span>{col.header}</span>
										{sort?.key === col.key
											? sort.dir === "asc"
												? "▲"
												: "▼"
											: "⇅"}
									</button>
								) : (
									<span>{col.header}</span>
								)}
							</th>
						))}
						<th className="p-2 text-right">Actions</th>
					</tr>
				</thead>

				<tbody>
					{rows.length === 0 && (
						<tr>
							<td
								colSpan={columns.length + 2}
								className="p-6 text-center text-muted-foreground"
							>
								No rows
							</td>
						</tr>
					)}

					{rows.map((r) => renderRow(r))}
				</tbody>
			</table>
		</div>
	);
}
