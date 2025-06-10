import { Table as UITable } from "../../ui/table";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableControls, TableControlsProps } from "./TableControls";
import { TableColumn } from "./types";
import React from "react";
import { TableFooter } from "./TableFooter";

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
      <div className="table-container ">
        <UITable className="table w-full">
          <TableHeader columns={columns} sorting={sorting} onSort={onSort} actions={actions} />
          <TableBody data={data} columns={columns} actions={actions} />
          {/* Table Footer */}
          <TableFooter currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />

        </UITable>
      </div>


    </div>
  );
}
TableBuilder.displayName = "TableBuilder";
