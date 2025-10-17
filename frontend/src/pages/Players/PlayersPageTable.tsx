// src/pages/players/PlayersPageTable.tsx
import React, { useMemo, useState, useEffect } from "react";
import { getPlayersTableData } from "../../routes/playersmockdata"; // must return { id, firstName, lastName, status }[]
import "./playerspagetable.css";

type Props = {
	selectedId?: string | null;
	onSelect?: (id: string | null) => void;
};

export default function PlayersPageTable({ selectedId, onSelect }: Props) {
	const players = useMemo(() => getPlayersTableData(), []);
	const [localSelected, setLocalSelected] = useState<string | null>(
		selectedId ?? null,
	);

	// sync prop -> local
	useEffect(() => setLocalSelected(selectedId ?? null), [selectedId]);

	function handleRowClick(id: string) {
		const next = localSelected === id ? null : id;
		setLocalSelected(next);
		onSelect?.(next);
	}

	// keyboard: allow up/down + Enter to select
	function onRowKeyDown(e: React.KeyboardEvent, index: number) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			handleRowClick(players[index].id);
			return;
		}

		if (e.key === "ArrowDown") {
			e.preventDefault();
			const next = Math.min(players.length - 1, index + 1);
			const el = document.querySelector<HTMLTableRowElement>(
				`tr[data-row-index="${next}"]`,
			);
			el?.focus();
		}
		if (e.key === "ArrowUp") {
			e.preventDefault();
			const prev = Math.max(0, index - 1);
			const el = document.querySelector<HTMLTableRowElement>(
				`tr[data-row-index="${prev}"]`,
			);
			el?.focus();
		}
	}

	return (
		<div className="playersPageTableWrapper">
			<table
				className="playersPageTable"
				role="table"
				aria-label="Players list"
			>
				<thead className="playersPageTable_tableHeader ">
					<tr className="playersPageTable_tableHeader-row playersPageTable__header-row">
						<th
							role="columnheader"
							className="playersPageTable_tableHeader-cell playersPageTable__header-cell"
						>
							First Name
						</th>
						<th
							role="columnheader"
							className="playersPageTable_tableHeader-cell players-page-table__header-cell playersPageTable__headerCell"
						>
							Last Name
						</th>
						<th
							role="columnheader"
							className="playersPageTable_tableHeader-cell players-page-table__header-cell playersPageTable__headerCell"
						>
							Status
						</th>
					</tr>
				</thead>

				<tbody className="playersPageTable_tableBody players-page-table__body playersPageTable__body">
					{players.map((p, i) => {
						const isSelected = localSelected === p.id;
						return (
							<tr
								key={p.id}
								data-row-index={i}
								tabIndex={0}
								role="row"
								aria-selected={isSelected}
								className={`playersPageTable_tableBody-row players-page-table__row playersPageTable__row ${
									isSelected ? "is-selected" : ""
								}`}
								onClick={() => handleRowClick(p.id)}
								onKeyDown={(e) => onRowKeyDown(e, i)}
							>
								<td
									role="cell"
									className="playersPageTable_tableBody-cell players-page-table__cell playersPageTable__cell table-data-field"
								>
									{p.firstName}
								</td>
								<td
									role="cell"
									className="playersPageTable_tableBody-cell players-page-table__cell playersPageTable__cell table-data-field"
								>
									{p.lastName}
								</td>
								<td
									role="cell"
									className="playersPageTable_tableBody-cell players-page-table__cell playersPageTable__cell table-data-field"
								>
									{p.status}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<div aria-live="polite" className="selection-live">
				{localSelected
					? `Selected player ${localSelected}`
					: "No player selected"}
			</div>
		</div>
	);
}
