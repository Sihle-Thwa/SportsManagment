// src/components/Table/MembersTable.tsx
import React, { useMemo, useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import "./table.css";

export type Member = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role?: string;
	contact?: string;
};

export interface MembersTableProps {
	data: Member[];
	loading?: boolean;
	pageSizeOptions?: number[];
	initialPageSize?: number;
	onAddMember?: () => void;
	onEditMember?: (id: string) => void;
	onDeleteMember?: (id: string) => void;
	onSearch?: (query: string) => void;
	/**
	 * Called with array of ids to delete. If returns a Promise it will be awaited.
	 * If not provided, the component will delete selected rows locally after confirm().
	 */
	onDeleteMany?: (ids: string[]) => Promise<void> | void;
}

export default function MembersTable({
	data,
	loading = false,
	pageSizeOptions = [10, 25, 50],
	initialPageSize = 10,
	onAddMember,
	onEditMember,
	onDeleteMember,
	onSearch,
	onDeleteMany,
}: MembersTableProps) {
	const [search, setSearch] = useState("");
	const [pageSize, setPageSize] = useState(initialPageSize);
	const [pageIndex, setPageIndex] = useState(0);
	const [sortBy, setSortBy] = useState<{
		key: keyof Member;
		dir: "asc" | "desc";
	} | null>(null);

	// selection state: map of id -> boolean
	const [selected, setSelected] = useState<Record<string, boolean>>({});

	// local copy to permit optimistic removal if onDeleteMany isn't provided
	const [localData, setLocalData] = useState<Member[]>(data);
	React.useEffect(() => setLocalData(data), [data]);

	// derive rows (filter+sort)
	const filtered = useMemo(() => {
		const q = search.trim().toLowerCase();
		let rows = localData;
		if (q) {
			rows = rows.filter(
				(r) =>
					r.firstName.toLowerCase().includes(q) ||
					r.lastName.toLowerCase().includes(q) ||
					r.email.toLowerCase().includes(q) ||
					(r.role || "").toLowerCase().includes(q) ||
					(r.contact || "").toLowerCase().includes(q),
			);
		}
		if (sortBy) {
			rows = [...rows].sort((a, b) => {
				const A = String(a[sortBy.key] ?? "").toLowerCase();
				const B = String(b[sortBy.key] ?? "").toLowerCase();
				if (A < B) return sortBy.dir === "asc" ? -1 : 1;
				if (A > B) return sortBy.dir === "asc" ? 1 : -1;
				return 0;
			});
		}
		return rows;
	}, [localData, search, sortBy]);

	const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
	const currentPageIndex = Math.min(pageIndex, pageCount - 1);
	const currentPageRows = useMemo(() => {
		const start = currentPageIndex * pageSize;
		return filtered.slice(start, start + pageSize);
	}, [filtered, currentPageIndex, pageSize]);

	// derived selection helpers
	const selectedIds = useMemo(
		() => Object.keys(selected).filter((id) => selected[id]),
		[selected],
	);
	const isAllVisibleSelected =
		currentPageRows.length > 0 &&
		currentPageRows.every((r) => !!selected[r.id]);
	const isSomeVisibleSelected = currentPageRows.some((r) => !!selected[r.id]);

	const handleSearch = (q: string) => {
		setSearch(q);
		setPageIndex(0);
		if (onSearch) onSearch(q);
	};

	const handlePageSize = (size: number) => {
		setPageSize(size);
		setPageIndex(0);
	};

	const handleSort = (key: string) => {
		setPageIndex(0);
		setSortBy((prev) => {
			const k = key as keyof Member;
			if (!prev || prev.key !== k) return { key: k, dir: "asc" };
			return { key: k, dir: prev.dir === "asc" ? "desc" : "asc" };
		});
	};

	// toggle selection helpers
	const toggleRow = (id: string) =>
		setSelected((prev) => {
			const np = { ...prev };
			if (np[id]) delete np[id];
			else np[id] = true;
			return np;
		});

	const toggleSelectAllVisible = () =>
		setSelected((prev) => {
			const np = { ...prev };
			if (isAllVisibleSelected) {
				// unselect visible
				currentPageRows.forEach((r) => delete np[r.id]);
			} else {
				// select visible
				currentPageRows.forEach((r) => (np[r.id] = true));
			}
			return np;
		});

	// single delete (calls onDeleteMember if present, else local)
	const handleDelete = async (id: string) => {
		if (onDeleteMember) {
			onDeleteMember(id);
		} else {
			setLocalData((prev) => prev.filter((r) => r.id !== id));
			setSelected((prev) => {
				const np = { ...prev };
				delete np[id];
				return np;
			});
		}
	};

	// bulk delete
	const handleBulkDelete = async () => {
		if (selectedIds.length === 0) return;
		if (
			!confirm(
				`Delete ${selectedIds.length} selected member(s)? This action cannot be undone.`,
			)
		)
			return;

		try {
			if (onDeleteMany) {
				await onDeleteMany(selectedIds);
				// optionally caller will refetch; we optimistically clear selection
				setSelected({});
			} else {
				// fallback: remove locally
				setLocalData((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
				setSelected({});
			}
		} catch (err) {
			// rudimentary error handling — in real app show toast
			console.error("Bulk delete failed", err);
		}
	};

	return (
		<section className="members-table" aria-labelledby="members-table-title">
			<div className="members-table__inner">
				<TableHeader
					pageSizeOptions={pageSizeOptions}
					pageSize={pageSize}
					onPageSizeChange={handlePageSize}
					onSearch={handleSearch}
					onAdd={onAddMember}
					// selection props
					selectedCount={selectedIds.length}
					onBulkDelete={handleBulkDelete}
				/>

				<TableBody
					columns={[
						{ key: "id", label: "ID", sortable: true },
						{ key: "firstName", label: "Name", sortable: true },
						{ key: "lastName", label: "Surname", sortable: true },
						{ key: "email", label: "Email", sortable: true },
						{ key: "role", label: "Role", sortable: true },
						{ key: "contact", label: "Contact", sortable: false },
					]}
					rows={currentPageRows}
					loading={loading}
					onSort={handleSort}
					sortBy={sortBy}
					onEdit={onEditMember}
					onDelete={handleDelete}
					// selection wiring
					selectedMap={selected}
					toggleRow={toggleRow}
					toggleSelectAllVisible={toggleSelectAllVisible}
					isAllVisibleSelected={isAllVisibleSelected}
					isSomeVisibleSelected={isSomeVisibleSelected}
				/>

				<TableFooter
					pageIndex={currentPageIndex}
					pageCount={pageCount}
					pageSize={pageSize}
					onPageChange={(idx) => setPageIndex(idx)}
					onAdd={onAddMember}
					// selection summary & bulk delete in footer too
					selectedCount={selectedIds.length}
					onBulkDelete={handleBulkDelete}
				/>
			</div>
		</section>
	);
}
