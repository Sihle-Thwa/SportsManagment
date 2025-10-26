"use client";
import React from "react";
import "./cardnotices.css";

export type Notice = {
	id: string | number;
	title: string;
	body?: string;
	time?: string;
};

export const CardNotices: React.FC<{ notices?: Notice[] }> = ({ notices }) => {
	const latest = (notices || []).slice(0, 4);

	return (
		<div className="card-notices" aria-labelledby="notices-heading">
			<div className="card-notices-header">
				<div className="card-notices-header-title" id="notices-heading">
					Notices
				</div>
			</div>
			<div className="card-notices-body">
				{latest.length === 0 ? (
					<div className="empty">No recent notices</div>
				) : (
					<ul className="notices-list" role="list">
						{latest.map((n) => (
							<li key={n.id} className="notice-item">
								<div className="notice-meta">
									<div className="notice-title">{n.title}</div>
									{n.time && <div className="notice-time">{n.time}</div>}
								</div>
								{n.body && <div className="notice-content">{n.body}</div>}
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
