import { Card, CardContent } from "@/components/ui/card";
import React from "react";

export const CardStat: React.FC<{
	title: string;
	value: string;
	icon: React.ReactNode;
	className?: string;
}> = ({ title, value, icon }) => (
	<div className="flex flex-col sm:w-sm md:w-96 lg:w-1/4 ">
		<Card className="flex items-start py-3 px-6">
			<CardContent className="flex p-3 md:grid-cols-2 w-max gap-3">
				<div className="flex p-3 items-center h-16 w-16 rounded-full bg-amber-100 text-amber-500">
					{icon}
				</div>

				<div className="flex flex-col items-start p-3 gap-2 shrink-0 self-stretch">
					<div className="flex text-xl font-bold">{value}</div>
					<div className="flex text-sm font-normal">{title}</div>
				</div>
			</CardContent>
		</Card>
	</div>
);
