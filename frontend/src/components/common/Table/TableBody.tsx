// src/components/Table/TableBody.tsx
import { Edit2, Trash2 } from "lucide-react";
import "./table.css";
import type { Member } from "./MembersTable"; // Import Member type

export default function TableBody({
	columns,
	rows,
	loading,
	onSort,
	sortBy,
	onEdit,
	onDelete,
	// selection props
	selectedMap = {},
	toggleRow,
	toggleSelectAllVisible,
	isAllVisibleSelected = false,
	isSomeVisibleSelected = false,
}: {
	columns: { key: string; label: string; sortable?: boolean }[];
	rows: Member[]; // Fix type here
	loading?: boolean;
	sortBy?: { key: string; dir: "asc" | "desc" } | null;
	onSort?: (key: string) => void;
	onEdit?: (id: string) => void;
	onDelete?: (id: string) => void;
	selectedMap?: Record<string, boolean>;
	toggleRow?: (id: string) => void;
	toggleSelectAllVisible?: () => void;
	isAllVisibleSelected?: boolean;
	isSomeVisibleSelected?: boolean;
}) {
	if (loading) {
		return (
			<div className="table-wrap" role="table" aria-busy="true">
				<div className="table-head" role="rowgroup">
					<div className="table-row table-row--head" role="row">
						<div className="table-cell table-cell--head select-col">
							<div className="skeleton skeleton-text" style={{ width: 24 }} />
						</div>
						{columns.map((c) => (
							<div
								role="columnheader"
								className="table-cell table-cell--head"
								key={c.key}
							>
								<div
									className="skeleton skeleton-text"
									style={{ width: 120 }}
								/>
							</div>
						))}
						<div
							role="columnheader"
							className="table-cell table-cell--head actions"
						/>
					</div>
				</div>

				<div className="table-body" role="rowgroup">
					{Array.from({ length: 6 }).map((_, i) => (
						<div className="table-row" role="row" key={i}>
							<div className="table-cell select-col" role="cell">
								<div className="skeleton skeleton-icon" />
							</div>
							{columns.map((c) => (
								<div className="table-cell" role="cell" key={c.key}>
									<div className="skeleton skeleton-text" />
								</div>
							))}
							<div className="table-cell actions" role="cell">
								<div className="skeleton skeleton-icon" />
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="table-wrap" role="table" aria-label="Members list">
			<div className="table-head" role="rowgroup">
				<div className="table-row table-row--head" role="row">
					{/* select all checkbox header */}
					<div
						className="table-cell table-cell--head select-col"
						role="columnheader"
					>
						<input
							type="checkbox"
							aria-label={
								isAllVisibleSelected
									? "Unselect all visible"
									: "Select all visible"
							}
							checked={isAllVisibleSelected}
							ref={(el) => {
								if (!el) return;
								el.indeterminate =
									!isAllVisibleSelected && isSomeVisibleSelected;
							}}
							onChange={() => toggleSelectAllVisible?.()}
						/>
					</div>

					{columns.map((col) => {
						const active = sortBy?.key === col.key;
						return (
							<div
								role="columnheader"
								key={String(col.key)}
								className={`table-cell table-cell--head ${
									col.sortable ? "sortable" : ""
								}`}
								aria-sort={
									active
										? sortBy!.dir === "asc"
											? "ascending"
											: "descending"
										: "none"
								}
							>
								<button
									type="button"
									className="table-header-button"
									onClick={() => col.sortable && onSort?.(String(col.key))}
									aria-label={`Sort by ${col.label}`}
								>
									<span>{col.label}</span>
									{col.sortable && (
										<span
											className={`sort-indicator ${active ? "active" : ""}`}
										>
											{active && sortBy?.dir === "asc" ? "▲" : "▼"}
										</span>
									)}
								</button>
							</div>
						);
					})}
					<div
						role="columnheader"
						className="table-cell table-cell--head actions"
						aria-hidden
					>
						Action
					</div>
				</div>
			</div>

			<div className="table-body" role="rowgroup">
				{rows.length === 0 ? (
					<div className="table-empty" role="row">
						<div className="table-empty__content">
							No members match your search.
						</div>
					</div>
				) : (
					rows.map((row) => {
						const checked = !!selectedMap[row.id];
						return (
							<div className="table-row" role="row" key={row.id}>
								<div
									className="table-cell select-col"
									role="cell"
									data-label="Select"
								>
									<input
										type="checkbox"
										aria-label={`Select ${row.firstName} ${row.lastName}`}
										checked={checked}
										onChange={() => toggleRow?.(row.id)}
									/>
								</div>

								<div className="table-cell" role="cell" data-label="ID">
									{row.id}
								</div>

								<div className="table-cell" role="cell" data-label="Name">
									<div className="user-cell">
										<div className="avatar-placeholder" aria-hidden>
											<svg
												width="28"
												height="28"
												viewBox="0 0 24 24"
												fill="none"
												aria-hidden
											>
												<path
													d="M12 12a4 4 0 100-8 4 4 0 000 8z"
													stroke="currentColor"
													strokeWidth="1.5"
												/>
												<path
													d="M4 20a8 8 0 0116 0"
													stroke="currentColor"
													strokeWidth="1.5"
												/>
											</svg>
										</div>
										<span className="user-name">{row.firstName}</span>
									</div>
								</div>

								<div className="table-cell" role="cell" data-label="Surname">
									{row.lastName}
								</div>

								<div className="table-cell" role="cell" data-label="Email">
									<a className="email-link" href={`mailto:${row.email}`}>
										{row.email}
									</a>
								</div>

								<div className="table-cell" role="cell" data-label="Role">
									{row.role ?? "—"}
								</div>

								<div className="table-cell" role="cell" data-label="Contact">
									{row.contact ?? "—"}
								</div>

								<div
									className="table-cell actions"
									role="cell"
									data-label="Actions"
								>
									<div className="action-buttons">
										<button
											type="button"
											aria-label={`Edit ${row.firstName}`}
											className="icon-btn"
											onClick={() => onEdit?.(row.id)}
										>
											<Edit2 size={16} />
										</button>
										<button
											type="button"
											aria-label={`Delete ${row.firstName}`}
											className="icon-btn destructive"
											onClick={() => onDelete?.(row.id)}
										>
											<Trash2 size={16} />
										</button>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}
