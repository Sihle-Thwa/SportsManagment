import { Building, MapPin, Pencil, Trash2, Calendar } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Table } from "../../components/common/Table/Table";
import { TableColumn } from "../../components/common/Table/types";


// Define the Facility interface
export interface Facility {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  status: 'operational' | 'maintenance' | 'closed';
  lastInspection: string;
  [key: string]: unknown; // Add index signature to satisfy Record<string, unknown>
}

interface FacilitiesTableProps {
  data: Facility[];
  onEdit?: (facility: Facility) => void;
  onDelete?: (facility: Facility) => void;
  onAddNew?: () => void;
  onScheduleInspection?: (facility: Facility) => void;
}

export function FacilitiesTable({
  data,
  onEdit,
  onDelete,
  onAddNew,
  onScheduleInspection
}: FacilitiesTableProps) {
  // Define columns for the Facilities table
  const columns: TableColumn<Facility>[] = [
    {
      header: "ID",
      accessorKey: "id",
      className: "w-20"
    },
    {
      header: "Facility Name",
      accessorKey: "name",
      cell: (facility) => (
        <div className="flex items-center gap-2">
          <Building size={16} className="text-gray-500" />
          {facility.name}
        </div>
      )
    },
    {
      header: "Location",
      accessorKey: "address",
      cell: (facility) => (
        <div>
          <div className="flex items-center gap-1">
            <MapPin size={14} className="text-gray-400" />
            {facility.address}
          </div>
          <div className="text-sm text-gray-500">
            {facility.city}, {facility.country}
          </div>
        </div>
      )
    },
    {
      header: "Capacity",
      accessorKey: "capacity"
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (facility) => {
        const statusColors = {
          operational: "bg-green-100 text-green-800",
          maintenance: "bg-yellow-100 text-yellow-800",
          closed: "bg-red-100 text-red-800"
        };

        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[facility.status]}`}>
            {facility.status}
          </span>
        );
      }
    },
    {
      header: "Last Inspection",
      accessorKey: "lastInspection"
    }
  ];

  // Define action buttons for each row
  const renderActions = (facility: Facility) => (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onScheduleInspection && onScheduleInspection(facility)}
        title="Schedule Inspection"
      >
        <Calendar size={16} className="text-blue-500" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit && onEdit(facility)}
        title="Edit Facility"
      >
        <Pencil size={16} className="text-gray-500" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete && onDelete(facility)}
        title="Delete Facility"
      >
        <Trash2 size={16} className="text-red-500" />
      </Button>
    </div>
  );

  return (
    <Table<Facility>
      data={data}
      columns={columns}
      actions={renderActions}
      onAddNew={onAddNew}
      addNewLabel="Add New Facility"
      itemsPerPage={10} currentPage={0} totalPages={0} onPageChange={function (_: number): void {
        throw new Error("Function not implemented.");
      }} onItemsPerPageChange={function (_: number): void {
        throw new Error("Function not implemented.");
      }} searchTerm={""} onSearchChange={function (_: string): void {
        throw new Error("Function not implemented.");
      }} />
  );
}