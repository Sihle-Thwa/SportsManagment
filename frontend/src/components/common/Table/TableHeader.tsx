import { TableHead, TableHeader as UITableHeader, TableRow } from "../../ui/table";
import { TableColumn } from "./types";

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  onSort?: (column: string) => void;
  sorting?: { column: string | null; direction: 'asc' | 'desc' | null };
}

export function TableHeader<T>({ columns, onSort, sorting, actions }: TableHeaderProps<T> & { actions?: any }) {
  return (
    <UITableHeader className="table-head">
      <TableRow className="table-row">
        {columns.map((column, index) => (
          <TableHead
            key={index}
            className={`table-head ${column.className || ""}`}
            onClick={() => onSort?.(column.accessorKey as string)}
          >
            {column.header}
            {sorting?.column === column.accessorKey && (
              <span className="ml-1">{sorting.direction === "asc" ? "↑" : "↓"}</span>
            )}
          </TableHead>
        ))}
        {actions && (
          <TableHead className="table-head text-right whitespace-nowrap">Action</TableHead>
        )}
      </TableRow>
    </UITableHeader>
  );
}
