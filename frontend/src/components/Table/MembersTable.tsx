import Table from "./Table";
import type { ColumnDef } from "./types";
import type { Member } from "../../types/member.types";

const columns: ColumnDef<Member>[] = [
	{ id: "id", header: "ID", sortable: true },
	{
		id: "firstName", // Changed from "name" to "firstName"
		header: "Name",
		sortable: true,
	},
	{ id: "lastName", header: "Last Name", sortable: true },
	{ id: "email", header: "Email", sortable: true },
	{ id: "role", header: "Role", sortable: true },
	{ id: "contact", header: "Contact", sortable: false },
];

interface Props {
	data: Member[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onDeleteMany?: (ids: string[]) => void | Promise<void>;
	loading?: boolean;
}

export default function MembersTable({ data, loading = false }: Props) {
	return (
		<Table<Member>
			columns={columns}
			data={data}
			loading={loading}
			initialPageSize={10}
			getRowId={(row) => row.id}
		/>
	);
}
