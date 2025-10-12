import { PageSelect } from "../../common/Select/PageSelect";

interface TableControlsProps {
	itemsPerPage: number;
	onItemsPerPageChange: (value: number) => void;
	searchTerm: string;
	onSearchChange: (value: string) => void;
	onAddNew?: () => void;
	addNewLabel?: string;
	pageOptions?: number[];
	searchPlaceholder?: string;
}

export function TableControls({
	itemsPerPage,
	onItemsPerPageChange,
	searchTerm,
	onSearchChange,
	onAddNew,
	addNewLabel = "Add New",
	pageOptions = [5, 10, 15, 20, 50],
}: TableControlsProps) {
	return (
		<div className="table-controls">
			<div className="flex items-center gap-3">
				<label htmlFor="itemsPerPage" className="text-sm text-muted">
					Show
				</label>
				<PageSelect
					value={itemsPerPage}
					onValueChange={onItemsPerPageChange}
					options={pageOptions}
				/>
				<span className="text-sm text-muted">entries</span>
			</div>

			<div className="flex items-center gap-3 ml-auto">
				<input
					type="text"
					value={searchTerm}
					onChange={(e) => onSearchChange(e.target.value)}
					aria-label="Search table"
					placeholder="Search..."
					className="search-input"
				/>
				{onAddNew && (
					<button className="btn btn--primary" onClick={onAddNew}>
						{addNewLabel}
					</button>
				)}
			</div>
		</div>
	);
}

TableControls.displayName = "TableControls";
export type { TableControlsProps };
export default TableControls;
