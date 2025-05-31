import { TableHead, TableHeader as UITableHeader, TableRow } from "../../ui/table";
import { TableColumn } from "./types";

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  onSort?: (column: string) => void;
  sorting?: { column: string | null; direction: 'asc' | 'desc' | null };
}

export function TableHeader<T>({ columns, onSort, sorting }: TableHeaderProps<T>) {
  return (
    <UITableHeader className="table-header">
      <TableRow className="table-row">
        {columns.map((column, index) => (
          <TableHead
            key={index}
            className={`table-head ${column.className}`}
            onClick={() => onSort && onSort(column.accessorKey as string)}
          >
            {column.header}
            {sorting && sorting.column === column.accessorKey && (
              <span className="ml-1">
                {sorting.direction === 'asc' ? '↑' : '↓'}
              </span>
            )}
          </TableHead>
        ))}
        {/* If there are actions, add an extra header cell */}
        <TableHead className="table-head text-right">Action</TableHead>
      </TableRow>
    </UITableHeader>
  );
}