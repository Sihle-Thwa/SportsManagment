// src/pages/members/MembersPage.tsx
import { useState } from "react";
import { FacilitiesTable, Facility } from "./FacilitiesTable";

export default function Facilities() {
  const [facility] = useState<Facility[]>([
    {
      id: "1",
      name: "John",
      surname: "Doe",
      email: "john.doe@example.com",
      role: "Admin",
      contact: "+1234567890",
      username: "johndoe",
      fullName: "John Doe",
      status: "operational",
      lastLogin: "2024-06-01T10:00:00Z",
      permissions: ["manage_users", "view_reports"],
      description: "Team responsible for administration",
      leader: "John Doe",
      memberCount: 5,
      projects: ["Project Alpha", "Project Beta"],
      createdAt: "2024-01-15T09:00:00Z",
      address: "123 Main St",
      city: "Johannesburg",
      country: "South Africa",
      capacity: 100,
      lastInspection: "2024-05-01T09:00:00Z"
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
      status: "maintenance",
      lastLogin: "2024-05-28T14:30:00Z",
      permissions: ["view_reports"],
      description: "Team focused on reporting",
      leader: "Jane Smith",
      memberCount: 3,
      projects: ["Project Gamma"],
      createdAt: "2024-02-10T11:30:00Z",
      address: "456 Side Ave",
      city: "Cape Town",
      country: "South Africa",
      capacity: 50,
      lastInspection: "2024-04-15T10:00:00Z"
    }
    // Add more members as needed
  ]);

  const handleEdit = (facility: Facility) => {
    console.log("Edit Facility:", facility);
    // Open edit modal/form logic
  };

  const handleDelete = (facility: Facility) => {
    console.log("Delete Team:", facility);
    // Show confirmation dialog and delete logic
  };

  const handleAddNew = () => {
    console.log("Add new Facility");
    // Open add new modal/form logic
  };

  return (
    <div className="container">
      <div className="flex flex-col justify-start items-start mb-3 bg-white p-3 ">
        <h1 className="text-xl font-bold mb-3">Teams</h1>
        <p className="">View and Manage all teams of your organisation</p>
      </div>

      <FacilitiesTable
        data={facility}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
    </div>
  );
}