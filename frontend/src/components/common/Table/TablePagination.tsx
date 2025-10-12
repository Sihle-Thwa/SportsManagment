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
			<button
				className="btn btn--primary"
				onClick={() => onPageChange(currentPage - 1)}
				disabled={isFirst}
			>
				Previous
			</button>

			<span className="text-sm text-muted font-medium">
				Page {currentPage} of {totalPages}
			</span>

			<button
				className="btn btn--primary"
				onClick={() => onPageChange(currentPage + 1)}
				disabled={isLast}
			>
				Next
			</button>
		</div>
	);
}
TablePagination.displayName = "TablePagination";
export default TablePagination;
