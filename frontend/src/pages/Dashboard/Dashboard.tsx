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
    <div className="dashboardRoot">
      <div className="dashboardContainer">
        <div className="dashboardContent">
          <div className=" greetingContent">
            <CardGreeting />
          </div>
          <div className=" calendarContent">
            <CalendarObject />
          </div>

          <div className=" statsContent">
            <CardStatistics />
          </div>

          <div className=" messagesContent">
            <MessagesSummary />
          </div>

          <div className=" playersContent">
            <CardPlayerSummary />
          </div>

          <div className=" noticesContent">
            <CardNotices />
          </div>
        </div>
      </div>
    </div>
  );
}
