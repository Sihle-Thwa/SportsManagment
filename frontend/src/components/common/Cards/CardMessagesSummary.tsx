import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { Avatar } from "../../ui/avatar";
import { ScrollArea } from "../../ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";

const MessageDashboard = ({ messages = [] }) => {
	const [selectedConversation, setSelectedConversation] = useState<
		number | null
	>(null);

	// If no messages provided, use sample data
	const messageData =
		messages.length > 0
			? messages
			: [
					{
						id: 1,
						sender: {
							name: "Phoenix Baker",
							username: "@phoenix",
							avatar: "/api/placeholder/100/100",
						},
						message: "Looks good!",
						timestamp: "now",
					},
					{
						id: 2,
						sender: {
							name: "Lana Steiner",
							username: "@lana",
							avatar: "/api/placeholder/100/100",
						},
						message: "Thanks so much, happy with that.",
						timestamp: "2 m ago",
					},
					{
						id: 3,
						sender: {
							name: "Demi Wikinson",
							username: "@demi",
							avatar: "/api/placeholder/100/100",
						},
						message: "Looks good!",
						timestamp: "2 m ago",
					},
					{
						id: 4,
						sender: {
							name: "Demi Wikinson",
							username: "@demi",
							avatar: "/api/placeholder/100/100",
						},
						message: "Looks good!",
						timestamp: "2 m ago",
					},
					{
						id: 5,
						sender: {
							name: "Demi Wikinson",
							username: "@demi",
							avatar: "/api/placeholder/100/100",
						},
						message: "Looks good!",
						timestamp: "2 m ago",
					},
			  ];

	return (
		<Card className="card card-messages">
			<CardHeader className="card-header">
				<CardTitle className="card-header-title">
					<h4>Messages</h4>
				</CardTitle>
				<button className="button button-ghost button-icon-only">
					<MoreVertical />
				</button>
			</CardHeader>
			<ScrollArea className="flex w-full overflow-y-auto">
				<CardContent className="card-body">
					{messageData.map((msg) => (
						<div
							key={msg.id}
							className={`message-item ${
								selectedConversation === msg.id ? "selected" : ""
							}`}
							onClick={() => setSelectedConversation(msg.id)}
						>
							<div className="message-content">
								<div className="message-header">
									<Avatar className="avatar">
										<img src={msg.sender.avatar} alt={msg.sender.name} />
									</Avatar>
									<div className="message-details">
										<div className="message-info">
											<h6>{msg.sender.name}</h6>
											<span>{msg.timestamp}</span>
										</div>
										<p>{msg.message}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</CardContent>
			</ScrollArea>
		</Card>
	);
};

export default MessageDashboard;
