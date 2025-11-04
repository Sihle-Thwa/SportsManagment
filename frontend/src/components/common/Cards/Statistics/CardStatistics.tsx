"use client";
import { statsdata } from "../../../../routes/statsdata";

import "./cardstatistics.css";

export const CardStatistics: React.FC = () => {
  return (
    <div className="stats-grid" role="list" aria-label="Statistics">
      {statsdata.map((item, idx) => (
        <div key={item.title ?? idx} className="card-stat" role="listitem">
          <div className="cardstat-body">
            <div className="cardstat-icon" aria-hidden>
              {item.icon ? <item.icon /> : <div className="icon-placeholder" />}
            </div>
            <div className="cardstat-copy">
              <div className="cardstat-value">{item.value}</div>
              <div className="cardstat-title">{item.title}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
