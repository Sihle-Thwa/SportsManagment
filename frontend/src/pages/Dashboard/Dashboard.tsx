// src/pages/Dashboard.tsx
import React from "react";
import "./dashboard.css";
import { CardStatistics } from "../../components/common/Cards/CardStatistics";

const Dashboard: React.FC = () => {
	return (
		<div className="dashboard-container">
			<div className="dashboard-content">
				<div className="dashboard-content-header">
					<div className="dashboard-content-header-items">
						<CardStatistics />
					</div>
				</div>
				<div className="dashboard-content-main"></div>
				<div className="dashboard-content-secondary"></div>
			</div>
		</div>
	);
};

export default Dashboard;
