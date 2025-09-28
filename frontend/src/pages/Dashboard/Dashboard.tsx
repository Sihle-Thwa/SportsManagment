"use client";
import React from "react";
import CardGreeting from "../../components/common/Cards/Greetings/CardGreeting";
import { CardStatistics } from "../../components/common/Cards//CardStatistics";
import { CalendarObject } from "../../components/common/Cards/Calendar/CalendarObject";
import { CardNotices } from "../../components/common/Cards/Notices/CardNotices";
import { MessagesSummary } from "../../components/common/Cards/Messages/MessagesSummary";
import { CardPlayerSummary } from "../../components/common/Cards/Users/CardPlayerSummary";
import "./dashboard.css";

export default function DashboardPage() {
	// simulate loading for demo; replace with real data flow flags
	const [loading, setLoading] = React.useState(true);
	React.useEffect(() => {
		const t = setTimeout(() => setLoading(false), 900);
		return () => clearTimeout(t);
	}, []);

	return (
		<div className="dashboard">
			<div className="dashboard-grid">
				<div className="grid-col greeting-col">
					<CardGreeting loading={loading} />
				</div>

				<div className="grid-col stats-col">
					<CardStatistics loading={loading} />
				</div>

				<div className="grid-col messages-col">
					<MessagesSummary loading={loading} />
				</div>

				<div className="grid-col players-col">
					<CardPlayerSummary loading={loading} />
				</div>

				<div className="grid-col calendar-col">
					<CalendarObject loading={loading} />
				</div>

				<div className="grid-col notices-col">
					<CardNotices loading={loading} />
				</div>
			</div>
		</div>
	);
}
