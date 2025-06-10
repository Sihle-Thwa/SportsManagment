import { Button } from "../../common/Button/Button";
import { TableSearch } from "../Input/table-search";
import { PageSelect } from "../Select/PageSelect";

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
        <TableSearch
          value={searchTerm}
          onChange={onSearchChange}
          aria-label="Search table"
        />
        {onAddNew && (
          <Button className="btn btn--primary" onClick={onAddNew}>
            {addNewLabel}
          </Button>
        )}
      </div>
    </div>
  );
}

TableControls.displayName = "TableControls";
export type { TableControlsProps };
export default TableControls;
