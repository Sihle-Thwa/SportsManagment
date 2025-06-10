import { TableHead, TableHeader as UITableHeader, TableRow } from "../../ui/table";
import { TableColumn } from "./types";

interface TableHeaderProps<T> {
  columns: TableColumn<T>[];
  onSort?: (column: string) => void;
  sorting?: { column: string | null; direction: "asc" | "desc" | null };
  actions?: (item: T) => React.ReactNode;
}

export function TableHeader<T>({
  columns,
  onSort,
  sorting,
  actions,
}: TableHeaderProps<T>) {
  return (
    <UITableHeader className="table-header">
      <TableRow className="table-row">
        {columns.map((column, index) => {
          const isSorted = sorting?.column === column.accessorKey;
          return (
            <TableHead
              key={index}
              className={`table-cell ${column.className || ""} ${isSorted ? "table-head sorted" : ""}`}
              onClick={() => onSort?.(column.accessorKey as string)}
            >
              <span className="flex items-center gap-1 cursor-pointer select-none">
                {column.header}
                {isSorted && (
                  <span>{sorting.direction === "asc" ? "↑" : "↓"}</span>
                )}
              </span>
            </TableHead>
          );
        })}
        {actions && (
          <TableHead className="table-cell text-right whitespace-nowrap">
            Action
          </TableHead>
        )}
      </TableRow>
    </UITableHeader>
  );
}
TableHeader.displayName = "TableHeader";
export default TableHeader;