"use client";
import { MoreVertical } from "lucide-react";
import { ChartBar } from "../../Charts/ChartBar";
import "./cardplayersummary.css";

export const CardPlayerSummary = () => {
	return (
		<div className="card-player">
			<div className="card-player-header">
				<div className="card-player-header-title">Players </div>
				<div className="card-player-header-actions">
					<button
						className="button button-ghost button-icon-only"
						aria-label="More options"
					>
						<MoreVertical />
					</button>
				</div>
			</div>
			<div className="card-player-body chart-body">
				<ChartBar />
			</div>
			{/* Add Options to add a new player in the vertical button as a modal */}
		</div>
	);
};
