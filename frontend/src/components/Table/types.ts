// src/components/Table/types.ts
export type ColumnDef<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
};
