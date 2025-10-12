import "./table.css";

export default function TableFooter({
	pageIndex,
	pageCount,
	pageSize,
	onPageChange,
	onAdd,
	selectedCount = 0,
	onBulkDelete,
}: {
	pageIndex: number;
	pageCount: number;
	pageSize: number;
	onPageChange: (idx: number) => void;
	onAdd?: () => void;
	selectedCount?: number;
	onBulkDelete?: () => void;
}) {
	const pages = Array.from({ length: pageCount }, (_, i) => i);

	const prev = () => onPageChange(Math.max(0, pageIndex - 1));
	const next = () => onPageChange(Math.min(pageCount - 1, pageIndex + 1));

	return (
		<footer
			className="table-footer"
			role="navigation"
			aria-label="Table pagination"
		>
			<div className="table-footer__left">
				<div className="cta-group">
					<button
						type="button"
						className="button button--ghost"
						onClick={() => onAdd?.()}
					>
						+ Add New Member
					</button>
					{selectedCount > 0 && (
						<button
							type="button"
							className="button button--danger"
							onClick={onBulkDelete}
						>
							Delete selected ({selectedCount})
						</button>
					)}
				</div>
			</div>

			<div className="table-footer__center">
				<button
					className="pager-link"
					onClick={prev}
					disabled={pageIndex === 0}
				>
					Previous
				</button>

				<div className="pager-pages" role="list">
					{pages.map((p) => (
						<button
							key={p}
							type="button"
							className={`pager-page ${p === pageIndex ? "active" : ""}`}
							onClick={() => onPageChange(p)}
							aria-current={p === pageIndex ? "page" : undefined}
						>
							{p + 1}
						</button>
					))}
				</div>

				<button
					className="pager-link"
					onClick={next}
					disabled={pageIndex >= pageCount - 1}
				>
					Next
				</button>
			</div>

			<div className="table-footer__right">
				<div className="page-info">
					Page {pageIndex + 1} of {pageCount} • {pageSize} per page
				</div>
			</div>
		</footer>
	);
}
