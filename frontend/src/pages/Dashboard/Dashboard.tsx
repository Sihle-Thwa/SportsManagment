// src/pages/Dashboard.tsx
import React from "react";
import "./dashboard.css";
import { CardGreeting } from "../../components/common/Cards/CardGreeting";

const Dashboard: React.FC = () => {
	return (
		<div className="space-y-6 p-6 ">
			<div className="flex gap-6 md:flex-row flex-col">
				<div className="lg:flex-9/12 md:flex-3/4 flex-1/2">
					<CardGreeting />
				</div>
				<div className="flex-1/4 "></div>
			</div>
		</div>
	);
};

export default Dashboard;
