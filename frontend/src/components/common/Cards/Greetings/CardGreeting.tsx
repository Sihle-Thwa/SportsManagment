import greetingCardImg from "../../../assets/images/standing-dashboard-image.svg";

export function CardGreeting() {
	return (
		<div className="card card-greeting">
			<div className="card-body">
				<div className="greeting-content">
					{/* Text Section */}
					<div className="greeting-text">
						<h1>Welcome, Laurel Higher Secondary School Team!</h1>
						<p>
							We are thrilled to have you on board. Our platform is designed to
							help you manage your teams operations with ease. Stay updated on
							events, players, members, and more—all in one place. Let’s keep
							shaping a brighter future together!
						</p>
					</div>
					{/* Image Section */}
					<div className="greeting-image">
						<img src={greetingCardImg} alt="standing-in-front-of-dashboard" />
					</div>
				</div>
			</div>
		</div>
	);
}
