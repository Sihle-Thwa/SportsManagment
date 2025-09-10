import { MoreVertical, Plus } from "lucide-react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../ui/card";
import { ChartBar } from "../Charts/ChartBar";

const PlayerSummaryDashboard = () => {
	return (
		<Card className="card">
			<CardHeader className="card-header flex flex-row items-start justify-between">
				<CardTitle className="card-header-title">Players Summary</CardTitle>
				<button className="button button-ghost button-icon-only">
					<MoreVertical />
				</button>
			</CardHeader>
			<CardContent className="card-body flex flex-col w-full overflow-y-auto">
				<ChartBar />
			</CardContent>
			<CardFooter className="card-footer flex flex-row items-end justify-center">
				<div className="flex flex-row w-fit h-fit gap-3">
					<button className="button button-secondary button-icon-left">
						<div className="button-icon-left">
							<Plus />
						</div>
						Add New Player
					</button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default PlayerSummaryDashboard;
