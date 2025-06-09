import { Card, CardContent } from "../../components/ui/card";
import React from "react";

export const CardStat: React.FC<{
	title: string;
	value: string;
	icon: React.ReactNode;
	className?: string;
}> = ({ title, value, icon }) => (
	<div className="flex flex-col sm:w-sm md:w-96 lg:w-1/4 ">
		<Card className="card flex items-start py-3 px-4">
			<CardContent className="card-body flex md:grid-cols-2 w-max gap-3">
				<div className="icon-base icon-accent">
					{icon}
				</div>

				<div className=" card-body flex flex-col items-start  shrink-0 ">
					<h4>{value}</h4>
					<h5>{title}</h5>
				</div>
			</CardContent>
		</Card>
	</div>
);
