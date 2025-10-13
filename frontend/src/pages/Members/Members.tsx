import { useState } from "react";
import MembersTable from "../../components/Table/MembersTable";
import "./members.css";
import { Member } from "@/types/member.types";

export default function Members() {
	const [members] = useState<Member[]>([
		{
			id: "1",
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			role: "Admin",
			contact: "+1234567890",
		},
		{
			id: "2",
			firstName: "Jane",
			lastName: "Smith",
			email: "jane.smith@example.com",
			role: "User",
			contact: "+0987654321",
		},
		// Add more members as needed
	]);

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
					<MembersTable data={members} />
				</div>
			</section>
		</div>
	);
}
