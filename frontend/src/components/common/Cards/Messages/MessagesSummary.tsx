"use client";
import React from "react";
import { MoreVertical } from "lucide-react";
import "./messagessummary.css";

type Message = {
  id: number;
  sender: { name: string; avatar?: string };
  message: string;
  timestamp?: string;
};

export const MessagesSummary: React.FC<{
  messages?: Message[];
}> = ({ messages = [] }) => {
  const [selectedConversation, setSelectedConversation] = React.useState<
    number | null
  >(null);

  const messageData: Message[] =
    messages.length > 0
      ? messages
      : [
          {
            id: 1,
            sender: { name: "Phoenix Baker", avatar: "/api/placeholder/40/40" },
            message: "Looks good!",
            timestamp: "now",
          },
          {
            id: 2,
            sender: { name: "Lana Steiner", avatar: "/api/placeholder/40/40" },
            message: "Thanks — that's perfect.",
            timestamp: "2m",
          },
          {
            id: 3,
            sender: { name: "Demi Wikinson", avatar: "/api/placeholder/40/40" },
            message: "On it!",
            timestamp: "10m",
          },
          {
            id: 4,
            sender: { name: "Mason Hale", avatar: "/api/placeholder/40/40" },
            message: "Done.",
            timestamp: "1h",
          },
        ];

  return (
    <div className="cardMessages" aria-labelledby="messages-heading">
      <div className="cardMessages-Container">
        <div className="cardMessages-Content">
          <div className="cardMessages-Header">
            <div className="cardMessages-Header__Heading">Messages</div>
            <div className="cardMessages-Header__Actions">
              <button className="cardMessages-Action">
                <MoreVertical />
              </button>
            </div>
          </div>
          <div className="cardMessages-Body">
            <div className="cardMessages-Body__Lists" role="list">
              {messageData.map((msg) => (
                <div
                  key={msg.id}
                  className="cardMessages-Body__ListItem"
                  role="listitem"
                  aria-pressed={selectedConversation === msg.id}
                  onClick={() => setSelectedConversation(msg.id)}
                >
				  <div className="cardMessages-Body__ListItemAvatar">
					<img src={msg.sender.avatar} alt="" />
				  </div>
				  <div className="cardMessages-Body__ListItemDetails">
					<div className="cardMessages-Body__ListItemTop">
					  <div className="cardMessages-Body__ListItemSender">
						{msg.sender.name}</div>
					  <div className="cardMessages-Body__ListItemTime">
						{msg.timestamp}</div>
					</div>
					<div className="cardMessages-Body__ListItemMessage">
					  {msg.message}
					</div>
				  </div>
				</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
