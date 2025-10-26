import type { ColumnDef, RowId } from "./types";
import "./table.css";
import { Edit, Delete } from "lucide-react";
type Props<T> = {
	columns: ColumnDef<T>[];
	rows: T[];
	getRowId: (r: T) => RowId;
	selected: Record<string | number, boolean>;
	onToggleRow: (id: RowId) => void;
	loading?: boolean;
};

export default function TableBody<T>({
	columns,
	rows,
	getRowId,
	selected,
	onToggleRow,
	loading,
}: Props<T>) {
	if (loading) {
		return (
			<tbody className="tableBody_tbody" role="rowgroup" aria-busy="true">
				{Array.from({ length: 6 }).map((_, i) => (
					<tr className="tableBody_tbody-row" role="row" key={i}>
						<td className="tableBody_tbody-cell-checkbox" role="cell">
							<div
								className="shimmer"
								style={{ width: 16, height: 16, borderRadius: 4 }}
							/>
						</td>
						{columns.map((col) => (
							<td key={col.id} className="tableBody_tbody-cell" role="cell">
								<div className="shimmer" style={{ width: 120, height: 16 }} />
							</td>
						))}
						<td className="tableBody_tbody-cell-actions" role="cell">
							<div className="shimmer" style={{ width: 80, height: 28 }} />
						</td>
					</tr>
				))}
			</tbody>
		);
	}

	return (
		<tbody className="tableBody_tbody" role="rowgroup">
			{rows.map((row) => {
				const id = getRowId(row);
				const checked = !!selected[id];
				return (
					<tr
						key={String(id)}
						className="tableBody_tbody-row"
						role="row"
						aria-selected={checked}
						tabIndex={0}
					>
						<td className="tableBody_tbody-cell-checkbox" role="cell">
							<input
								aria-label={`Select ${String(id)}`}
								type="checkbox"
								checked={checked}
								onChange={() => onToggleRow(id)}
							/>
						</td>

						{columns.map((col) => (
							<td
								key={col.id}
								className="tableBody_tbody-cell"
								role="cell"
								data-label={col.header}
							>
								{col.cell ? (
									col.cell(row)
								) : (
									<div className="tableBody_tbody-data">
										{String(col.accessor?.(row) ?? "")}
									</div>
								)}
							</td>
						))}

						<td className="tableBody_tbody-cell-actions" role="cell">
							<button
								aria-label={`Edit ${String(id)}`}
								title="Edit"
								className="tableBody_tbody-cell-actions-button-edit"
								onClick={() => {
									const e = new CustomEvent("table:edit", {
										detail: { id },
									});
									window.dispatchEvent(e);
								}}
							>
								<Edit className="tableBody_tbody-cell-actions-button-edit" />
							</button>
							<button
								aria-label={`Delete ${String(id)}`}
								title="Delete"
								className="tableBody_tbody-cell-actions-button-delete"
								onClick={() => {
									const e = new CustomEvent("table:delete", {
										detail: { id },
									});
									window.dispatchEvent(e);
								}}
							>
								<Delete className="tableBody_tbody-cell-actions-button-delete" />
							</button>
						</td>
					</tr>
				);
			})}

			{rows.length === 0 && (
				<tr className="table-empty" role="row">
					<td
						role="cell"
						colSpan={columns.length + 2}
						className="table-empty__content"
					>
						No results found
					</td>
				</tr>
			)}
		</tbody>
	);
}
