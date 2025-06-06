import { Card, CardContent } from "../../components/ui/card";

import greetingCardImg from "../../assets/images/standing-dashboard-image.svg";

export function CardGreeting() {
	return (
		<Card className="card-base flex flex-row max-w-full max-h-[345px] items-center justify-center overflow-hidden">
			<CardContent className="card-body flex flex-row items-start justify-center gap-3 ">
				<div className="flex flex-row items-center justify-center gap-3 w-full h-fit">
					<div className="flex flex-col items-start">
						<div className="flex flex-col items-start gap-3 h-fit">
							<h1>
								Welcome, Laurel Higher Secondary School Team!
							</h1>
							<p >
								We are thrilled to have you on board. Our platform is designed
								Manage your teams operations with ease. Stay updated on events,
								players, members, and more—all in one place. Let’s keep shaping
								a brighter future together!
							</p>
						</div>
					</div>
					{/* Image Section */}
					<div className="flex flex-col items-end gap-3 w-full h-fit">
						<img
							src={greetingCardImg}
							alt="standing-infront-of-dashboard"
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
