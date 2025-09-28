"use client";
import React from "react";
import { MoreVertical, Plus } from "lucide-react";
import { ChartBar } from "../../Charts/ChartBar";
import { Skeleton } from "../../Skeleton/Skeleton";

export const CardPlayerSummary: React.FC<{ loading?: boolean }> = ({
	loading = false,
}) => {
	if (loading) {
		return (
			<div className="card">
				<div className="card-header">
					<div className="card-header-title">Players Summary</div>
					<div className="card-header-actions">
						<Skeleton className="skeleton-icon" />
					</div>
				</div>
				<div className="card-body">
					<Skeleton className="skeleton-chart" />
				</div>
				<div className="card-footer">
					<Skeleton className="skeleton-button" />
				</div>
			</div>
		);
	}

	return (
		<div className="card">
			<div className="card-header">
				<div className="card-header-title">Players Summary</div>
				<div className="card-header-actions">
					<button
						className="button button-ghost button-icon-only"
						aria-label="More options"
					>
						<MoreVertical />
					</button>
				</div>
			</div>
			<div className="card-body chart-body">
				<ChartBar />
			</div>
			<div className="card-footer">
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
