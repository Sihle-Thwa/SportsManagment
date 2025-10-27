"use client";
import CardGreeting from "../../components/common/Cards/Greetings/CardGreeting";
import { CardStatistics } from "../../components/common/Cards/Statistics/CardStatistics";
import { CalendarObject } from "../../components/common/Cards/Calendar/CalendarObject";
import { CardNotices } from "../../components/common/Cards/Notices/CardNotices";
import { MessagesSummary } from "../../components/common/Cards/Messages/MessagesSummary";
import { CardPlayerSummary } from "../../components/common/Cards/Users/CardPlayerSummary";
import "./dashboard.css";

export default function DashboardPage() {
	return (
		<div className="dashboard">
			<div className="dashboard-grid">
				<div className=" greeting-col">
					<CardGreeting />
				</div>
				<div className=" calendar-col">
					<CalendarObject />
				</div>

				<div className=" stats-col">
					<CardStatistics />
				</div>

				<div className=" messages-col">
					<MessagesSummary />
				</div>

				<div className=" players-col">
					<CardPlayerSummary />
				</div>

				<div className=" notices-col">
					<CardNotices />
				</div>
			</div>
		</div>
	);
}
