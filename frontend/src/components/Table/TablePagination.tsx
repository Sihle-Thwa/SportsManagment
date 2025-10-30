// TablePagination.tsx
import "../../styles/components/table.css";

export type TablePaginationProps = {
	pageIndex: number;
	pageCount: number;
	onPageChange: (newIndex: number) => void;
	ariaLabel?: string;
	siblingCount?: number; // pages shown around current
};

function pageRange(current: number, total: number, sib = 1) {
	const start = Math.max(0, current - sib);
	const end = Math.min(total - 1, current + sib);
	const arr: number[] = [];
	for (let i = start; i <= end; i++) arr.push(i);
	return arr;
}

export default function TablePagination({
	pageIndex,
	pageCount,
	onPageChange,
	ariaLabel = "Table pagination",
	siblingCount = 1,
}: TablePaginationProps) {
	const prevDisabled = pageIndex <= 0;
	const nextDisabled = pageIndex >= pageCount - 1;
	const pages = pageRange(pageIndex, pageCount, siblingCount);

	return (
		<nav
			className="pager"
			role="navigation"
			aria-label={ariaLabel}
			aria-live="polite"
		>
			<button
				type="button"
				className="pager-link"
				onClick={() => onPageChange(Math.max(0, pageIndex - 1))}
				aria-label="Previous page"
				disabled={prevDisabled}
			>
				◀
			</button>

			<div className="pager-pages" role="list">
				{/* first page shortcut */}
				{pageIndex - siblingCount > 1 && (
					<>
						<button
							type="button"
							className="pager-page"
							onClick={() => onPageChange(0)}
							aria-label={`Go to page 1`}
						>
							1
						</button>
						<span aria-hidden>…</span>
					</>
				)}

				{pages.map((p) => (
					<button
						key={p}
						type="button"
						role="listitem"
						className={`pager-page ${p === pageIndex ? "active" : ""}`}
						onClick={() => onPageChange(p)}
						aria-current={p === pageIndex ? "page" : undefined}
						aria-label={`Go to page ${p + 1}`}
					>
						{p + 1}
					</button>
				))}

				{/* last page shortcut */}
				{pageIndex + siblingCount < pageCount - 2 && (
					<>
						<span aria-hidden>…</span>
						<button
							type="button"
							className="pager-page"
							onClick={() => onPageChange(pageCount - 1)}
							aria-label={`Go to page ${pageCount}`}
						>
							{pageCount}
						</button>
					</>
				)}
			</div>

			<button
				type="button"
				className="pager-link"
				onClick={() => onPageChange(Math.min(pageCount - 1, pageIndex + 1))}
				aria-label="Next page"
				disabled={nextDisabled}
			>
				▶
			</button>
		</nav>
	);
}
