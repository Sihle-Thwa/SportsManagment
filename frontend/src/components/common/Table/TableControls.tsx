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
}

export function TableControls({
  itemsPerPage,
  onItemsPerPageChange,
  searchTerm,
  onSearchChange,
  onAddNew,
  addNewLabel = "Add New"
}: TableControlsProps) {
  const pageOptions = [5, 10, 15, 20, 50];


  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>Show</span>
        <PageSelect
          value={itemsPerPage}
          onValueChange={onItemsPerPageChange}
          options={pageOptions}
          className="select-base select-primary"
        />
        <span>entries</span>
      </div>

      <div className="flex items-center gap-2">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input-base"
        />
        {onAddNew && (
          <Button
            className="btn-primary"
            onClick={onAddNew}
          >
            {addNewLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
