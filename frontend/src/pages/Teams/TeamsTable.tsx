import { Users, Pencil, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableBuilder, TableColumn } from "@/components/common/Table";

// Define the Team interface
export interface Team {
  id: string;
  name: string;
  description: string;
  leader: string;
  memberCount: number;
  projects: string[];
  createdAt: string;
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
  onManageMembers 
}: TeamsTableProps) {
  // Define columns for the Teams table
  const columns: TableColumn<Team>[] = [
    {
      header: "ID",
      accessorKey: "id",
      className: "w-20"
    },
    {
      header: "Team Name",
      accessorKey: "name",
      cell: (team) => (
        <div className="flex items-center gap-2">
          <Users size={16} className="text-blue-500" />
          {team.name}
        </div>
      )
    },
    {
      header: "Description",
      accessorKey: "description"
    },
    {
      header: "Team Leader",
      accessorKey: "leader"
    },
    {
      header: "Members",
      accessorKey: "memberCount",
      cell: (team) => `${team.memberCount} members`
    },
    {
      header: "Projects",
      accessorKey: "projects",
      cell: (team) => `${team.projects.length} projects`
    },
    {
      header: "Created",
      accessorKey: "createdAt"
    }
  ];

  // Define action buttons for each row
  const renderActions = (team: Team) => (
    <div className="flex justify-end gap-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onManageMembers && onManageMembers(team)}
        title="Manage Members"
      >
        <UserPlus size={16} className="text-blue-500" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onEdit && onEdit(team)}
        title="Edit Team"
      >
        <Pencil size={16} className="text-gray-500" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onDelete && onDelete(team)}
        title="Delete Team"
      >
        <Trash2 size={16} className="text-red-500" />
      </Button>
    </div>
  );

  return (
    <TableBuilder<Team>
      data={data}
      columns={columns}
      actions={renderActions}
      onAddNew={onAddNew}
      addNewLabel="Create New Team"
      itemsPerPage={10}
    />
  );
}