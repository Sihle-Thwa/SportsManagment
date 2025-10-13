import Table from "./Table";
import type { ColumnDef } from "./types";
import type { User } from "../../types/user.types";
import { User as UserIcon, Edit, Trash2 } from "lucide-react";

/**
 * Columns for users table
 */
const columns: ColumnDef<User>[] = [
	{ key: "id", header: "ID", sortable: true },
	{
		key: "fullName",
		header: "Name",
		sortable: true,
		render: (row) => (
			<div className="flex items-center gap-3">
				<div
					className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-sm overflow-hidden"
					aria-hidden
				>
					{row.fullName ? (
						row.fullName
							.split(" ")
							.map((n) => n[0])
							.slice(0, 2)
							.join("")
					) : (
						<UserIcon />
					)}
				</div>
				<div>
					<div className="font-medium">{row.fullName}</div>
					<div className="text-sm text-muted-foreground">{row.email}</div>
				</div>
			</div>
		),
	},
	{ key: "username", header: "Username", sortable: true },
	{ key: "email", header: "Email", sortable: true },
	{ key: "role", header: "Role", sortable: true },
	{
		key: "active",
		header: "Active",
		sortable: false,
		render: (r) => (
			<span
				className={`px-2 py-0.5 rounded text-sm ${
					r.active ? "text-success-700 bg-success-100" : "text-muted-foreground"
				}`}
			>
				{r.active ? "Yes" : "No"}
			</span>
		),
	},
];

type Props = {
	data: User[];
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	onDeleteMany?: (ids: string[]) => Promise<void> | void;
	loading?: boolean;
};

export default function UsersTable({
	data,
	onEdit,
	onDelete,
	onDeleteMany,
	loading = false,
}: Props) {
	return (
		<Table<User>
			columns={columns}
			data={data}
			idField="id"
			loading={loading}
			onEdit={onEdit}
			onDelete={onDelete}
			onDeleteMany={onDeleteMany}
			initialPageSize={10}
			className="w-full"
			renderRow={(row) => (
				<tr key={row.id} className="odd:bg-transparent even:bg-card-background">
					<td className="p-2 text-center">
						<input type="checkbox" aria-label={`Select user ${row.fullName}`} />
					</td>

					<td className="p-2">{row.id}</td>

					<td className="p-2">
						<div className="flex items-center gap-3">
							<div
								className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-sm overflow-hidden"
								aria-hidden
							>
								{row.fullName ? (
									row.fullName
										.split(" ")
										.map((n) => n[0])
										.slice(0, 2)
										.join("")
								) : (
									<UserIcon />
								)}
							</div>
							<div>
								<div className="font-medium">{row.fullName}</div>
								<div className="text-sm text-muted-foreground">{row.email}</div>
							</div>
						</div>
					</td>

					<td className="p-2">{row.username}</td>
					<td className="p-2">{row.email}</td>
					<td className="p-2">{row.role}</td>

					<td className="p-2">
						<span
							className={`px-2 py-0.5 rounded text-sm ${
								row.active
									? "text-success-700 bg-success-100"
									: "text-muted-foreground"
							}`}
						>
							{row.active ? "Yes" : "No"}
						</span>
					</td>

					<td className="p-2 text-right">
						<button
							aria-label={`Edit ${row.fullName}`}
							onClick={() => onEdit?.(row.id)}
							className="mr-2"
						>
							<Edit size={16} />
						</button>
						<button
							aria-label={`Delete ${row.fullName}`}
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
