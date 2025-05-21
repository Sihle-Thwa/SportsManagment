import { Button } from "@/components/ui/button";
import { Pencil, Trash2, UserRound, ShieldCheck } from "lucide-react";
import { TableBuilder, TableColumn } from "@/components/common/Table";

// Define the User interface
export interface Player {
  id: string;
  username: string;
  fullName: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
  permissions: string[];
  [key: string]: unknown;
}

interface PlayersTableProps {
  data: Player[];
  onEdit?: (player: Player) => void;
  onDelete?: (player: Player) => void;
  onAddNew?: () => void;
}

export function PlayersTable({ data, onEdit, onDelete, onAddNew }: PlayersTableProps) {
  // Define columns for the Users table
  const columns: TableColumn<Player>[] = [
    {
      header: "ID",
      accessorKey: "id",
      className: "w-20"
    },
    {
      header: "Username",
      accessorKey: "username",
      cell: (player) => (
        <div className="flex items-center gap-2">
          <UserRound size={16} className="text-gray-500" />
          {player.username}
        </div>
      )
    },
    {
      header: "Full Name",
      accessorKey: "fullName"
    },
    {
      header: "Email",
      accessorKey: "email"
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (player) => {
        const statusColors = {
          active: "bg-green-100 text-green-800",
          inactive: "bg-gray-100 text-gray-800",
          pending: "bg-yellow-100 text-yellow-800"
        };
        
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[player.status]}`}>
            {player.status}
          </span>
        );
      }
    },
    {
      header: "Last Login",
      accessorKey: "lastLogin"
    },
    {
      header: "Permissions",
      accessorKey: "permissions",
      cell: (player) => (
        <div className="flex items-center gap-1">
          <ShieldCheck size={16} className="text-blue-500" />
          <span>{player.permissions.length} roles</span>
        </div>
      )
    }
  ];

  // Define action buttons for each row
  const renderActions = (player: Player) => (
    <div className="flex justify-end gap-2">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onEdit && onEdit(player)}
      >
        <Pencil size={16} className="text-gray-500" />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => onDelete && onDelete(player)}
      >
        <Trash2 size={16} className="text-red-500" />
      </Button>
    </div>
  );

  return (
    <TableBuilder<Player>
      data={data}
      columns={columns}
      actions={renderActions}
      onAddNew={onAddNew}
      addNewLabel="Add New Player"
      itemsPerPage={10}
    />
  );
}