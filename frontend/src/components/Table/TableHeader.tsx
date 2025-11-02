// TableHeader.tsx
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import "../../styles/components/table.css";

export type TableHeaderProps = {
  pageSize: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  onSearch?: (q: string) => void;
  onAdd?: () => void;
  onBulkDelete?: () => void;
  anySelected?: boolean;
  selectedCount?: number;
  searchPlaceholder?: string;
  debounceDelay?: number; // in ms (default 300ms)
};

export default function TableHeader({
  pageSize,
  pageSizeOptions = [10, 20, 30],
  onPageSizeChange,
  onSearch,
  onAdd,
  onBulkDelete,
  anySelected = false,
  selectedCount = 0,
  searchPlaceholder = "Search…",
  debounceDelay = 300,
}: TableHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔁 debounce the search updates
  useEffect(() => {
    const handle = setTimeout(() => {
      if (onSearch) onSearch(searchTerm.trim());
    }, debounceDelay);

    return () => clearTimeout(handle);
  }, [searchTerm, debounceDelay, onSearch]);

  return (
    <div className="table-header" role="toolbar" aria-label="Table controls">
      <div className="table-header-container">
        {/* -------- LEFT CONTROLS -------- */}
        <div className="table-header__left">
          {/* Entries selector */}
          <div
            className="table-header__select"
            role="group"
            aria-label="Rows per page"
          >
            <div className="table-header__select-label">Show</div>
            <select
              id="table-pagesize"
              value={pageSize}
              onChange={(e) => onPageSizeChange?.(Number(e.target.value))}
              className="table-header__select-option"
              aria-label="Rows per page"
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <div className="table-header__select-label">entries</div>
          </div>

          {/* Bulk actions */}
          {anySelected && (
            <div className="bulk-actions" aria-live="polite">
              <button
                type="button"
                className="button--danger"
                onClick={() => onBulkDelete?.()}
                aria-label={`Delete ${selectedCount} selected items`}
              >
                Delete ({selectedCount})
              </button>
            </div>
          )}
        </div>

        {/* -------- CENTER: SEARCH -------- */}
        <div className="table-header__center" role="search">
          <div className="table-header__search-input">
            <Search className="table-header__search-icon" aria-hidden />
            <input
              className="table-header__search-control"
              type="search"
              value={searchTerm}
              placeholder={searchPlaceholder}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search table"
            />
          </div>
        </div>

        {/* -------- RIGHT CONTROLS -------- */}
        <div className="table-header__right">
          <button
            type="button"
            className="table-header__button"
            onClick={() => onAdd?.()}
            aria-label="Add new item"
          >
        	Add member
          </button>
        </div>
      </div>
    </div>
  );
}
