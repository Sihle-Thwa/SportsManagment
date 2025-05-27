import { TableBody as UITableBody, TableCell, TableRow } from "../../ui/table";
import { TableColumn } from "./types";

interface TableBodyProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  actions?: (item: T) => React.ReactNode;
}

export function TableBody<T>({ data, columns, actions }: TableBodyProps<T>) {
  if (data.length === 0) {
    return (
      <UITableBody>
        <TableRow>
          <TableCell colSpan={columns.length + (actions ? 1 : 0)} className="h-24 text-center">
            No results found.
          </TableCell>
        </TableRow>
      </UITableBody>
    );
  }

  return (
    <UITableBody>
      {data.map((item, rowIndex) => (
        <TableRow key={rowIndex}>
          {columns.map((column, colIndex) => (
            <TableCell key={colIndex} className={column.className}>
              {column.cell 
                ? column.cell(item) 
                : typeof column.accessorKey === 'string' 
                  ? item[column.accessorKey as keyof T] as React.ReactNode 
                  : ''}
            </TableCell>
          ))}
          {actions && (
            <TableCell className="text-right">
              {actions(item)}
            </TableCell>
          )}
        </TableRow>
      ))}
    </UITableBody>
  );
}