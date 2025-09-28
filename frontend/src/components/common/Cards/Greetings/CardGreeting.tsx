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
		<section className="card-greeting" aria-labelledby="greeting-heading">
			<div className="card-greeting-body">
				<div className="greeting-content">
					<div className="greeting-text">
						<div id="greeting-heading" className="greeting-heading">
							Welcome, Laurel Higher Secondary School Team!
						</div>
						<div className="greeting-lead">
							We’re thrilled to have you. Manage events, players, members and
							more — all in one place.
						</div>
						<div className="greeting-actions">
							<button className="button button-primary">Get Started</button>
							<button className="button button-ghost">Learn More</button>
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
		</section>
	);
};

export default CardGreeting;
