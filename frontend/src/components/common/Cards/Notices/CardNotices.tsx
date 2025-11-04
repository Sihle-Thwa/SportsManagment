"use client";
import React from "react";
import "./cardnotices.css";

export type Notice = {
  id: string | number;
  title: string;
  body?: string;
  time?: string;
};

export const CardNotices: React.FC<{ notices?: Notice[] }> = ({ notices }) => {
  const latest = (notices || []).slice(0, 4);

  return (
    <div className="cardNotices" aria-labelledby="notices-heading">
      <div className="cardNotices-Header">
        <div className="cardNotices-Header__Title" id="notices-heading">
          Notices
        </div>
      </div>
      <div className="cardNotices-Body">
        {latest.length === 0 ? (
          <div className="empty">No recent notices</div>
        ) : (
          <ul className="cardNotices-Lists" role="list">
            {latest.map((n) => (
              <li key={n.id} className="cardNotices-ListItem">
                <div className="cardNotices-Meta">
                  <div className="cardNotice-ListItem__Title">{n.title}</div>
                  {n.time && (
                    <div className="cardNotice-ListItem__Time">{n.time}</div>
                  )}
                </div>
                {n.body && (
                  <div className="cardNotice-ListItem__Text">{n.body}</div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
