import Table from "./Table";
import type { ColumnDef } from "./types";
import type { Facility } from "../../types/facility.types";

/**
 * Columns for facilities table
 */
const columns: ColumnDef<Facility>[] = [
	{ id: "id", header: "ID", sortable: true },
	{
		id: "name",
		header: "Name",
		sortable: true,
	},
	{ id: "location", header: "Location", sortable: true },
	{
		id: "capacity",
		header: "Capacity",
		sortable: true,
	},
	{
		id: "status",
		header: "Status",
		sortable: true,
	},
];

type Props = {
	data: Facility[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onDeleteMany?: (ids: string[]) => Promise<void> | void;
	loading?: boolean;
};

export default function FacilitiesTable({ data, loading = false }: Props) {
	return (
		<Table<Facility>
			columns={columns}
			data={data}
			loading={loading}
			getRowId={(row) => row.id}
			// If Table supports row actions, you may pass them here:
			// onEdit={onEdit}
			// onDelete={onDelete}
			// onDeleteMany={onDeleteMany}
		/>
	);
}
