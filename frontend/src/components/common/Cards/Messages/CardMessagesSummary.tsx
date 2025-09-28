"use client";
import React from "react";
import { MoreVertical } from "lucide-react";
import { Skeleton } from "../../Skeleton/Skeleton";
import "./cardmessagessummary.css";

type Message = {
	id: number;
	sender: { name: string; avatar?: string };
	message: string;
	timestamp?: string;
};

export const CardMessagesSummary: React.FC<{
	messages?: Message[];
	loading?: boolean;
}> = ({ messages = [], loading = false }) => {
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

	if (loading) {
		return (
			<div className="card card-messages">
				<div className="card-header">
					<div className="card-header-title">Messages</div>
					<div className="card-header-actions">
						<Skeleton className="skeleton-icon" />
					</div>
				</div>
				<div className="card-body messages-list-container">
					{Array.from({ length: 4 }).map((_, i) => (
						<div key={i} className="message-item">
							<Skeleton className="skeleton-avatar" />
							<div style={{ flex: 1 }}>
								<Skeleton className="skeleton-line short" />
								<Skeleton className="skeleton-line" />
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="card card-messages" aria-labelledby="messages-heading">
			<div className="card-header">
				<div className="card-header-title" id="messages-heading">
					Messages
				</div>
				<div className="card-header-actions">
					<button
						className="button button-ghost button-icon-only"
						aria-label="More actions"
					>
						<MoreVertical />
					</button>
				</div>
			</div>

			<div className="card-body messages-list-container" role="list">
				{messageData.map((msg) => (
					<button
						key={msg.id}
						className={`message-item ${
							selectedConversation === msg.id ? "selected" : ""
						}`}
						onClick={() => setSelectedConversation(msg.id)}
						aria-pressed={selectedConversation === msg.id}
						role="listitem"
					>
						<div className="avatar">
							<img src={msg.sender.avatar} alt={msg.sender.name} />
						</div>
						<div className="message-details">
							<div className="message-top">
								<div className="message-sender">{msg.sender.name}</div>
								<div className="message-time">{msg.timestamp}</div>
							</div>
							<div className="message-text">{msg.message}</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
};
