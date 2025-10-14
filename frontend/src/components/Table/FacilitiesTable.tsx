import Table from "./Table";
import type { Facility } from "../../types/facility.types";
import facilitiesmockdata from "../../routes/facilitiesmockdata";

const columns = [
	{
		id: "id",
		header: "ID",
		accessor: (r: Facility) => r.id,
		sortable: true,
	},
	{
		id: "name",
		header: "Name",
		accessor: (r: Facility) => r.name,
		sortable: true,
	},
	{
		id: "location",
		header: "Location",
		accessor: (r: Facility) => r.location,
		sortable: true,
	},
	{
		id: "capacity",
		header: "Capacity",
		accessor: (r: Facility) => r.capacity,
		sortable: true,
	},
	{
		id: "status",
		header: "Status",
		accessor: (r: Facility) => r.status,
		sortable: true,
	},
];

interface Props {
	data: Facility[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onDeleteMany?: (ids: string[]) => Promise<void> | void;
	loading?: boolean;
}

export default function FacilitiesTable({
	data = facilitiesmockdata,
	loading = false,
}: Props) {
	return (
		<Table<Facility>
			columns={columns}
			data={data}
			loading={loading}
			initialPageSize={10}
			getRowId={(row) => row.id}
		/>
	);
}
