import { useState } from "react";
import  playersmockdata  from "../../routes/playersmockdata";
import "./players.css";
import PlayersTable from "../../components/Table/PlayersTable";

export default function Players() {
	const [players] = useState(playersmockdata);

	return (
		<div className="playersRoot">
			<div className="playersHeader" aria-labelledby="players-header">
				<div className="playersTitle" id="players-title">
					Players
				</div>
				<div className="playersSubtitle">
					View and Manage all players of your organisation
				</div>
			</div>

			<section className="playersContainer" aria-label="players editor">
				<div className="playersContent">
					<div className="playersContent_table">
						<PlayersTable data={players} />
					</div>
					<div className="playersContent_form">
						{/* <PlayersForm /> */}
					</div>
				</div>
			</section>
		</div>
	);
}
