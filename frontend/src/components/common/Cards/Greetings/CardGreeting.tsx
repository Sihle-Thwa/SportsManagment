"use client";
import greetingCardImg from "../../../../assets/images/standing-dashboard-image.svg";
import "./cardgreetings.css";

export const CardGreeting = () => {
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
