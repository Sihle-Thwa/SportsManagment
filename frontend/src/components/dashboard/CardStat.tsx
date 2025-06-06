import { Card, CardContent } from "../../components/ui/card";
import React from "react";

export const CardStat: React.FC<{
	title: string;
	value: string;
	icon: React.ReactNode;
	className?: string;
}> = ({ title, value, icon }) => (
	<div className="flex flex-col sm:w-sm md:w-96 lg:w-1/4 ">
		<Card className="card-base card-stat flex items-start py-3 px-6">
			<CardContent className="card-body flex md:grid-cols-2 w-max gap-3">
				<div className="icon-base icon-accent">
					{icon}
				</div>

				<div className=" card-body flex flex-col items-start  shrink-0 self-stretch">
					<h5>{value}</h5>
					<h6>{title}</h6>
				</div>
			</CardContent>
		</Card>
	</div>
);
