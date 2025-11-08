"use client";
import { MoreVertical } from "lucide-react";
import EventOverviewChart from "../../Charts/EventOverviewChart";
import "./cardplayersummary.css";

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
              <EventOverviewChart />
          </div>
        </div>
      </div>
    </div>
  );
};
