import Table from "./Table";
import type { ColumnDef } from "./types";
import type { Facility } from "../../types/facility.types";
import { MapPin, Trash2, Edit } from "lucide-react";

/**
 * Columns for facilities table
 */
const columns: ColumnDef<Facility>[] = [
	{ key: "id", header: "ID", sortable: true },
	{
		key: "name",
		header: "Name",
		sortable: true,
		render: (row) => (
			<div className="flex items-center gap-3">
				<div
					className="w-8 h-8 rounded bg-surface flex items-center justify-center text-sm"
					aria-hidden
				>
					<MapPin />
				</div>
				<div>
					<div className="font-medium">{row.name}</div>
					{row.location && (
						<div className="text-sm text-muted-foreground">{row.location}</div>
					)}
				</div>
			</div>
		),
	},
	{ key: "location", header: "Location", sortable: true },
	{
		key: "capacity",
		header: "Capacity",
		sortable: true,
		render: (r) =>
			typeof r.capacity === "number" ? r.capacity.toString() : "—",
	},
	{
		key: "status",
		header: "Status",
		sortable: true,
		render: (r) => {
			const isActive = r.status === "active";
			return (
				<span
					className={`inline-flex items-center px-2 py-0.5 rounded text-sm ${
						isActive
							? "bg-success-100 text-success-700"
							: "bg-muted text-muted-foreground"
					}`}
					aria-label={`Status ${String(r.status)}`}
				>
					{String(r.status)}
				</span>
			);
		},
	},
];

type Props = {
	data: Facility[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onDeleteMany?: (ids: string[]) => Promise<void> | void;
	loading?: boolean;
};

export default function FacilitiesTable({
	data,
	onEdit,
	onDelete,
	onDeleteMany,
	loading = false,
}: Props) {
	return (
		<Table<Facility>
			columns={columns}
			data={data}
			idField="id"
			loading={loading}
			initialPageSize={10}
			onEdit={onEdit}
			onDelete={onDelete}
			onDeleteMany={onDeleteMany}
			className="w-full"
			// Optional: provide a custom row renderer if you want to style differently
			renderRow={(row) => (
				<tr key={row.id} className="odd:bg-transparent even:bg-card-background">
					<td className="p-2 text-center">
						{/* selection checkbox rendered by Table default — but if you override fully,
                ensure to include the checkbox and selection wiring */}
						<input type="checkbox" aria-label={`Select facility ${row.name}`} />
					</td>

					<td className="p-2">{row.id}</td>

					<td className="p-2">
						<div className="flex items-center gap-3">
							<div
								className="w-8 h-8 rounded bg-surface flex items-center justify-center text-sm"
								aria-hidden
							>
								<MapPin />
							</div>
							<div>
								<div className="font-medium">{row.name}</div>
								<div className="text-sm text-muted-foreground">
									{row.location}
								</div>
							</div>
						</div>
					</td>

					<td className="p-2">{row.location}</td>
					<td className="p-2">{row.capacity ?? "—"}</td>

					<td className="p-2">
						<span
							className={`inline-flex items-center px-2 py-0.5 rounded text-sm ${
								row.status === "active"
									? "bg-success-100 text-success-700"
									: "bg-muted text-muted-foreground"
							}`}
						>
							{row.status}
						</span>
					</td>

					<td className="p-2 text-right">
						<button
							aria-label={`Edit ${row.name}`}
							onClick={() => onEdit?.(row.id)}
							className="mr-2"
						>
							<Edit size={16} />
						</button>
						<button
							aria-label={`Delete ${row.name}`}
							onClick={() => onDelete?.(row.id)}
							className="text-destructive"
						>
							<Trash2 size={16} />
						</button>
					</td>
				</tr>
			)}
		/>
	);
}
