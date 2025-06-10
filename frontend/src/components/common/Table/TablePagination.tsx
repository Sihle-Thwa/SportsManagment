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
        disabled={isFirst}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </Button>

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        className="btn btn--primary"
        disabled={isLast}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}
