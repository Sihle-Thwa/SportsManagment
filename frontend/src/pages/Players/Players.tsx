// src/pages/members/MembersPage.tsx
import { useState } from "react";
import { PlayersTable, Player } from "./PlayersTable";

export default function Players() {
  const [players] = useState<Player[]>([
    {
      id: "1",
      name: "John",
      surname: "Doe",
      dob: "1990-01-01",
      email: "john.doe@example.com",
      contact: "+1234567890",
      nationality: "USA",
      status: "active",
    },
    {
      id: "2",
      name: "Jane",
      surname: "Smith",
      dob: "1992-02-02",
      email: "jane.smith@example.com",
      contact: "+0987654321",
      nationality: "RSA",
      status: "inactive",
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
    <div className="space-y-6 p-6 ">
      <div className="mb-6">
        <h1 >Player</h1>
        <p >View and Manage all players of your organisation</p>
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