// src/pages/members/MembersPage.tsx
import { useState } from "react";
import { PlayersTable, Player } from "./PlayersTable";

export default function Players() {
  const [players] = useState<Player[]>([
    {
      id: "1",
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      role: "Admin",
      contact: "+1234567890",
      username: "johndoe",
      fullName: "John Doe",
      status: "active",
      lastLogin: "2024-06-01T10:00:00Z",
      permissions: ["manage_users", "view_reports"]
    },
    {
      id: "2",
      name: "Jane",
      surname: "Smith",
      email: "jane.smith@example.com",
      role: "User",
      contact: "+0987654321",
      username: "janesmith",
      fullName: "Jane Smith",
      status: "inactive",
      lastLogin: "2024-05-28T14:30:00Z",
      permissions: ["view_reports"]
    }
    // Add more members as needed
  ]);

  const handleEdit = (player: Player) => {
    console.log("Edit member:", player);
    // Open edit modal/form logic
  };

  const handleDelete = (player: Player) => {
    console.log("Delete member:", player);
    // Show confirmation dialog and delete logic
  };

  const handleAddNew = () => {
    console.log("Add new Player");
    // Open add new modal/form logic
  };

  return (
    <div className="container">
      <div className="flex flex-col justify-start items-start mb-3 bg-white p-3 ">
        <h1 className="text-xl font-bold mb-3">Player</h1>
        <p className="">View and Manage all players of your organisation</p>
      </div>

      <PlayersTable
        data={players}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
    </div>
  );
}