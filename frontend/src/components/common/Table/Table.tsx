import { Table as UITable } from "../../ui/table";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { TableControls, TableControlsProps } from "./TableControls";
import TableFooter from "./TableFooter";
import { TableColumn } from "./types";
import { Member } from "./MembersTable";

interface TableProps<T extends Member> extends TableControlsProps {
	data: T[];
	columns: TableColumn<T>[];
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	pageSize: number; // Add pageSize prop for TableFooter
}

export function Table<T extends Member>({
	data,
	columns,
	currentPage,
	totalPages,
	onPageChange,
	itemsPerPage,
	onItemsPerPageChange,
	searchTerm,
	onSearchChange,
	onAddNew,
	addNewLabel,
	pageOptions,
	searchPlaceholder,
	pageSize, // Add pageSize
}: TableProps<T>) {
	return (
		<div className="table-wrapper">
			<TableControls
				itemsPerPage={itemsPerPage}
				onItemsPerPageChange={onItemsPerPageChange}
				searchTerm={searchTerm}
				onSearchChange={onSearchChange}
				onAddNew={onAddNew}
				addNewLabel={addNewLabel}
				pageOptions={pageOptions}
				searchPlaceholder={searchPlaceholder}
			/>
			<div className="table-container">
				<UITable className="table">
					<TableHeader
						pageSizeOptions={pageOptions}
						pageSize={itemsPerPage}
						onPageSizeChange={onItemsPerPageChange}
						onSearch={onSearchChange}
						onAdd={onAddNew}
						selectedCount={undefined}
						onBulkDelete={undefined}
					/>
					<TableBody
						columns={
							columns as unknown as {
								key: string;
								label: string;
								sortable?: boolean;
							}[]
						}
						rows={data as Member[]}
						// actions={actions} // If TableBody supports actions, pass it
					/>
				</UITable>
			</div>
			<TableFooter
				pageIndex={currentPage}
				pageCount={totalPages}
				pageSize={pageSize}
				onPageChange={onPageChange}
				// onAdd, selectedCount, onBulkDelete can be passed if needed
			/>
		</div>
	);
}

Table.displayName = "Table";
export default Table;
export type { TableProps };
