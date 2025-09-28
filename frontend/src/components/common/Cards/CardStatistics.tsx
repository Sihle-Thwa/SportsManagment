"use client";
import React from "react";
import { statsdata } from "../../../routes/statsdata";
import { Skeleton } from "../Skeleton/Skeleton";
import "./cardstatistics.css";

export const CardStatistics: React.FC<{ loading?: boolean }> = ({
	loading = false,
}) => {
	if (loading) {
		// show 4 skeleton cards
		return (
			<div className="stats-grid" role="list" aria-label="Statistics">
				{Array.from({ length: 4 }).map((_, i) => (
					<div key={i} className="card-stat">
						<div className="cardstat-body">
							<Skeleton className="skeleton-stat-icon" />
							<div className="cardstat-copy">
								<Skeleton className="skeleton-stat-value" />
								<Skeleton className="skeleton-stat-line" />
							</div>
						</div>
					</div>
				))}
			</div>
		);
	}

	return (
		<div className="stats-grid" role="list" aria-label="Statistics">
			{statsdata.map((item, idx) => (
				<div key={item.title ?? idx} className="card-stat" role="listitem">
					<div className="cardstat-body">
						<div className="cardstat-icon" aria-hidden>
							{item.icon ? <item.icon /> : <div className="icon-placeholder" />}
						</div>
						<div className="cardstat-copy">
							<div className="cardstat-value">{item.value}</div>
							<div className="cardstat-title">{item.title}</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};
