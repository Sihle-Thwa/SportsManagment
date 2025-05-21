export interface TableColumn<T> {
  header: string;
  accessorKey: keyof T | string;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  searchable?: boolean;
  pagination?: boolean;
  actions?: (item: T) => React.ReactNode;
  itemsPerPage?: number;
  onAddNew?: () => void;
  addNewLabel?: string;
}

export interface PaginationState {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface SortingState {
  column: string | null;
  direction: 'asc' | 'desc' | null;
}