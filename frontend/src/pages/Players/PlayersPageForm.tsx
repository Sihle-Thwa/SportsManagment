import { getPlayersFormData } from "../../routes/playersmockdata";
import "./playerspageform.css";

export default function PlayersPageForm() {
	const players = getPlayersFormData();

	return (
		<div
			className="cardBase_playersPageForm"
			aria-labelledby="Players-Program-Form"
		>
			{players.map((player) => (
				<div key={player.id}>
					<div className="cardBase_playerPageForm-header">
						<div className="cardBase_playerPageForm-title">
							{player.firstName} {player.lastName}
						</div>
						<div className="accentLine_playersPageForm" aria-hidden />
					</div>
				</div>
			))}
		</div>
	);
}
