import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../../ui/select";

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
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span>Show</span>
        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => onItemsPerPageChange(Number(value))}
        >
          <SelectTrigger className="select-trigger">
            <SelectValue className="select-value" placeholder={itemsPerPage.toString()} />
          </SelectTrigger>
          <SelectContent className="select-content">
            <SelectItem className="select-item" value="5">5</SelectItem>
            <SelectItem className="select-item" value="10">10</SelectItem>
            <SelectItem className="select-item" value="20">20</SelectItem>
            <SelectItem className="select-item" value="50">50</SelectItem>
          </SelectContent>
        </Select>
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
