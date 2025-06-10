// src/pages/members/MembersTable.tsx
import { Button } from "../../components/common/Button/Button";
import { Pencil, Trash2, UserRound } from "lucide-react";
import { Table } from "../../components/common/Table/Table";
import { TableColumn } from "../../components/common/Table/types";


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
    },
    {
      header: "Name",
      accessorKey: "name",
      cell: (member) => (
        <div className="flex items-center gap-2">
          <UserRound />
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
    <div className="flex justify-end gap-3">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onEdit && onEdit(member)}
      >
        <Pencil />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete && onDelete(member)}
      >
        <Trash2 className="text-red-500" />
      </Button>
    </div>
  );

  return (
    <Table<Member>
      data={data}
      columns={columns}
      actions={renderActions}
      onAddNew={onAddNew}
      addNewLabel="Add New Member"
      itemsPerPage={10}
      currentPage={0}
      totalPages={0}
      onPageChange={function (page: number): void {
        throw new Error("Function not implemented.");
      }}
      onItemsPerPageChange={function (value: number): void {
        throw new Error("Function not implemented.");
      }}
      searchTerm={""}
      onSearchChange={function (value: string): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
}
