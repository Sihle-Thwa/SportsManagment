import type { ColumnDef } from "./types";
import type { User } from "../../types/user.types";
import TableBody from "./TableBody";

/**
 * Columns for users table
 */
const columns: ColumnDef<User>[] = [
	{ id: "id", header: "ID", sortable: true },
	{
		id: "fullName",
		header: "Name",
		sortable: true,
	},
	{ id: "username", header: "Username", sortable: true },
	{ id: "email", header: "Email", sortable: true },
	{ id: "role", header: "Role", sortable: true },
	{
		id: "active",
		header: "Active",
		sortable: false,
	},
];

type Props = {
	data: User[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onDeleteMany?: (ids: string[]) => Promise<void> | void;
	loading?: boolean;
};

export default function UsersTable({ data }: Props) {
	return (
		<table className="">
			<thead>
				<tr>
					<th className="p-2 text-center">
						{/* Checkbox header for bulk actions */}
						<input type="checkbox" aria-label="Select all users" />
					</th>
					{columns.map((col) => (
						<th key={col.id} className="p-2 text-left">
							{col.header}
						</th>
					))}
					<th className="p-2 text-right">Actions</th>
				</tr>
			</thead>
			<TableBody
				columns={columns}
				rows={data}
				getRowId={(r: User) => r.id}
				selected={{}}
				onToggleRow={() => {}}
			/>
		</table>
	);
}
