// Table.tsx
import React from "react";
import { Table as UITable } from "../../ui/table";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableControls, TableControlsProps } from "./TableControls";
import { TableFooter } from "./TableFooter";
import { TableColumn } from "./types";

interface SortConfig {
  column: string | null;
  direction: "asc" | "desc" | null;
}

interface TableProps<T> extends TableControlsProps {
  data: T[];
  columns: TableColumn<T>[];
  actions?: (item: T) => React.ReactNode;
  sorting?: SortConfig;
  onSort?: (column: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Table<T>({
  data,
  columns,
  actions,
  sorting,
  onSort,
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  searchTerm,
  onSearchChange,
  onAddNew,
  addNewLabel,
  pageOptions,
  searchPlaceholder,
}: TableProps<T>) {
  return (
    <div className="table-wrapper flex flex-col w-full h-full">
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

      <div className="table-container">
        <UITable className="table">
          <TableHeader
            columns={columns}
            sorting={sorting}
            onSort={onSort}
            actions={actions}
          />
          <TableBody data={data} columns={columns} actions={actions} />
        </UITable>
      </div>

      <TableFooter
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}

Table.displayName = "Table";
