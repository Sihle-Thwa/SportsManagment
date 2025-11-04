"use client";
import { MoreVertical } from "lucide-react";
import { ChartBar } from "../../Charts/ChartBar";
import "./cardplayersummary.css";

export const CardPlayerSummary = () => {
  return (
    <div className="cardPlayers" aria-labelledby="players-heading">
      <div className="cardPlayers-Container">
        <div className="cardPlayers-Content">
          <div className="cardPlayers-Header">
            <div className="cardPlayers-Header__Heading">Players</div>
            <div className="cardPlayers-Header__Actions">
              <button className="cardPlayers-Action">
                <MoreVertical />
              </button>
            </div>
          </div>
          <div className="cardPlayers-Body">
            <ChartBar />
          </div>
        </div>
      </div>
    </div>
  );
};
