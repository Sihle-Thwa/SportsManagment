"use client";
import { statsdata } from "../../../../routes/statsdata";

import "./cardstatistics.css";

export const CardStatistics: React.FC = () => {
  return (
    <div className="statsContainer" role="list" aria-label="Statistics">
      {statsdata.map((item, idx) => (
        <div key={item.title ?? idx} className="cardStats-Container" role="listitem">
          <div className="cardStats-Content">
            <div className="cardStats-icon" aria-hidden>
              {item.icon ? <item.icon /> : <div className="icon-placeholder" />}
            </div>
            <div className="cardStats-Text__Content">
              <div className="cardStats-Value">{item.value}</div>
              <div className="cardStats-Label">{item.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
