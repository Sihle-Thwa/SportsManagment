import Table from "./Table";
import type { ColumnDef } from "./types";
import type { Member } from "../../types/member.types";
import { User } from "lucide-react"; // Removed Edit, Trash2

const columns: ColumnDef<Member>[] = [
	{ key: "id", header: "ID", sortable: true },
	{
		key: "firstName", // Changed from "name" to "firstName"
		header: "Name",
		sortable: true,
		render: (row) => (
			<div className="flex items-center gap-2">
				<User className="text-primary-600 w-4 h-4" aria-hidden />
				<span className="font-medium text-sm">
					{row.firstName} {row.lastName}
				</span>
			</div>
		),
	},
	{ key: "email", header: "Email", sortable: true },
	{ key: "role", header: "Role", sortable: true },
	{ key: "contact", header: "Contact", sortable: false },
];

interface Props {
	data: Member[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onDeleteMany?: (ids: string[]) => void | Promise<void>;
	loading?: boolean;
}

export default function MembersTable({
	data,
	onEdit,
	onDelete,
	onDeleteMany,
	loading = false,
}: Props) {
	return (
		<Table<Member>
			idField="id"
			columns={columns}
			data={data}
			loading={loading}
			initialPageSize={10}
			onEdit={onEdit}
			onDelete={onDelete}
			onDeleteMany={onDeleteMany}
			className="min-w-full"
		/>
	);
}
