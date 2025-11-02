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
  // When loading, show placeholder rows
  if (loading) {
    return (
      <tbody
        className="table-container table-body-content"
        role="rowgroup"
        aria-busy="true"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <tr key={i} className="table-body-row">
            <td className="table-body-cell--checkbox" />
            {columns.map((c) => (
              <td key={c.id} className="table-body-cell" />
            ))}
            <td className="table-body-cell--actions" />
          </tr>
        ))}
      </tbody>
    );
  }

  // Normal rendering
  return (
    <tbody className="table-container table-body-content" role="rowgroup">
      {rows.length === 0 ? (
        <tr className="table-body-empty">
          <td
            colSpan={columns.length + 2}
            className="table-body-empty__content"
          >
            No records found
          </td>
        </tr>
      ) : (
        rows.map((row) => {
          const id = getRowId(row);
          const key = String(id);
          const checked = !!selected[key];

          return (
            <tr
              key={key}
              className={`table-body-row ${checked ? "is-selected" : ""}`}
              aria-selected={checked}
            >
              <td className="table-body-cell--checkbox" key={`${key}-checkbox`}>
                <input
                  type="checkbox"
                  checked={checked}
                  aria-label={`Select row ${key}`}
                  onChange={() => onToggleRow(id)}
                />
              </td>

              {columns.map((col) => (
                <td key={col.id} className="table-body-cell">
                  {col.cell ? col.cell(row) : String(col.accessor?.(row) ?? "")}
                </td>
              ))}
              <td className="table-body-cell--actions">
                <button aria-label={`Edit row ${key}`}>
                  <Edit className="table-body-cell--edit__icon" />
                </button>
                <button aria-label={`Delete row ${key}`}>
                  <Delete className="table-body-cell--delete__icon" />
                </button>
              </td>
            </tr>
          );
        })
      )}
    </tbody>
  );
}
