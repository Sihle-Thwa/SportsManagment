// src/components/Table/TableFooter.tsx
import TablePagination from "./TablePagination";

export default function TableFooter({
	pageIndex,
	pageCount,
	onPageChange,
	selectedCount,
	onBulkDelete,
	className,
}: {
	pageIndex: number;
	pageCount: number;
	pageSize: number;
	onPageChange: (idx: number) => void;
	selectedCount?: number;
	onBulkDelete?: () => void;
	className?: string;
}) {
	return (
		<div
			className={`flex items-center justify-between mt-3 ${className ?? ""}`}
		>
			<div className="flex items-center gap-3">
				<div className="text-sm text-muted-foreground">
					Page {pageIndex + 1} of {pageCount}
				</div>
				{selectedCount && selectedCount > 0 && (
					<div className="text-sm">Selected: {selectedCount}</div>
				)}
			</div>

			<div className="flex items-center gap-3">
				{selectedCount && selectedCount > 0 && (
					<button
						className="px-3 py-1 rounded text-destructive"
						onClick={onBulkDelete}
					>
						Delete selected ({selectedCount})
					</button>
				)}
				<TablePagination
					pageIndex={pageIndex}
					pageCount={pageCount}
					onPageChange={onPageChange}
				/>
			</div>
		</div>
	);
}
