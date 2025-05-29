// src/pages/members/MembersTable.tsx
import { Button } from "../../components/ui/button";
import { Pencil, Trash2, UserRound } from "lucide-react";
import { TableColumn, TableBuilder } from "../../components/common/Table";

// Define the Member interface
export interface Member {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: string;
  contact: string;
  [key: string]: unknown;
}

interface MembersTableProps {
  data: Member[];
  onEdit?: (member: Member) => void;
  onDelete?: (member: Member) => void;
  onAddNew?: () => void;
}

export function MembersTable({ data, onEdit, onDelete, onAddNew }: MembersTableProps) {
  // Define columns for the Members table
  const columns: TableColumn<Member>[] = [
    {
      header: "ID",
      accessorKey: "id",
      className: "w-20"
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: (member) => (
        <div className="flex items-center gap-2">
          <UserRound size={16} className="text-gray-500" />
          {member.name}
        </div>
      )
    },
    {
      header: "Surname",
      accessorKey: "surname"
    },
    {
      header: "Email",
      accessorKey: "email"
    },
    {
      header: "Role",
      accessorKey: "role"
    },
    {
      header: "Contact",
      accessorKey: "contact"
    }
  ];

  // Define action buttons for each row
  const renderActions = (member: Member) => (
    <div className="flex justify-end gap-0">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit && onEdit(member)}
      >
        <Pencil size={16} className="text-gray-500" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete && onDelete(member)}
      >
        <Trash2 size={16} className="text-red-500" />
      </Button>
    </div>
  );

  return (
    <TableBuilder<Member>
      data={data}
      columns={columns}
      actions={renderActions}
      onAddNew={onAddNew}
      addNewLabel="Add New Member"
      itemsPerPage={10}
    />
  );
}
