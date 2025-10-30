import { Edit, Delete } from "lucide-react";
import type { ColumnDef, RowId } from "./types";
import "../../styles/components/table.css";

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
			<tbody className="table-body" role="rowgroup" aria-busy="true">
				{Array.from({ length: 6 }).map((_, i) => (
					<tr key={i} className="table-row shimmer">
						<td className="table-cell--checkbox shimmer" />
						{columns.map((c) => (
							<td key={c.id} className="table-cell shimmer" />
						))}
						<td className="table-cell--actions shimmer" />
					</tr>
				))}
			</tbody>
		);
	}

	return (
		<tbody className="table-body" role="rowgroup">
			{rows.map((row) => {
				const id = getRowId(row);
				const checked = !!selected[id];
				return (
					<tr
						key={String(id)}
						className={`table-row ${checked ? "is-selected" : ""}`}
						aria-selected={checked}
					>
						<td className="table-cell--checkbox">
							<input
								type="checkbox"
								checked={checked}
								aria-label={`Select row ${String(id)}`}
								onChange={() => onToggleRow(id)}
							/>
						</td>
						{columns.map((col) => (
							<td key={col.id} className="table-cell">
								{col.cell ? col.cell(row) : String(col.accessor?.(row) ?? "")}
							</td>
						))}
						<td className="table-cell--actions">
							<button
								className="table-action table-action--edit"
								aria-label={`Edit ${id}`}
							>
								<Edit />
							</button>
							<button
								className="table-action table-action--delete"
								aria-label={`Delete ${id}`}
							>
								<Delete />
							</button>
						</td>
					</tr>
				);
			})}
			{rows.length === 0 && (
				<tr className="table-empty">
					<td colSpan={columns.length + 2} className="table-empty__content">
						No records found
					</td>
				</tr>
			)}
		</tbody>
	);
}
