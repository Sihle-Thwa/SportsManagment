import { MoreVertical, Plus } from "lucide-react";
import { ChartBar } from "../Charts/ChartBar";

const CardPlayerSummary = () => {
	return (
		<div className="card">
			<div className="card-header flex flex-row items-start justify-between">
				<div className="card-header-title">Players Summary</div>
				<button className="button button-ghost button-icon-only">
					<MoreVertical />
				</button>
			</div>
			<div className="card-body flex flex-col w-full overflow-y-auto">
				<ChartBar />
			</div>
			<div className="card-footer flex flex-row items-end justify-center">
				<div className="flex flex-row w-fit h-fit gap-3">
					<button className="button button-secondary button-icon-left">
						<div className="button-icon-left">
							<Plus />
						</div>
						Add New Player
					</button>
				</div>
			</div>
		</div>
	);
};

export default CardPlayerSummary;
