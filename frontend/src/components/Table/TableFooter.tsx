import TablePagination from "./TablePagination";
import "./table.css";

type Props = {
	totalItems: number;
	pageIndex: number;
	pageSize: number;
	onPageChange: (idx: number) => void;
	pageCount: number;
};

export default function TableFooter({
	totalItems,
	pageIndex,
	pageSize,
	onPageChange,
	pageCount,
}: Props) {
	return (
		<div className="table-footer" role="contentinfo" aria-label="Table footer">
			<div className="table-footer__left">
				Showing {totalItems === 0 ? 0 : pageIndex * pageSize + 1} -{" "}
				{Math.min((pageIndex + 1) * pageSize, totalItems)} of {totalItems}
			</div>

			<div className="table-footer__center">
				<TablePagination
					pageIndex={pageIndex}
					pageCount={pageCount}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	);
}
