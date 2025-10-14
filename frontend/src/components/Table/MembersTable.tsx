import Table from "./Table";
import type { Member } from "../../types/member.types";
import membersmockdata from "../../routes/membersmockdata";

const columns = [
	{
		id: "id",
		header: "ID",
		accessor: (r: Member) => r.id,
		sortable: true,
	},
	{
		id: "firstName",
		header: "Name",
		accessor: (r: Member) => r.firstName,
		sortable: true,
	},
	{
		id: "lastName",
		header: "Surname",
		accessor: (r: Member) => r.lastName,
		sortable: true,
	},
	{ id: "email", header: "Email", accessor: (r: Member) => r.email },
	{ id: "role", header: "Role", accessor: (r: Member) => r.role },
	{ id: "contact", header: "Contact", accessor: (r: Member) => r.contact },
];

interface Props {
	data: Member[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onDeleteMany?: (ids: string[]) => void | Promise<void>;
	loading?: boolean;
}

export default function MembersTable({
	data = membersmockdata,
	loading = false,
}: Props) {
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
