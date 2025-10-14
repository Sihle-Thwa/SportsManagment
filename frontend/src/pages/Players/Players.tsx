import "./players.css";
import PlayersPageForm from "./PlayersPageForm";
import PlayersPageTable from "./PlayersPageTable";
//import PlayersPageForm from "./PlayersPageForm";

export default function Players() {
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
						<PlayersPageTable />{" "}
					</div>
					<div className="playersContent_form">
						<PlayersPageForm />
					</div>
				</div>
			</section>
		</div>
	);
}
