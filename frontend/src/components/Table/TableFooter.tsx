import TablePagination from "./TablePagination";
import "../../styles/components/table.css";

export type TableFooterProps = {
	totalItems: number;
	pageIndex: number;
	pageSize: number;
	pageCount: number;
	onPageChange: (index: number) => void;
};

export default function TableFooter({
	totalItems,
	pageIndex,
	pageSize,
	pageCount,
	onPageChange,
}: TableFooterProps) {
	const start = totalItems === 0 ? 0 : pageIndex * pageSize + 1;
	const end = Math.min(totalItems, (pageIndex + 1) * pageSize);

	return (
		<footer className="table-footer" role="contentinfo" aria-label="Table footer">
			<div className="table-footer__left" aria-live="polite">
				Showing <strong>{start}</strong>–<strong>{end}</strong> of{" "}
				<strong>{totalItems}</strong>
			</div>

			<div className="table-footer__center">
				<TablePagination
					pageIndex={pageIndex}
					pageCount={Math.max(1, pageCount)}
					onPageChange={onPageChange}
				/>
			</div>
		</footer>
	);
}
