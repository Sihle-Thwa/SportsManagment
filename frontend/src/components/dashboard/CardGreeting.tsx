import { Card, CardContent } from "../../components/ui/card";

import greetingCardImg from "../../assets/images/standing-dashboard-image.svg";

export function CardGreeting() {
	return (
		<Card className="card max-h-[345px] h-fit items-center justify-center">
			<CardContent className="card-body flex flex-row items-start justify-center ">
				<div className="flex flex-row items-center justify-between">
					{/* Text Section */}
					<div className="flex flex-col items-start gap-3 w-fit h-fit">
						<h1>
							Welcome, Laurel Higher Secondary School Team!
						</h1>
						<p >
							We are thrilled to have you on board. Our platform is designed
							to help you manage your teams operations with ease. Stay updated on events,
							players, members, and more—all in one place. Let’s keep shaping
							a brighter future together!
						</p>
					</div>
					{/* Image Section */}
					<div className="flex flex-col items-end h-fit w-full">
						<img
							src={greetingCardImg}
							alt="standing-infront-of-dashboard"
							className="w-full h-100 object-fill"
						/>
					</div>
				</div>

			</CardContent>
		</Card>
	);
}
