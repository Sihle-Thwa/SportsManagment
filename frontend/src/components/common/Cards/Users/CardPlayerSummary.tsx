"use client";
import { MoreVertical } from "lucide-react";
import EventOverviewChart from "../../Charts/EventOverviewChart";
import "./cardplayersummary.css";

function formatMonthRange(startMonth = "January") {
  const now = new Date();
  const endMonth = now.toLocaleString(undefined, { month: "long" });
  const year = now.getFullYear();
  return `${startMonth} ${year} - ${endMonth} ${year}`;
}

export const CardPlayerSummary = () => {
  return (
    <div className="cardPlayers" aria-labelledby="players-heading">
      <div className="cardPlayers-Container">
        <div className="cardPlayers-Content">
          <div className="cardPlayers-Header">
            <div className="cardPlayers-Header__Heading">Events Overview</div>
            <div className="cardPlayers-Header__Actions">
              <button className="cardPlayers-Action">
                <MoreVertical />
              </button>
            </div>
          </div>
          <div className="cardPlayers-Body">
            <div className="cardPlayers-Body__Header">
              <div className="cardPlayers-Body__Heading">Events and Games</div>
              <div className="cardPlayers-Body__Subheading">
                {formatMonthRange()}
              </div>
            </div>
            <div className="cardPlayers-Body-Content">
            <EventOverviewChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
