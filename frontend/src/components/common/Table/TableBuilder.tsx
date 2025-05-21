import { useState, useMemo } from "react";
import { Table } from "@/components/ui/table";
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { TableControls } from "./TableControls";
import { TablePagination } from "./TablePagination";
import { TableProps } from "./types";

export function TableBuilder<T extends Record<string, unknown>>({
  data,
  columns,
  searchable = true,
  pagination = true,
  actions,
  itemsPerPage = 10,
  onAddNew,
  addNewLabel
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [perPage, setPerPage] = useState(itemsPerPage);
  const [sorting, setSorting] = useState<{ column: string | null; direction: 'asc' | 'desc' | null }>({
    column: null,
    direction: null
  });

  // Handle sorting
  const handleSort = (column: string) => {
    setSorting(prev => {
      if (prev.column === column) {
        if (prev.direction === 'asc') return { column, direction: 'desc' };
        if (prev.direction === 'desc') return { column: null, direction: null };
      }
      return { column, direction: 'asc' };
    });
    setCurrentPage(1);
  };

  // Filter and sort data
  const processedData = useMemo(() => {
    // First filter the data
    let result = [...data];
    
    if (searchable && searchTerm) {
      result = result.filter(item => {
        return columns.some(column => {
          const key = column.accessorKey as string;
          const value = item[key];
          return value && String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }
    
    // Then sort the data
    if (sorting.column && sorting.direction) {
      result.sort((a, b) => {
        const valueA = a[sorting.column as keyof T];
        const valueB = b[sorting.column as keyof T];
        
        if (valueA < valueB) return sorting.direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return sorting.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    
    return result;
  }, [data, searchTerm, sorting, columns, searchable]);

  // Calculate pagination
  const totalPages = Math.ceil(processedData.length / perPage);
  const startIndex = (currentPage - 1) * perPage;
  const paginatedData = pagination
    ? processedData.slice(startIndex, startIndex + perPage)
    : processedData;

  // Reset to first page when items per page changes
  const handleItemsPerPageChange = (value: number) => {
    setPerPage(value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full space-y-4">
      {/* Table Controls */}
      {(searchable || onAddNew) && (
        <TableControls
          itemsPerPage={perPage}
          onItemsPerPageChange={handleItemsPerPageChange}
          searchTerm={searchTerm}
          onSearchChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
          onAddNew={onAddNew}
          addNewLabel={addNewLabel}
        />
      )}
      
      {/* Data Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader 
            columns={columns} 
            onSort={handleSort}
            sorting={sorting}
          />
          <TableBody 
            data={paginatedData} 
            columns={columns} 
            actions={actions}
          />
        </Table>
      </div>
      
      {/* Pagination */}
      {pagination && processedData.length > 0 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}