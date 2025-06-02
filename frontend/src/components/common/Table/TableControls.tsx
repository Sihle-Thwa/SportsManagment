import { Button } from "../../common/Button";
import { Input } from "../Input/input";
import { PageSelect } from "../Select/PageSelect";

interface TableControlsProps {
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddNew?: () => void;
  addNewLabel?: string;

  // Optional & Customizable Props
  pageOptions?: number[];
  searchPlaceholder?: string;
  alignment?: "start" | "center" | "end"; // for horizontal alignment
  className?: string;
}

export function TableControls({
  itemsPerPage,
  onItemsPerPageChange,
  searchTerm,
  onSearchChange,
  onAddNew,
  addNewLabel = "Add New",
  pageOptions = [5, 10, 15, 20, 50],
  searchPlaceholder = "Search...",
  className
}: TableControlsProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 ${className}`}
    >
      {/* Page Selection */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <label htmlFor="itemsPerPage" className="text-sm font-medium">
          Show
        </label>
        <PageSelect
          value={itemsPerPage}
          onValueChange={onItemsPerPageChange}
          options={pageOptions}
          className="min-w-[80px]"
        />

        <span className="text-sm">entries</span>
      </div>

      {/* Search & Add */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
        <Input
          id="table-search"
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-base w-full sm:w-64"
          aria-label="Search table"
        />
        {onAddNew && (
          <Button
            className="btn-primary whitespace-nowrap"
            onClick={onAddNew}
          >
            {addNewLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
TableControls.displayName = "TableControls";
export type { TableControlsProps };