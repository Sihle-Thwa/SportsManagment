import { useState } from "react";
import { MoreVertical } from "lucide-react";

const CardMessagesSummary = ({ messages = [] }) => {
	const [selectedConversation, setSelectedConversation] = useState<
		number | null
	>(null);
	// ** Sample data section (collapsible for devs)
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

	// **End Section for sample data //

	return (
		<div className="card card-messages">
			<div className="card-header">
				<div className="card-header-title">
					<h4>Messages</h4>
				</div>
				<button className="button button-ghost button-icon-only">
					<MoreVertical />
				</button>
			</div>
			<div className="flex w-full overflow-y-auto">
				<div className="card-body">
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
									<div className="avatar">
										<img src={msg.sender.avatar} alt={msg.sender.name} />
									</div>
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
				</div>
			</div>
		</div>
	);
};

export default CardMessagesSummary;
