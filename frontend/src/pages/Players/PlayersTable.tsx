import { useState } from "react";
import { Pencil, Trash2, UserRound } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Table } from "../../components/common/Table/Table";
import { TableColumn } from "../../components/common/Table/types";

export interface Player {
  id: string;
  name: string;
  surname: string;
  dob: string;
  email: string;
  contact: string;
  nationality: string;
  status: "active" | "inactive" | "pending";
  [key: string]: unknown;
}

interface PlayersTableProps {
  data: Player[];
  onEdit?: (player: Player) => void;
  onDelete?: (player: Player) => void;
  onAddNew?: () => void;
}

export function PlayersTable({
  data,
  onEdit,
  onDelete,
  onAddNew,
}: PlayersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const columns: TableColumn<Player>[] = [
    { header: "ID", accessorKey: "id", className: "w-20" },
    {
      header: "Name",
      accessorKey: "name",
      cell: (player) => (
        <div className="flex items-center gap-2">
          <UserRound size={16} className="text-gray-500" />
          {player.name} {player.surname}
        </div>
      ),
    },
    { header: "Surname", accessorKey: "surname" },
    { header: "DOB", accessorKey: "dob" },
    { header: "Email", accessorKey: "email" },
    { header: "Contact", accessorKey: "contact" },
    { header: "Nationality", accessorKey: "nationality" },
    {
      header: "Status",
      accessorKey: "status",
      cell: (player) => {
        const statusColors = {
          active: "bg-green-100 text-green-800",
          inactive: "bg-gray-100 text-gray-800",
          pending: "bg-yellow-100 text-yellow-800",
        };

        return (
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[player.status]}`}
          >
            {player.status}
          </span>
        );
      },
    },
  ];

  const renderActions = (player: Player) => (
    <div className="flex justify-end gap-2">
      <Button variant="ghost" size="icon" onClick={() => onEdit?.(player)}>
        <Pencil size={16} className="text-gray-500" />
      </Button>
      <Button variant="ghost" size="icon" onClick={() => onDelete?.(player)}>
        <Trash2 size={16} className="text-red-500" />
      </Button>
    </div>
  );

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Table<Player>
      data={paginatedData}
      columns={columns}
      actions={renderActions}
      onAddNew={onAddNew}
      addNewLabel="Add New Player"
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
      searchPlaceholder="Search players..."
      pageOptions={[5, 10, 20, 50]}
    />
  );
}
PlayersTable.displayName = "PlayersTable";
export default PlayersTable;