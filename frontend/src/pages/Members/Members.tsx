// src/pages/members/MembersPage.tsx
import { useState } from "react";
import { MembersTable, Member } from "./MembersTable";
import "./members.css";

export default function Members() {
	const [members] = useState<Member[]>([
		{
			id: "1",
			name: "John",
			surname: "Doe",
			email: "john.doe@example.com",
			role: "Admin",
			contact: "+1234567890",
		},
		{
			id: "2",
			name: "Jane",
			surname: "Smith",
			email: "jane.smith@example.com",
			role: "User",
			contact: "+0987654321",
		},
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
		<div className="membersRoot">
			<div className="membersHeader">
				<div className="membersTitle">Members</div>
				<div className="membersSubtitle">
					View and Manage all members of your organisation
				</div>
			</div>

			<section className="membersContainer" aria-label="Members editor">
				<div className="membersContent">
					<MembersTable
						data={members}
						onEdit={handleEdit}
						onDelete={handleDelete}
						onAddNew={handleAddNew}
					/>
				</div>
			</section>
		</div>
	);
} 