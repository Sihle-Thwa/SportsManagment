import { Table as UITable, TableFooter } from "../../ui/table";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableControls, TableControlsProps } from "./TableControls";
import { TableColumn } from "./types";
import { TablePagination } from "./TablePagination";

interface TableProps<T> extends TableControlsProps {
  data: T[];
  columns: TableColumn<T>[];
  actions?: (item: T) => React.ReactNode;
  sorting?: { column: string | null; direction: "asc" | "desc" | null };
  onSort?: (column: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}


export function TableBuilder<T>({
  data,
  columns,
  actions,
  sorting,
  onSort,
  itemsPerPage,
  onItemsPerPageChange,
  searchTerm,
  onSearchChange,
  onAddNew,
  addNewLabel,
  pageOptions,
  searchPlaceholder,
  className,
  currentPage,
  totalPages,
  onPageChange,
}: TableProps<T>) {
  return (
    <div className={`table-wrapper space-y-4 ${className}`}>
      {/* Table Controls */}
      <TableControls
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onAddNew={onAddNew}
        addNewLabel={addNewLabel}
        pageOptions={pageOptions}
        searchPlaceholder={searchPlaceholder}
      />

      {/* Table Container */}
      <div className="overflow-auto rounded-md border border-border-muted">
        <UITable className="table-primary w-full">
          <TableHeader columns={columns} sorting={sorting} onSort={onSort} actions={actions} />
          <TableBody data={data} columns={columns} actions={actions} />
        </UITable>
      </div>
      {/* Table Footer */}
      <TableFooter className="bg-background border-t border-border-muted">
        <div className="flex items-center justify-between p-4">
          <span className="text-sm text-muted">
            {data.length} {data.length === 1 ? "item" : "items"} found
          </span>
        </div>
      </TableFooter>
      {data.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}

    </div>
  );
}
TableBuilder.displayName = "TableBuilder";
export type { TableProps, TableColumn };