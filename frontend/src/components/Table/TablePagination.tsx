import "./table.css";

type Props = {
	pageIndex: number;
	pageCount: number;
	onPageChange: (idx: number) => void;
};

export default function TablePagination({
	pageIndex,
	pageCount,
	onPageChange,
}: Props) {
	const pages = Array.from({ length: pageCount }, (_, i) => i);
	return (
		<nav aria-label="Pagination" className="pager" role="navigation">
			<button
				className="pager-link"
				onClick={() => onPageChange(Math.max(0, pageIndex - 1))}
				aria-label="Previous page"
			>
				Previous
			</button>

			<div className="pager-pages" role="group" aria-label="Page numbers">
				{pages.map((p) => (
					<button
						key={p}
						className={`pager-page ${p === pageIndex ? "active" : ""}`}
						aria-current={p === pageIndex ? "page" : undefined}
						onClick={() => onPageChange(p)}
					>
						{p + 1}
					</button>
				))}
			</div>

			<button
				className="pager-link"
				onClick={() => onPageChange(Math.min(pageCount - 1, pageIndex + 1))}
				aria-label="Next page"
			>
				Next
			</button>
		</nav>
	);
}
