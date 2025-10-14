import { getPlayersTableData } from "../../routes/playersmockdata";
import "./playerspagetable.css";

export default function PlayersPageTable() { 
    const players = getPlayersTableData();

    return (
        <table className="playersPageTable">
				<thead className="playersPageTable_tableHeader">
					<tr className="playersPageTable_tableHeader-row">
						<th className="playersPageTable_tableHeader-cell">First Name</th>
						<th className="playersPageTable_tableHeader-cell">Last Name</th>
						<th className="playersPageTable_tableHeader-cell">Status</th>
					</tr>
				</thead>
				<tbody className="playersPageTable_tableBody">
					{players.map((p) => (
						<tr key={p.id} className="playersPageTable_tableBody-row">
							<td className="playersPageTable_tableBody-cell">{p.firstName}</td>
							<td className="playersPageTable_tableBody-cell">{p.lastName}</td>
							<td className="playersPageTable_tableBody-cell">{p.status}</td>
						</tr>
					))}
				</tbody>
			</table>
		);

}