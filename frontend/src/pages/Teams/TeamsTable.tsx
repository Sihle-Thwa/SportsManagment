import { useState } from "react";
import { Users, Pencil, Trash2, UserPlus } from "lucide-react";
import { Button } from "../../components/common/Button/Button";
import { Table } from "../../components/common/Table/Table";
import { TableColumn } from "../../components/common/Table/types";

export interface Team {
  id: string;
  teamName: string;
  teamCaptain: string;
  ageGroup: string;
  code: string;
  sport: string;
  gender: string;
  playerCount: number;
  tournaments: string[];
  [key: string]: unknown;
}

interface TeamsTableProps {
  data: Team[];
  onEdit?: (team: Team) => void;
  onDelete?: (team: Team) => void;
  onAddNew?: () => void;
  onManageMembers?: (team: Team) => void;
}

export function TeamsTable({
  data,
  onEdit,
  onDelete,
  onAddNew,
  onManageMembers,
}: TeamsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const columns: TableColumn<Team>[] = [
    { header: "ID", accessorKey: "id", className: "w-20" },
    {
      header: "Team Name",
      accessorKey: "teamName",
      cell: (team) => (
        <div className="flex items-center gap-2">
          <Users size={16} className="text-blue-500" />
          {team.teamName}
        </div>
      ),
    },
    { header: "Team Code", accessorKey: "code" },
    { header: "Team Captain", accessorKey: "teamCaptain" },
    { header: "Gender", accessorKey: "gender" },
    { header: "Age Group", accessorKey: "ageGroup" },
    {
      header: "Players",
      accessorKey: "playerCount",
      cell: (team) => `${team.playerCount} players`,
    },
    {
      header: "Tournaments",
      accessorKey: "tournaments",
      cell: (team) => `${team.tournaments.length} tournaments`,
    },
  ];

  const renderActions = (team: Team) => (
    <div className="flex justify-end gap-2">
      <Button
        variant="ghost"
        onClick={() => onManageMembers?.(team)}
        title="Manage Members"
      >
        <UserPlus size={16} className="text-blue-500" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => onEdit?.(team)}
        title="Edit Team"
      >
        <Pencil size={16} className="text-gray-500" />
      </Button>
      <Button
        variant="ghost"
        onClick={() => onDelete?.(team)}
        title="Delete Team"
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
    <Table<Team>
      data={paginatedData}
      columns={columns}
      actions={renderActions}
      onAddNew={onAddNew}
      addNewLabel="Create New Team"
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
      searchPlaceholder="Search teams..."
      pageOptions={[5, 10, 20, 50]}
    />
  );
}
TeamsTable.displayName = "TeamsTable";
export default TeamsTable;