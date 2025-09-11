import React from "react";
import "../../common/Cards/cardstatistics.css";
import { statsdata } from "../../../routes/statsdata";

export const CardStatistics: React.FC = () => {
	return statsdata.map((item, index) => (
		<div className="cardstat-container" key={index}>
			<div className="cardstat-content">
				<div className="cardstat-content">
					<div className="cardstat-icon">{<item.icon />}</div>
					<div className="cardstat-body">
						<div className="cardstat-value">{item.value}</div>
						<div className="cardstat-title">{item.title}</div>
					</div>
				</div>
			</div>
		</div>
	));
};
