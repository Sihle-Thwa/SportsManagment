"use client";
import React from "react";
import { MoreVertical, Plus } from "lucide-react";
import { ChartBar } from "../../Charts/ChartBar";
import { Skeleton } from "../../Skeleton/Skeleton";
import "./cardplayersummary.css";

export const CardPlayerSummary: React.FC<{ loading?: boolean }> = ({
	loading = false,
}) => {
	if (loading) {
		return (
			<div className="card-player">
				<div className="card-player-header">
					<div className="card-player-header-title">Players Summary</div>
					<div className="card-player-header-actions">
						<Skeleton className="skeleton-icon" />
					</div>
				</div>
				<div className="card-player-body">
					<Skeleton className="skeleton-chart" />
				</div>
				<div className="card-player-footer">
					<Skeleton className="skeleton-button" />
				</div>
			</div>
		);
	}

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
			<div className="card-player-footer">
				<div className="players-cta">
					<button className="button button-secondary button-icon-left">
						<span className="btn-icon">
							<Plus />
						</span>
						Add New Player
					</button>
				</div>
			</div>
		</div>
	);
};
