// src/pages/members/MembersTable.tsx
import { useState } from "react";
import { Pencil, Trash2, UserRound } from "lucide-react";
import { Table } from "../../components/common/Table/Table";
import { TableColumn } from "../../components/common/Table/types";
import { Button } from "../../components/common/Button/Button";

// Member type definition
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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const columns: TableColumn<Member>[] = [
    { header: "ID", accessorKey: "id" },
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
    { header: "Surname", accessorKey: "surname" },
    { header: "Email", accessorKey: "email" },
    { header: "Role", accessorKey: "role" },
    { header: "Contact", accessorKey: "contact" },
  ];

  const renderActions = (member: Member) => (
    <div className="flex justify-end gap-3">
      <Button variant="ghost" size="sm" onClick={() => onEdit?.(member)}>
        <Pencil />
      </Button>
      <Button variant="ghost" size="sm" onClick={() => onDelete?.(member)}>
        <Trash2 className="text-red-500" />
      </Button>
    </div>
  );

  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Table<Member>
      data={paginatedData}
      columns={columns}
      actions={renderActions}
      onAddNew={onAddNew}
      addNewLabel="Add New Member"
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
      searchPlaceholder="Search members..."
      pageOptions={[5, 10, 20, 50]}
    />
  );
}
MembersTable.displayName = "MembersTable";
export default MembersTable;