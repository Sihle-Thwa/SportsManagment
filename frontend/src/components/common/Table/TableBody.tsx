import { resolveCellValue } from "../../../lib/utils";
import { TableBody as UITableBody, TableCell, TableRow } from "../../ui/table";
import { EmptyState } from "./TableEmptyState";
import { TableColumn } from "./types";

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: (item: T) => React.ReactNode;
}

export function TableBody<T>({ data, columns, actions }: TableBodyProps<T>) {

  if (data.length === 0) {
    return (
      <UITableBody className="table-body">
        <TableRow className="table-row">
          <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="table-cell">
            <EmptyState message="No data available for this table." />
          </TableCell>
        </TableRow>
      </UITableBody>
    );
  }
  return (
    <UITableBody className="table-body">
      {data.map((item, rowIndex) => (
        <TableRow key={rowIndex} className="table-row">
          {columns.map((column, colIndex) => (
            <TableCell key={colIndex} className={`table-cell ${column.className || ""}`}>
              {typeof column.cell === "function"
                ? column.cell(item)
                : resolveCellValue(item, column.accessorKey as keyof T)}
            </TableCell>

          ))}
          {actions && (
            <TableCell className=" table-cell">
              {actions(item)}
            </TableCell>
          )}
        </TableRow>
      ))}
    </UITableBody>
  );
}