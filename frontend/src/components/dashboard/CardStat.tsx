import React from "react";
import "../../components/dashboard/cardstat.css";

export const CardStat: React.FC<{
	title: string;
	value: string;
	icon: React.ReactNode;
	className?: string;
}> = ({ title, value, icon }) => (
	<div className="cardstat-wrapper">
		<div className="cardstat-container">
			<div className="cardstat-content">
				<div className="cardstat-icon">{icon}</div>
				<div className="cardstat-body">
					<div className="cardstat-value">{value}</div>
					<div className="cardstat-title">{title}</div>
				</div>
			</div>
		</div>
	</div>
);
