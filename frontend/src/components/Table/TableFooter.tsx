import TablePagination from "./TablePagination";
import "../../styles/components/table.css";
import React from "react";

export type TableFooterProps = {
  pageIndex: number;
  pageCount: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (pageIndex: number) => void;
};

export default function TableFooter({
  pageIndex,
  pageCount,
  pageSize,
  totalItems,
  onPageChange,
}: TableFooterProps): React.JSX.Element {
  return (
    <footer
      className="table-footer"
      role="Table-Footer"
      aria-label="Table footer"
    >
      <div className="table-footer__center">
        <TablePagination
          pageIndex={pageIndex}
          pageCount={pageCount}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      </div>
    </footer>
  );
}
