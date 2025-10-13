import { useState } from "react";
import UsersTable from "../../components/Table/UsersTable";
import { User } from "@/types/user.types";

export default function Users() {
	const [users] = useState<User[]>([
		{
			id: "1",
			username: "john_doe",
			fullName: "John Doe",
			email: "john.doe@example.com",
			role: "player",
			active: true,
		},
		{
			id: "2",
			username: "jane_smith",
			fullName: "Jane Smith",
			email: "jane.smith@example.com",
			role: "player",
			active: false,
		},
		// ...add more users as needed
	]);

	return (
		<div className="space-y-6 p-6 ">
			<div className="mb-6">
				<h1>Users</h1>
				<p>View and Manage all users of your organisation</p>
			</div>

			<UsersTable data={users} />
		</div>
	);
}
