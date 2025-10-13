// src/components/Table/TablePagination.tsx

export default function TablePagination({
	pageIndex,
	pageCount,
	onPageChange,
}: {
	pageIndex: number;
	pageCount: number;
	onPageChange: (idx: number) => void;
}) {
	const pages = Array.from({ length: pageCount }, (_, i) => i);

	return (
		<nav
			role="navigation"
			aria-label="Pagination"
			className="flex items-center gap-2"
		>
			<button
				onClick={() => onPageChange(Math.max(0, pageIndex - 1))}
				disabled={pageIndex === 0}
			>
				Previous
			</button>

			<div className="flex items-center gap-1">
				{pages.map((p) => (
					<button
						key={p}
						onClick={() => onPageChange(p)}
						aria-current={p === pageIndex ? "page" : undefined}
						className={`px-2 py-1 rounded ${
							p === pageIndex ? "bg-primary text-white" : "bg-transparent"
						}`}
					>
						{p + 1}
					</button>
				))}
			</div>

			<button
				onClick={() => onPageChange(Math.min(pageCount - 1, pageIndex + 1))}
				disabled={pageIndex >= pageCount - 1}
			>
				Next
			</button>
		</nav>
	);
}
