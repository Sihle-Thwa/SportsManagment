// src/pages/members/MembersPage.tsx
import { useState } from "react";
import { TeamsTable, Team } from "./TeamsTable";

export default function Teams() {
  const [team] = useState<Team[]>([
    {
      id: "1",
      teamName: "Highland Hawks",
      teamCaptain: "John Doe",
      gender: "Male",
      ageGroup: "U19",
      code: "HH",
      sport: "Basketball",
      playerCount: 5,
      tournaments: ["Project Alpha", "Project Beta"]
    },
    {
      id: "2",
      teamName: "Golden Eagles",
      teamCaptain: "Jane Smith",
      gender: "Female",
      ageGroup: "U16",
      code: "GE FC",
      sport: "Soccer",
      playerCount: 5,
      tournaments: ["Project Alpha", "Project Beta"]
    },
    // Add more members as needed
  ]);

  const handleEdit = (team: Team) => {
    console.log("Edit Team:", team);
    // Open edit modal/form logic
  };

  const handleDelete = (team: Team) => {
    console.log("Delete Team:", team);
    // Show confirmation dialog and delete logic
  };

  const handleAddNew = () => {
    console.log("Add new Team");
    // Open add new modal/form logic
  };

  return (
    <div className="space-y-6 p-6 ">
      <div className="mb-6 ">
        <h1>Teams</h1>
        <p >View and Manage all teams of your organisation</p>
      </div>

      <TeamsTable
        data={team}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
    </div>
  );
}