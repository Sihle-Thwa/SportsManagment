import { Button } from "../../common/Button/Button";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
}: TablePaginationProps) {
  const isFirst = currentPage <= 1;
  const isLast = currentPage >= totalPages;

  return (
    <div className="table-pagination">
      <Button
        className="btn btn--primary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isFirst}
      >
        Previous
      </Button>

      <span className="text-sm text-muted font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        className="btn btn--primary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLast}
      >
        Next
      </Button>
    </div>
  );
}
TablePagination.displayName = "TablePagination";
export default TablePagination;