import { Pagination } from "../Pagination/Pagination";

import { cn } from "../../../lib/utils";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  variant?: "pagination-primary" | "pagination-secondary" | "pagination-tertiary";
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  variant = "pagination-primary"
}: TablePaginationProps) {
  const pageNumbers: number[] = [];
  const maxPages = 5;

  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
  } else {
    if (currentPage <= 3) {
      for (let i = 1; i <= maxPages; i++) pageNumbers.push(i);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - maxPages + 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pageNumbers.push(i);
    }
  }

  return (
    <Pagination
      className="pagination-base"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      variant={variant}
    />
  );
}
