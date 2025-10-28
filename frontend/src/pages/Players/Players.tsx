import { useState } from "react";
import PlayersPageForm from "./PlayersPageForm";
import PlayersPageTable from "./PlayersPageTable";
import "./players.css";

export default function Players() {
	const [selectedPlayerId, setSelectedPlayerId] = useState<string >("");

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
					<div className="playersContent_table" aria-live="polite">
						<PlayersPageTable
							onSelect={setSelectedPlayerId}
							selectedId={selectedPlayerId}
						/>
					</div>
					<div className="playersContent_form">
						<PlayersPageForm selectedId={selectedPlayerId} />
					</div>
				</div>
			</section>
		</div>
	);
}
