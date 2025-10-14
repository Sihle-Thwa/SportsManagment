
import React from "react";

export type RowId = string | number;

export type ColumnDef<T> = {
  id: string; // unique id used as key
  header: string;
  // optional accessor for default plain text/cell content
  accessor?: (row: T) => React.ReactNode | string;
  // optional custom cell renderer for complex cells
  cell?: (row: T) => React.ReactNode;
  // whether the column is sortable
  sortable?: boolean;
  // optional width hint (CSS)
  width?: string;
};
