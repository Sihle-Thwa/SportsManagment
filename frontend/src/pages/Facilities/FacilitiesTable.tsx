import { useState } from "react";
import { Building, MapPin, Pencil, Trash2, Calendar } from "lucide-react";
import { Button } from "../../components/common/Button/Button";
import { Table } from "../../components/common/Table/Table";
import { TableColumn } from "../../components/common/Table/types";


export interface Facility {
  id: string;
  Name: string;
  address: string;
  city: string;
  country: string;
  capacity: number;
  status: 'operational' | 'maintenance' | 'closed';
  lastInspection: string;
  [key: string]: unknown;
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

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Define columns for the Facilities table
  const columns: TableColumn<Facility>[] = [
    {
      header: "ID",
      accessorKey: "id",
    },
    {
      header: "Facility facilityName",
      accessorKey: "facilityName",
      cell: (facility) => (
        <div className="flex items-center gap-2">
          <Building size={16} className="text-gray-500" />
          {facility.Name}
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
        onClick={() => onScheduleInspection?.(facility)}
        title="Schedule Inspection"
      >
        <Calendar size={16} className="text-blue-500" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => onEdit?.(facility)}
        title="Edit Facility"
      >
        <Pencil size={16} className="text-gray-500" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => onDelete?.(facility)}
        title="Delete Facility"
      >
        <Trash2 size={16} className="text-red-500" />
      </Button>
    </div>
  );

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Table<Facility>
      data={paginatedData}
      columns={columns}
      actions={renderActions}
      onAddNew={onAddNew}
      addNewLabel="Add New Facility"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      itemsPerPage={itemsPerPage}
      onItemsPerPageChange={(value) => {
        setItemsPerPage(value);
        setCurrentPage(1);
      }}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      searchPlaceholder="Search facilities..."
      pageOptions={[5, 10, 20, 50]}
    />
  );
}
