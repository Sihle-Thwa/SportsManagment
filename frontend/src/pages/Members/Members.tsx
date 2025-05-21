// src/pages/members/MembersPage.tsx
import { useState } from "react";
import { MembersTable, Member } from "./MembersTable";

export default function Members() {
  const [members] = useState<Member[]>([
    {
      id: "1",
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      role: "Admin",
      contact: "+1234567890"
    },
    {
      id: "2",
      name: "Jane",
      surname: "Smith",
      email: "jane.smith@example.com",
      role: "User",
      contact: "+0987654321"
    }
    // Add more members as needed
  ]);

  const handleEdit = (member: Member) => {
    console.log("Edit member:", member);
    // Open edit modal/form logic
  };

  const handleDelete = (member: Member) => {
    console.log("Delete member:", member);
    // Show confirmation dialog and delete logic
  };

  const handleAddNew = () => {
    console.log("Add new member");
    // Open add new modal/form logic
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Members Management</h1>
      <MembersTable 
        data={members}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
    </div>
  );
}