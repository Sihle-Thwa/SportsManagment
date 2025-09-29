"use client";
import React from "react";
import greetingCardImg from "../../../../assets/images/standing-dashboard-image.svg";
import { Skeleton } from "../../Skeleton/Skeleton";
import "./cardgreetings.css";

export const CardGreeting: React.FC<{ loading?: boolean }> = ({
	loading = false,
}) => {
	if (loading) {
		return (
			<section className="card-greeting" aria-labelledby="greeting-heading">
				<div className="card-greeting-body">
					<div className="greeting-content">
						<div className="greeting-text">
							<Skeleton className="skeleton-heading" />
							<Skeleton className="skeleton-line" />
							<div className="greeting-actions">
								<Skeleton className="skeleton-button" />
								<Skeleton className="skeleton-button small" />
							</div>
						</div>
						<div className="greeting-image">
							<Skeleton className="skeleton-image" />
						</div>
					</div>
				</div>
			</section>
		);
	}

	return (
		<div className="card-greeting" aria-labelledby="greeting-heading">
			<div className="card-greeting-body">
				<div className="greeting-content">
					<div className="greeting-text">
						<div id="greeting-heading" className="greeting-heading">
							Welcome, Laurel Higher Secondary School Team!
						</div>
						<div className="greeting-lead">
							Manage your teams operations with ease. Stay updated on events,
							players, members, and more - all in one place. Let’s keep shaping
							a brighter future together!
						</div>
					</div>

					<div className="greeting-image" aria-hidden>
						<img
							src={greetingCardImg}
							alt="Illustration — dashboard overview"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardGreeting;
